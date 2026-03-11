<template>
  <div class="app-shell" :class="{ 'page-transitioning': transitioning }">
    <router-view />
    <ToastContainer />
    <AuthModal />
    <GuestLimitModal />
    <PremiumLimitModal />

    <!-- Logout Loader -->
    <transition name="fade">
      <div v-if="authStore.isSigningOut" class="fixed inset-0 z-[9999] bg-white/80 dark:bg-navy-900/80 backdrop-blur-sm flex flex-col items-center justify-center">
        <div class="h-10 w-10 rounded-full border-[3px] border-gray-200 dark:border-gray-700 border-t-blue-brand animate-spin mb-4"></div>
        <p class="text-gray-600 dark:text-gray-300 font-medium text-sm">{{ t.nav.signingOut }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
import AuthModal from '@/components/ui/AuthModal.vue'
import GuestLimitModal from '@/components/ui/GuestLimitModal.vue'
import PremiumLimitModal from '@/components/ui/PremiumLimitModal.vue'
import { useLanguage } from '@/composables/useLanguage'
import { useAuthStore } from '@/stores/auth'
import { useDarkMode } from '@/composables/useDarkMode'
import { usePageTransition } from '@/composables/usePageTransition'

const { t, currentLang } = useLanguage()
const { transitioning } = usePageTransition()
const authStore = useAuthStore()

useDarkMode()

onMounted(() => {
  document.documentElement.lang = currentLang.value
  authStore.checkSession()
})
</script>

<style>
.app-shell {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-transitioning {
  opacity: 0;
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-transitioning,
.page-transitioning * {
  pointer-events: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
