<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="authStore.isAuthModalOpen" class="fixed inset-0 z-[400] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" aria-hidden="true" @click="authStore.closeAuthModal"></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <!-- Modal panel -->
          <div class="relative inline-block align-bottom bg-white rounded-[16px] px-6 pt-7 pb-8 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm w-full border border-gray-100">
            <!-- Close button -->
            <button @click="authStore.closeAuthModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <span class="sr-only">Yopish</span>
              <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Content -->
            <div class="text-center">
              <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-blue-50 mb-4">
                <svg class="h-7 w-7 text-blue-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-display font-bold text-gray-900 mb-2" id="modal-title">
                Autentifikatsiya
              </h3>
              <p class="text-[13px] text-gray-500 mb-6 leading-relaxed">
                Platformadagi ma'lumotlaringiz xavfsiz saqlanishi uchun profilingizga kiring. Google orqali bitta tugma bilan davom etishingiz mumkin.
              </p>

              <!-- Google Auth Button -->
              <button 
                @click="onGoogleSignIn" 
                class="w-full flex justify-center items-center py-2.5 px-4 border border-gray-200 shadow-sm text-[13.5px] font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-brand transition-colors"
                :disabled="isLoading"
              >
                <template v-if="!isLoading">
                  <svg class="w-5 h-5 mr-2.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google bilan davom etish
                </template>
                <template v-else>
                  <div class="h-5 w-5 rounded-full border-2 border-gray-300 border-t-gray-700 animate-spin mr-2.5"></div>
                  Kutilmoqda...
                </template>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const isLoading = ref(false)

async function onGoogleSignIn() {
  isLoading.value = true
  try {
    await authStore.signInWithGoogle()
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
