import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isAuthModalOpen = ref(false)
    const loading = ref(true)

    async function checkSession() {
        loading.value = true
        const { data } = await supabase.auth.getSession()
        user.value = data.session?.user || null

        supabase.auth.onAuthStateChange((_, session) => {
            user.value = session?.user || null
        })
        loading.value = false
    }

    async function signInWithGoogle() {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: window.location.origin
            }
        })
    }

    async function signOut() {
        loading.value = true
        await supabase.auth.signOut()
        user.value = null
        loading.value = false
        window.location.href = '/' // Quick and clean hard navigation to root
    }

    function openAuthModal() {
        isAuthModalOpen.value = true
    }

    function closeAuthModal() {
        isAuthModalOpen.value = false
    }

    return {
        user,
        loading,
        isAuthModalOpen,
        checkSession,
        signInWithGoogle,
        signOut,
        openAuthModal,
        closeAuthModal
    }
})
