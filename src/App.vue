<template>
  <div :class="{ 'lang-transitioning': transitioning }">
    <router-view />
    <ToastContainer />
    <AuthModal />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ToastContainer from '@/components/ui/ToastContainer.vue'
import AuthModal from '@/components/ui/AuthModal.vue'
import { useLanguage } from '@/composables/useLanguage'
import { useAuthStore } from '@/stores/auth'

const { transitioning, currentLang } = useLanguage()
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
</style>
