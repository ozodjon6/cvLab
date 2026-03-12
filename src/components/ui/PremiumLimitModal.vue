<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="limitStore.showPremiumDialog" class="fixed inset-0 z-[400] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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

            <!-- Premium Limit Content -->
            <div class="text-center">
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

              <button
                @click="checkPayment"
                :disabled="limitStore.isVerifying"
                class="w-full bg-blue-brand hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-xl text-[14px] py-3 mb-2 flex items-center justify-center gap-2 transition-colors"
              >
                <span v-if="limitStore.isVerifying" class="inline-block h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></span>
                <span>{{ limitStore.isVerifying ? t.limit.checkingPayment : t.limit.checkPaymentBtn }}</span>
              </button>

              <div
                class="w-full bg-blue-50/50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-xl text-[14px] !py-3 mb-2 flex flex-col items-center justify-center transition-colors border border-blue-100 dark:border-blue-900/50"
              >
                <span class="font-medium mb-0.5">{{ t.limit.waitPayment }}</span>
                <span class="text-[12px] opacity-70">{{ t.limit.waitMinutes }}</span>
              </div>

              <button
                @click="limitStore.closeDialogs"
                class="w-full bg-white dark:bg-navy-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-navy-900 font-medium rounded-lg text-[14px] px-4 py-2.5 transition-colors cursor-pointer"
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
import { useRouter } from 'vue-router'
import { useLimitStore } from '@/stores/limit'
import { useToast } from '@/composables/useToast'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
const limitStore = useLimitStore()
const toast = useToast()
const router = useRouter()

async function checkPayment() {
  const isPremium = await limitStore.verifyPayment()
  if (isPremium) {
    toast.success(t.value.limit.success)
    setTimeout(() => {
      limitStore.closeDialogs()
      router.push('/builder')
    }, 1500)
    return
  }

  toast.error(t.value.limit.error)
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
