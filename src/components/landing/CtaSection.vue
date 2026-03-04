<template>
  <div class="mx-6 sm:mx-12 my-12 bg-navy-800 rounded-[22px] py-16 sm:py-[72px] px-8 sm:px-16 text-center relative overflow-hidden">
    <div class="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full -top-32 -right-24 md:-top-44 md:-right-36 pointer-events-none
                [background:radial-gradient(circle,rgba(59,130,246,.2)_0%,transparent_70%)]" />
    <h2 class="font-display font-extrabold text-[28px] md:text-[clamp(28px,4vw,46px)] text-white tracking-[-1px] md:tracking-[-2px] mb-3 md:mb-3.5 relative z-10 leading-[1.1]">
      {{ t.cta.titleLine1 }}<br>
      <span class="text-blue-300 font-light">{{ t.cta.titleLine2 }}</span>
    </h2>
    <p class="text-white/45 text-[15px] mb-8 relative z-10">{{ t.cta.subtitle }}</p>
    <router-link
      to="/builder"
      class="relative z-10 inline-flex items-center gap-2 bg-white text-navy-800
             px-8 py-3.5 rounded-xl font-bold text-sm
             shadow-[0_4px_18px_rgba(0,0,0,.18)]
             transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_26px_rgba(0,0,0,.22)]"
      @click="trackBoshlashClick('cta')"
    >
      {{ t.cta.button }}
    </router-link>
  </div>
</template>
<script setup lang="ts">
import { trackBoshlashClick } from '@/composables/useAnalytics'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
</script>
