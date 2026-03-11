<template>
  <div class="mx-6 sm:mx-12 my-12 bg-navy-800 dark:bg-navy-900 rounded-[22px] py-16 sm:py-[72px] px-8 sm:px-16 text-center relative overflow-hidden dark:border dark:border-gray-800">
    <div class="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full -top-32 -right-24 md:-top-44 md:-right-36 pointer-events-none
                [background:radial-gradient(circle,rgba(59,130,246,.2)_0%,transparent_70%)] dark:[background:radial-gradient(circle,rgba(59,130,246,.15)_0%,transparent_70%)]" />
    <h2 class="font-display font-extrabold text-[28px] md:text-[clamp(28px,4vw,46px)] text-white tracking-[-1px] md:tracking-[-2px] mb-3 md:mb-3.5 relative z-10 leading-[1.1]">
      {{ t.cta.titleLine1 }}<br>
      <span class="text-blue-300 font-light">{{ t.cta.titleLine2 }}</span>
    </h2>
    <p class="text-white/45 text-[15px] mb-8 relative z-10">{{ t.cta.subtitle }}</p>
    <button
      class="relative z-10 inline-flex items-center justify-center gap-2 bg-white text-navy-800
             px-8 py-3.5 rounded-xl font-bold text-sm
             shadow-[0_4px_18px_rgba(0,0,0,.18)]
             transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_26px_rgba(0,0,0,.22)] disabled:opacity-80 disabled:cursor-not-allowed
             dark:bg-blue-600 dark:text-white dark:hover:bg-blue-500 dark:shadow-[0_4px_18px_rgba(37,99,235,.4)] dark:hover:shadow-[0_8px_26px_rgba(37,99,235,.5)]"
      @click="handleBoshlash"
      :disabled="isChecking"
    >
      <span v-if="isChecking" class="inline-block h-4 w-4 rounded-full border-2 border-navy-800/30 border-t-navy-800 dark:border-white/30 dark:border-t-white animate-spin"></span>
      {{ t.cta.button }}
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { trackBoshlashClick } from '@/composables/useAnalytics'
import { useLanguage } from '@/composables/useLanguage'
import { useLimitStore } from '@/stores/limit'
import { useCVStore } from '@/stores/cv'

const { t } = useLanguage()
const router = useRouter()
const limitStore = useLimitStore()
const cvStore = useCVStore()
const isChecking = ref(false)

async function handleBoshlash() {
  trackBoshlashClick('cta')
  isChecking.value = true
  try {
    const canCreate = await limitStore.checkCanCreate()
    if (canCreate) {
      cvStore.reset()
      router.push('/builder')
    }
  } finally {
    isChecking.value = false
  }
}
</script>
