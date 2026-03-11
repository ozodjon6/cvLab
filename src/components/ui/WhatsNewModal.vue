<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[500] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm" @click="close"></div>

        <!-- Modal -->
        <div class="relative bg-white dark:bg-navy-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-zoom-in border border-transparent dark:border-gray-700">
          <!-- Top decorative header -->
          <div class="h-24 bg-gradient-to-br from-blue-brand to-blue-500 relative flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <!-- Version badge -->
            <div class="bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold tracking-widest text-[11px] uppercase px-3 py-1 rounded-full relative z-10 shadow-sm animate-pulse">
              {{ t.whatsNew.versionBadge }}
            </div>

            <!-- Confetti abstract decoration -->
            <svg class="absolute w-full h-full inset-0 pointer-events-none opacity-50" viewBox="0 0 400 130" fill="none">
              <circle cx="50" cy="30" r="15" fill="white" opacity="0.2"/>
              <circle cx="340" cy="80" r="25" fill="white" opacity="0.1"/>
              <rect x="80" y="80" w="10" h="10" fill="white" opacity="0.3" transform="rotate(25 80 80)"/>
              <rect x="300" y="20" w="12" h="12" fill="white" opacity="0.15" transform="rotate(45 300 20)"/>
            </svg>
          </div>

          <button @click="close" class="absolute top-3 right-3 text-white/70 hover:text-white transition-colors z-20 bg-black/10 rounded-full p-1.5">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div class="px-7 pt-6 pb-7">
            <h3 class="text-xl font-display font-extrabold text-gray-900 dark:text-white mb-1 text-center">{{ t.whatsNew.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">{{ t.whatsNew.description }}</p>

            <ul class="space-y-4 mb-7">
              <li class="flex items-start gap-3">
                <div class="shrink-0 w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-brand mt-0.5">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                </div>
                <div>
                  <h4 class="text-[14px] font-bold dark:text-gray-100 text-gray-900 mb-0.5">{{ t.whatsNew.items.auth.title }}</h4>
                  <p class="text-[12.5px] text-gray-600 dark:text-gray-400 leading-snug">{{ t.whatsNew.items.auth.desc }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="shrink-0 w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mt-0.5">
                   <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>
                </div>
                <div>
                  <h4 class="text-[14px] font-bold text-gray-900 dark:text-gray-100 mb-0.5">{{ t.whatsNew.items.language.title }}</h4>
                  <p class="text-[12.5px] text-gray-600 dark:text-gray-400 leading-snug">{{ t.whatsNew.items.language.desc }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="shrink-0 w-8 h-8 rounded-full bg-violet-50 dark:bg-violet-900/40 flex items-center justify-center text-violet-600 dark:text-violet-400 mt-0.5">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M21.752 15.002A9.718 9.718 0 0118 15.75C12.615 15.75 8.25 11.385 8.25 6c0-1.33.266-2.598.748-3.752A9.753 9.753 0 003 12c0 5.385 4.365 9.75 9.75 9.75a9.753 9.753 0 009-6.748z" /></svg>
                </div>
                <div>
                  <h4 class="text-[14px] font-bold text-gray-900 dark:text-gray-100 mb-0.5">{{ t.whatsNew.items.theme.title }}</h4>
                  <p class="text-[12.5px] text-gray-600 dark:text-gray-400 leading-snug">{{ t.whatsNew.items.theme.desc }}</p>
                </div>
              </li>
              <li class="flex items-start gap-3">
                <div class="shrink-0 w-8 h-8 rounded-full bg-yellow-50 dark:bg-yellow-900/40 flex items-center justify-center text-yellow-600 dark:text-yellow-400 mt-0.5">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
                </div>
                <div>
                  <h4 class="text-[14px] font-bold text-gray-900 dark:text-gray-100 mb-0.5">{{ t.whatsNew.items.limit.title }}</h4>
                  <p class="text-[12.5px] text-gray-600 dark:text-gray-400 leading-snug">{{ t.whatsNew.items.limit.desc }}</p>
                </div>
              </li>
            </ul>

            <button @click="close" class="btn-primary flex items-center justify-center w-full !py-2.5 text-[14px] shadow-[0_4px_12px_rgba(5,74,237,.2)] hover:shadow-[0_6px_16px_rgba(5,74,237,.3)]">
              {{ t.whatsNew.closeBtn }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

const isOpen = ref(false)
const VERSION_KEY = 'cvlab_v2_seen' // Update this for future major versions
const { t } = useLanguage()

onMounted(() => {
  // Check if user has already seen the v2.0 update modal
  const hasSeen = localStorage.getItem(VERSION_KEY)
  if (!hasSeen) {
    // slight delay for dramatic effect
    setTimeout(() => {
      isOpen.value = true
    }, 800)
  }
})

function close() {
  isOpen.value = false
  localStorage.setItem(VERSION_KEY, 'true')
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.35s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-zoom-in {
  animation: zoomIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes zoomIn {
  0% { opacity: 0; transform: scale(0.92) translateY(10px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
