import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export const useLimitStore = defineStore('limit', () => {
    const authStore = useAuthStore()

    const showGuestDialog = ref(false)
    const showPremiumDialog = ref(false)
    const guestDialogVariant = ref<'limit' | 'premium'>('limit')
    const premiumDialogVariant = ref<'limit' | 'feature'>('limit')
    const isVerifying = ref(false)
    const availableLimit = ref<number | null>(null)
    const isPremiumPlan = ref(false)
    let planStatusPromise: Promise<void> | null = null
    let lastPlanStatusAt = 0

    function setPlanState(user: User | null) {
        isPremiumPlan.value = user?.user_metadata?.is_premium === true
    }

    function setGuestLimitState() {
        isPremiumPlan.value = false
        availableLimit.value = Math.max(0, 2 - getGuestCount())
    }

    function setUserLimitState(count: number | null, latestCreatedAt?: string) {
        if (isPremiumPlan.value) {
            availableLimit.value = 999
            return
        }

        if (count === null) {
            availableLimit.value = 0
            return
        }

        if (count < 2) {
            availableLimit.value = 2 - count
            return
        }

        if (!latestCreatedAt) {
            availableLimit.value = 0
            return
        }

        const diffInHours = (Date.now() - new Date(latestCreatedAt).getTime()) / (1000 * 60 * 60)
        availableLimit.value = diffInHours >= 24 ? 1 : 0
    }

    async function getAuthUser(force = false): Promise<User | null> {
        if (!force && authStore.user) {
            return authStore.user
        }

        const { data: { user } } = await supabase.auth.getUser()

        if (user && authStore.user) {
            authStore.user.user_metadata = user.user_metadata
        }

        return user ?? authStore.user ?? null
    }

    async function loadPlanStatus(force = false) {
        const now = Date.now()

        if (planStatusPromise) {
            return planStatusPromise
        }

        if (!force && now - lastPlanStatusAt < 10000) {
            return
        }

        planStatusPromise = (async () => {
        try {
            const user = await getAuthUser(force)

            if (!user) {
                setGuestLimitState()
                return
            }

            if (authStore.user) {
                authStore.user.user_metadata = user.user_metadata
            }
            setPlanState(user)
            
            const { data: resumes, count } = await supabase
                .from('resumes')
                .select('created_at', { count: 'exact' })
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
                .limit(1)

            setUserLimitState(count, resumes?.[0]?.created_at)
            lastPlanStatusAt = Date.now()
        } catch (e) {
            console.error(e)
        } finally {
            planStatusPromise = null
        }
        })()

        return planStatusPromise
    }

    async function checkCanCreate(silent = false): Promise<boolean> {
        try {
            const supabaseUser = await getAuthUser()

            if (!supabaseUser && !authStore.user) {
                // Mehmon uchun tekshiruv
                const count = getGuestCount()
                setGuestLimitState()
                if (count >= 2) {
                    if (!silent) openGuestDialog('limit')
                    return false
                }
                return true
            } else {
                // Tizimga kirgan foydalanuvchi uchun tekshiruv
                const userId = supabaseUser?.id || authStore.user?.id
                
                // 1. Umumiy yaratilgan CVlar soni va oxirgisining datasini olamiz
                const { data: resumes, count, error } = await supabase
                    .from('resumes')
                    .select('created_at', { count: 'exact' })
                    .eq('user_id', userId)
                    .order('created_at', { ascending: false })
                    .limit(1)

                if (error) {
                    console.error('Error fetching resumes count:', error)
                    return true // Xatolik bo'lsa o'tkazib yuboramiz
                }

                // Premium statusini eng so'nggi ma'lumot qilib serverdan tortamiz! (Token keshlanib qolishini olish logikasi)
                let isPremium = false
                
                if (supabaseUser) {
                    if (authStore.user) {
                        authStore.user.user_metadata = supabaseUser.user_metadata
                    }
                    isPremium = supabaseUser.user_metadata?.is_premium === true
                } else if (authStore.user) {
                    isPremium = authStore.user.user_metadata?.is_premium === true
                }

                isPremiumPlan.value = isPremium
                setUserLimitState(count, resumes?.[0]?.created_at)

                // Agar u premium bo'lmasa va bazada allaqachon 2 yoki undan ko'p CV bo'lsa
                if (!isPremium && count !== null && count >= 2) {
                    // Agar oxirgi CVsi bor bo'lsa, uni qachon yaratganini tekshiramiz
                    if (resumes && resumes.length > 0) {
                        const lastCreatedAt = new Date(resumes[0].created_at).getTime()
                        const now = new Date().getTime()
                        const diffInHours = (now - lastCreatedAt) / (1000 * 60 * 60)

                        // Agar oxirgi CV yaratilganiga 24 soat to'lmagan bo'lsa - O'TKAZMAYMIZ (LimitDialog)
                        if (diffInHours < 24) {
                            if (!silent) {
                                premiumDialogVariant.value = 'limit'
                                showPremiumDialog.value = true
                            }
                            return false
                        }
                        
                        // DIQQAT: Agar 24 soat o'tgan bo'lsa u bemalol yaratishda davom etaveradi (pastga o'tib true qaytaradi)
                    } else {
                         // Garchi sanasi xato bo'lsayu count >= 2 bo'lsa ham yopamiz (xavfsizlik uchun)
                         if (!silent) {
                             premiumDialogVariant.value = 'limit'
                             showPremiumDialog.value = true
                         }
                         return false
                    }
                }
                return true
            }
        } catch (e) {
            console.error(e)
            return false
        }
    }

    function getGuestCount(): number {
        try {
            // Eskicha qolgan ma'lumotni tozalash
            localStorage.removeItem('guest_cv_count')
            const val = localStorage.getItem('_cv_gen_t')
            if (!val) return 0
            return parseInt(atob(val)) || 0
        } catch {
            return 0
        }
    }

    function incrementGuestCount() {
        if (!authStore.user) {
            const count = getGuestCount()
            localStorage.setItem('_cv_gen_t', btoa((count + 1).toString()))
        }
    }

    function closeDialogs() {
        showGuestDialog.value = false
        showPremiumDialog.value = false
        guestDialogVariant.value = 'limit'
    }

    function openGuestDialog(variant: 'limit' | 'premium' = 'limit') {
        guestDialogVariant.value = variant
        showPremiumDialog.value = false
        showGuestDialog.value = true
    }

    function openPremiumAccessDialog(variant: 'limit' | 'feature' = 'limit') {
        if (authStore.user) {
            showGuestDialog.value = false
            premiumDialogVariant.value = variant
            showPremiumDialog.value = true
            return
        }

        openGuestDialog('premium')
    }

    async function verifyPayment(): Promise<boolean> {
        isVerifying.value = true
        try {
            const user = await getAuthUser(true)
            
            if (user && user.user_metadata?.is_premium === true) {
                if (authStore.user) {
                    authStore.user.user_metadata = user.user_metadata
                }
                setPlanState(user)
                availableLimit.value = 999
                return true
            }
            // Add a small delay so the user perceives a check if it's too fast
            await new Promise(r => setTimeout(r, 1500))
            return false
        } catch (e) {
            console.error(e)
            return false
        } finally {
            isVerifying.value = false
        }
    }

    return {
        showGuestDialog,
        showPremiumDialog,
        guestDialogVariant,
        premiumDialogVariant,
        isVerifying,
        availableLimit,
        isPremiumPlan,
        loadPlanStatus,
        checkCanCreate,
        incrementGuestCount,
        closeDialogs,
        openGuestDialog,
        openPremiumAccessDialog,
        verifyPayment
    }
})
