import { defineStore } from 'pinia'
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import router from '@/router/index'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)
    const isAuthModalOpen = ref(false)
    const loading = ref(true)
    const isSigningOut = ref(false)
    let authListenerInitialized = false

    async function checkSession() {
        if (authListenerInitialized) return

        loading.value = true
        const { data } = await supabase.auth.getSession()
        user.value = data.session?.user || null

        supabase.auth.onAuthStateChange((_, session) => {
            user.value = session?.user || null
        })
        authListenerInitialized = true
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
        isSigningOut.value = true
        await router.push('/')
        await supabase.auth.signOut()
        user.value = null
        isSigningOut.value = false
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
        isSigningOut,
        isAuthModalOpen,
        checkSession,
        signInWithGoogle,
        signOut,
        openAuthModal,
        closeAuthModal
    }
})
