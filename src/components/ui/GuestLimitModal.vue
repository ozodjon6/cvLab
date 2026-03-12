<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="limitStore.showGuestDialog" class="fixed inset-0 z-[400] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
            <div class="text-center">
              <div class="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-orange-50 dark:bg-orange-900/40 mb-4">
                <svg class="h-7 w-7 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-display font-bold text-gray-900 dark:text-white mb-2">{{ title }}</h3>
              <p class="text-[14px] text-gray-500 dark:text-gray-400 mb-6 leading-relaxed">
                {{ description }}
              </p>
              <button
                @click="openAuth"
                class="w-full btn-primary flex items-center justify-center text-[14px] !py-2.5"
              >
                {{ t.limit.loginRegBtn }}
              </button>
            </div>

          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLimitStore } from '@/stores/limit'
import { useAuthStore } from '@/stores/auth'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
const limitStore = useLimitStore()
const authStore = useAuthStore()

const title = computed(() =>
  limitStore.guestDialogVariant === 'premium' ? t.value.limit.bmacGuestTitle : t.value.limit.guestTitle
)

const description = computed(() =>
  limitStore.guestDialogVariant === 'premium' ? t.value.limit.bmacGuestDesc : t.value.limit.guestDesc
)

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
