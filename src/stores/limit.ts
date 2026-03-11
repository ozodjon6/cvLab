import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'
import { supabase } from '@/lib/supabase'

export const useLimitStore = defineStore('limit', () => {
    const authStore = useAuthStore()

    const showGuestDialog = ref(false)
    const showPremiumDialog = ref(false)
    const isChecking = ref(false)
    const isVerifying = ref(false)
    const availableLimit = ref<number | null>(null)
    const isPremiumPlan = ref(false)

    async function loadPlanStatus() {
        if (!authStore.user) return
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) authStore.user.user_metadata = user.user_metadata
            
            isPremiumPlan.value = authStore.user?.user_metadata?.is_premium === true
            
            const { data: resumes, count } = await supabase
                .from('resumes')
                .select('created_at', { count: 'exact' })
                .eq('user_id', authStore.user.id)
                .order('created_at', { ascending: false })
                .limit(1)

            if (isPremiumPlan.value) {
                availableLimit.value = 999
            } else {
                if (count !== null && count >= 2) {
                    if (resumes && resumes.length > 0) {
                        const diffInHours = (new Date().getTime() - new Date(resumes[0].created_at).getTime()) / (1000 * 60 * 60)
                        availableLimit.value = diffInHours >= 24 ? 1 : 0
                    } else {
                        availableLimit.value = 0
                    }
                } else {
                    availableLimit.value = 2 - (count || 0)
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    async function checkCanCreate(): Promise<boolean> {
        isChecking.value = true
        try {
            if (!authStore.user) {
                // Mehmon uchun tekshiruv
                const count = parseInt(localStorage.getItem('guest_cv_count') || '0')
                if (count >= 2) {
                    showGuestDialog.value = true
                    return false
                }
                return true
            } else {
                // Tizimga kirgan foydalanuvchi uchun tekshiruv
                // 1. Umumiy yaratilgan CVlar soni va oxirgisining datasini olamiz
                const { data: resumes, count, error } = await supabase
                    .from('resumes')
                    .select('created_at', { count: 'exact' })
                    .eq('user_id', authStore.user.id)
                    .order('created_at', { ascending: false })
                    .limit(1)

                if (error) {
                    console.error('Error fetching resumes count:', error)
                    return true // Xatolik bo'lsa o'tkazib yuboramiz
                }

                // Premium statusini eng so'nggi ma'lumot qilib serverdan tortamiz! (Token keshlanib qolishini olish logikasi)
                const { data: { user } } = await supabase.auth.getUser()
                if (user) authStore.user.user_metadata = user.user_metadata

                const isPremium = authStore.user.user_metadata?.is_premium === true

                // Agar u premium bo'lmasa va bazada allaqachon 2 yoki undan ko'p CV bo'lsa
                if (!isPremium && count !== null && count >= 2) {
                    // Agar oxirgi CVsi bor bo'lsa, uni qachon yaratganini tekshiramiz
                    if (resumes && resumes.length > 0) {
                        const lastCreatedAt = new Date(resumes[0].created_at).getTime()
                        const now = new Date().getTime()
                        const diffInHours = (now - lastCreatedAt) / (1000 * 60 * 60)

                        // Agar oxirgi CV yaratilganiga 24 soat to'lmagan bo'lsa - O'TKAZMAYMIZ (LimitDialog)
                        if (diffInHours < 24) {
                            showPremiumDialog.value = true
                            return false
                        }
                        
                        // DIQQAT: Agar 24 soat o'tgan bo'lsa u bemalol yaratishda davom etaveradi (pastga o'tib true qaytaradi)
                    } else {
                         // Garchi sanasi xato bo'lsayu count >= 2 bo'lsa ham yopamiz (xavfsizlik uchun)
                         showPremiumDialog.value = true
                         return false
                    }
                }
                return true
            }
        } finally {
            isChecking.value = false
        }
    }

    function incrementGuestCount() {
        if (!authStore.user) {
            const count = parseInt(localStorage.getItem('guest_cv_count') || '0')
            localStorage.setItem('guest_cv_count', (count + 1).toString())
        }
    }

    function closeDialogs() {
        showGuestDialog.value = false
        showPremiumDialog.value = false
    }

    async function verifyPayment(): Promise<boolean> {
        isVerifying.value = true
        try {
            const { data: { user }, error } = await supabase.auth.getUser()
            if (error) throw error
            
            if (user && user.user_metadata?.is_premium === true) {
                if (authStore.user) {
                    authStore.user.user_metadata = user.user_metadata
                }
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
        isChecking,
        isVerifying,
        availableLimit,
        isPremiumPlan,
        loadPlanStatus,
        checkCanCreate,
        incrementGuestCount,
        closeDialogs,
        verifyPayment
    }
})
