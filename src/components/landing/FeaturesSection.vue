<template>
  <section class="py-16 md:py-[90px] px-6 sm:px-10 px-16 bg-gray-50 dark:bg-navy-900/50">
    <div class="max-w-[1060px] mx-auto">
      <p class="section-label text-center md:text-left">{{ t.features.label }}</p>
      <h2 class="section-title text-[28px] md:text-[clamp(28px,3.5vw,42px)] mb-8 md:mb-12 max-w-[600px] text-center md:text-left mx-auto md:mx-0 font-extrabold tracking-[-1px] leading-[1.1] dark:text-white">
        {{ t.features.title }}
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="(f, i) in t.features.items" :key="i" class="feature-card">
          <div class="w-10 h-10 bg-blue-light dark:bg-navy-700/50 dark:border dark:border-navy-600 rounded-[10px] flex items-center justify-center mb-3.5 text-lg mx-auto sm:mx-0 dark:text-blue-400">
            {{ icons[i] }}
          </div>
          <h3 class="font-semibold text-[15px] mb-2 text-center sm:text-left dark:text-gray-100">{{ f.title }}</h3>
          <p class="text-[13px] text-gray-500 dark:text-gray-400 leading-relaxed text-center sm:text-left">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
const icons = ['✦', '⬡', '↗', '⊡', '◈', '⊕']
</script>
