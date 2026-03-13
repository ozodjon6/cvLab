<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-[500] flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-gray-900/40 backdrop-blur-sm shadow-inner" @click="close"></div>

        <!-- Modal -->
        <div class="relative bg-white dark:bg-navy-800 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-zoom-in border border-transparent dark:border-gray-700">
          <!-- Top decorative header -->
          <div class="h-24 bg-gradient-to-br from-blue-brand to-blue-600 relative flex items-center justify-center overflow-hidden">
            <div class="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
            <!-- Version badge -->
            <div class="bg-white/20 dark:bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold tracking-widest text-[11px] uppercase px-3 py-1 rounded-full relative z-10 shadow-sm animate-pulse">
              {{ t.whatsNew.versionBadge }}
            </div>

            <!-- Abstract decoration -->
            <svg class="absolute w-full h-full inset-0 pointer-events-none opacity-50" viewBox="0 0 400 130" fill="none">
              <circle cx="50" cy="30" r="15" fill="white" opacity="0.2"/>
              <circle cx="340" cy="80" r="25" fill="white" opacity="0.1"/>
              <rect x="80" y="80" w="10" h="10" fill="white" opacity="0.3" transform="rotate(25 80 80)"/>
              <rect x="300" y="20" w="12" h="12" fill="white" opacity="0.15" transform="rotate(45 300 20)"/>
            </svg>
          </div>

          <button @click="close" class="absolute top-3 right-3 text-white/70 hover:text-white transition-colors z-20 bg-black/10 rounded-full p-1.5 focus:outline-none">
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <div class="px-7 pt-6 pb-7">
            <h3 class="text-xl font-display font-extrabold text-gray-900 dark:text-white mb-1 text-center">{{ t.whatsNew.title }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 text-center mb-6 leading-relaxed">{{ t.whatsNew.description }}</p>

            <ul class="space-y-4 mb-7">
              <!-- Slug -->
              <li class="flex items-start gap-3">
                <div class="shrink-0 w-8 h-8 rounded-full bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400 mt-0.5">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                </div>
                <div>
                  <h4 class="text-[14.5px] font-bold dark:text-gray-100 text-gray-900 mb-0.5">{{ t.whatsNew.items.slug.title }}</h4>
                  <p class="text-[12.5px] text-gray-600 dark:text-gray-400 leading-snug">{{ t.whatsNew.items.slug.desc }}</p>
                </div>
              </li>
              <!-- Design -->
              <li class="flex items-start gap-3">
                <div class="shrink-0 w-8 h-8 rounded-full bg-emerald-50 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mt-0.5">
                   <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-3" /></svg>
                </div>
                <div>
                  <h4 class="text-[14.5px] font-bold text-gray-900 dark:text-gray-100 mb-0.5">{{ t.whatsNew.items.design.title }}</h4>
                  <p class="text-[12.5px] text-gray-600 dark:text-gray-400 leading-snug">{{ t.whatsNew.items.design.desc }}</p>
                </div>
              </li>
              <!-- Theme -->
              <li class="flex items-start gap-3">
                <div class="shrink-0 w-8 h-8 rounded-full bg-violet-50 dark:bg-violet-900/40 flex items-center justify-center text-violet-600 dark:text-violet-400 mt-0.5">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                </div>
                <div>
                  <h4 class="text-[14.5px] font-bold text-gray-900 dark:text-gray-100 mb-0.5">{{ t.whatsNew.items.theme.title }}</h4>
                  <p class="text-[12.5px] text-gray-600 dark:text-gray-400 leading-snug">{{ t.whatsNew.items.theme.desc }}</p>
                </div>
              </li>
              <!-- Auth -->
              <li class="flex items-start gap-3">
                <div class="shrink-0 w-8 h-8 rounded-full bg-amber-50 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400 mt-0.5">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <div>
                  <h4 class="text-[14.5px] font-bold text-gray-900 dark:text-gray-100 mb-0.5">{{ t.whatsNew.items.auth.title }}</h4>
                  <p class="text-[12.5px] text-gray-600 dark:text-gray-400 leading-snug">{{ t.whatsNew.items.auth.desc }}</p>
                </div>
              </li>
            </ul>

            <button @click="close" class="btn-primary flex items-center justify-center w-full !py-3 text-[14px] shadow-lg shadow-blue-brand/20 active:scale-[0.98] transition-all">
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
const VERSION_KEY = 'cvlab_v21_seen' // Incremented version key
const { t } = useLanguage()

onMounted(() => {
  const hasSeen = localStorage.getItem(VERSION_KEY)
  if (!hasSeen) {
    setTimeout(() => {
      isOpen.value = true
    }, 1200)
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
  transition: opacity 0.35s ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.animate-zoom-in {
  animation: zoomIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes zoomIn {
  0% { opacity: 0; transform: scale(0.9) translateY(20px); }
  100% { opacity: 1; transform: scale(1) translateY(0); }
}
</style>
