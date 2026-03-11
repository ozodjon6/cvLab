<template>
  <div :class="{ 'lang-transitioning': transitioning }">
    <router-view />
    <ToastContainer />
    <AuthModal />
    <LimitModal />
    
    <!-- Logout Loader -->
    <transition name="fade">
      <div v-if="authStore.isSigningOut" class="fixed inset-0 z-[9999] bg-white/80 backdrop-blur-sm flex flex-col items-center justify-center">
        <div class="h-10 w-10 rounded-full border-[3px] border-gray-200 border-t-blue-brand animate-spin mb-4"></div>
        <p class="text-gray-600 font-medium text-sm">{{ t.nav.signingOut }}</p>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
import AuthModal from '@/components/ui/AuthModal.vue'
import LimitModal from '@/components/ui/LimitModal.vue'
import { useLanguage } from '@/composables/useLanguage'
import { useAuthStore } from '@/stores/auth'

const { t, transitioning, currentLang } = useLanguage()
const authStore = useAuthStore()

onMounted(() => {
  document.documentElement.lang = currentLang.value
  authStore.checkSession()
})
</script>

<style>
.lang-transitioning {
  opacity: 0;
  transition: opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

:not(.lang-transitioning) {
  transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1);
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
