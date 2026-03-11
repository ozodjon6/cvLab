import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useAuthStore } from './auth'
import { supabase } from '@/lib/supabase'

export const useLimitStore = defineStore('limit', () => {
    const authStore = useAuthStore()

    const showGuestDialog = ref(false)
    const showPremiumDialog = ref(false)
    const isChecking = ref(false)

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
                const { count, error } = await supabase
                    .from('resumes')
                    .select('*', { count: 'exact', head: true })
                    .eq('user_id', authStore.user.id)

                if (error) {
                    console.error('Error fetching resumes count:', error)
                    return true // Xatolik bo'lsa o'tkazib yuboramiz
                }

                // Premium statusini tekshiramiz. Vaqtincha user_metadata dan olamiz yoki 
                // to'lovdan keyin 'is_premium' o'rnatiladi.
                const isPremium = authStore.user.user_metadata?.is_premium === true

                if (!isPremium && count !== null && count >= 2) {
                    showPremiumDialog.value = true
                    return false
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

    return {
        showGuestDialog,
        showPremiumDialog,
        isChecking,
        checkCanCreate,
        incrementGuestCount,
        closeDialogs
    }
})
