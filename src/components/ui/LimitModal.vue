<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="limitStore.showGuestDialog || limitStore.showPremiumDialog" class="fixed inset-0 z-[400] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <!-- Backdrop -->
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" aria-hidden="true" @click="limitStore.closeDialogs"></div>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

          <!-- Modal panel -->
          <div class="relative inline-block align-bottom bg-white dark:bg-navy-800 rounded-[16px] px-6 pt-7 pb-8 text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md w-full border border-gray-100 dark:border-gray-700">
            <!-- Close button -->
            <button @click="limitStore.closeDialogs" class="absolute top-4 right-4 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <span class="sr-only">Yopish</span>
              <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <!-- Guest Limit Content -->
            <div v-if="limitStore.showGuestDialog" class="text-center">
              <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-orange-50 dark:bg-orange-900/40 mb-4">
                <svg class="h-7 w-7 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">{{ t.limit.guestTitle }}</h3>
              <p class="text-[14px] text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                {{ t.limit.guestDesc }}
              </p>
              <button
                @click="openAuth"
                class="w-full btn-primary flex items-center justify-center text-[14px] !py-2.5"
              >
                {{ t.limit.loginRegBtn }}
              </button>
            </div>

            <!-- Premium Limit Content -->
            <div v-if="limitStore.showPremiumDialog" class="text-center">
              <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-yellow-50 dark:bg-yellow-900/40 mb-4">
                <svg class="h-7 w-7 text-yellow-500 dark:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">{{ t.limit.premiumTitle }}</h3>
              <p class="text-[13px] text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                {{ t.limit.premiumDesc }}
              </p>

              <div class="flex flex-col items-center justify-center mt-2 p-4 bg-gray-50 dark:bg-navy-900/40 rounded-xl border border-gray-100 dark:border-gray-700 mb-5">
                <img src="/qr-code.png" alt="Buy Me a Coffee QR Code" class="h-32 w-32 object-contain mb-3 rounded-lg shadow-sm" />
                <a href="https://buymeacoffee.com/ozodbro" target="_blank" rel="noopener noreferrer" class="hover:-translate-y-0.5 transition-transform duration-200">
                  <img src="/buyme-coffe.webp" alt="Buy me a coffee" class="h-7 dark:bg-[rgb(255,221,0)] dark:px-2 dark:py-1.5 dark:rounded-lg w-auto drop-shadow-sm rounded-md" />
                </a>
              </div>

              <div
                class="w-full bg-blue-50/50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-xl text-[14px] !py-3 mb-2 flex flex-col items-center justify-center transition-colors border border-blue-100 dark:border-blue-900/50"
              >
                <span class="inline-block h-5 w-5 rounded-full border-2 border-blue-200 dark:border-blue-700 border-t-blue-brand dark:border-t-blue-400 animate-spin mb-2"></span>
                <span class="font-medium mb-0.5">{{ t.limit.waitPayment }}</span>
                <span class="text-[12px] opacity-70">{{ t.limit.waitMinutes }}</span>
              </div>

              <button
                @click="limitStore.closeDialogs"
                class="w-full bg-white dark:bg-navy-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-navy-900 font-medium rounded-lg text-[14px] px-4 py-2.5 transition-colors"
                :disabled="limitStore.isVerifying"
              >
                {{ t.limit.closeBtn }}
              </button>
            </div>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { useLimitStore } from '@/stores/limit'
import { useAuthStore } from '@/stores/auth'
import { useToast } from '@/composables/useToast'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
const limitStore = useLimitStore()
const authStore = useAuthStore()
const toast = useToast()
const router = useRouter()

function openAuth() {
  limitStore.closeDialogs()
  authStore.openAuthModal()
}

let pollInterval: any = null

watch(() => limitStore.showPremiumDialog, (isOpen) => {
  if (isOpen) {
    if (pollInterval) clearInterval(pollInterval)
    pollInterval = setInterval(async () => {
      // Background verification
      const isPremium = await limitStore.verifyPayment()
      if (isPremium) {
        clearInterval(pollInterval)
        toast.success(t.value.limit.success)
        setTimeout(() => {
          limitStore.closeDialogs()
          router.push('/builder')
        }, 1500)
      }
    }, 4000)
  } else {
    if (pollInterval) clearInterval(pollInterval)
  }
})

onBeforeUnmount(() => {
  if (pollInterval) clearInterval(pollInterval)
})
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
