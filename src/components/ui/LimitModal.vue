<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="limitStore.showGuestDialog || limitStore.showPremiumDialog" class="fixed inset-0 z-[400] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" aria-hidden="true" @click="limitStore.closeDialogs"></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <!-- Modal panel -->
          <div class="relative inline-block align-bottom bg-white rounded-[16px] px-6 pt-7 pb-8 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full border border-gray-100">
            <!-- Close button -->
            <button @click="limitStore.closeDialogs" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
              <span class="sr-only">Yopish</span>
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Guest Limit Content -->
            <div v-if="limitStore.showGuestDialog" class="text-center">
              <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-orange-50 mb-4">
                <svg class="h-7 w-7 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-display font-bold text-gray-900 mb-2">Limit tugadi</h3>
              <p class="text-[14px] text-gray-500 mb-6 leading-relaxed">
                Siz ro'yxatdan o'tmasdan turib ketma-ket 2 marta rezyume yaratdingiz. Yana rezyume yaratish va ularni doimiy saqlab qolish uchun tizimga kiring.
              </p>
              <button 
                @click="openAuth" 
                class="w-full btn-primary text-[14px] !py-2.5"
              >
                Kirish / Ro'yxatdan o'tish
              </button>
            </div>

            <!-- Premium Limit Content -->
            <div v-if="limitStore.showPremiumDialog" class="text-center">
              <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-yellow-50 mb-4">
                <svg class="h-7 w-7 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-display font-bold text-gray-900 mb-2">Premium cheklov</h3>
              <p class="text-[13px] text-gray-500 mb-4 leading-relaxed">
                Sizning limitingiz tugadi. 24 soatdan so'ng bepul tahrirlash imkoni ochiladi yoki limitni hozir olib tashlash uchun bizga qahva olib bering!
              </p>
              
              <div class="flex flex-col items-center justify-center mt-2 p-4 bg-gray-50 rounded-xl border border-gray-100 mb-5">
                <img src="/qr-code.png" alt="Buy Me a Coffee QR Code" class="h-32 w-32 object-contain mb-3 rounded-lg shadow-sm" />
                <a href="https://buymeacoffee.com/ozodbro" target="_blank" rel="noopener noreferrer" class="hover:-translate-y-0.5 transition-transform duration-200">
                  <img src="/buyme-coffe.webp" alt="Buy me a coffee" class="h-9 w-auto drop-shadow-sm rounded-md" />
                </a>
              </div>

              <button 
                @click="limitStore.closeDialogs" 
                class="w-full bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 font-medium rounded-lg text-[14px] px-4 py-2.5 transition-colors"
              >
                Tushunarli, yopish
              </button>
            </div>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { useLimitStore } from '@/stores/limit'
import { useAuthStore } from '@/stores/auth'

const limitStore = useLimitStore()
const authStore = useAuthStore()

function openAuth() {
  limitStore.closeDialogs()
  authStore.openAuthModal()
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
