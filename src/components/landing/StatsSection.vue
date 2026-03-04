<template>
  <div class="bg-navy-800 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-10 text-center py-10 sm:py-11 px-6 sm:px-16">
    <div v-for="s in stats" :key="s.label">
      <div class="font-display font-extrabold text-[36px] sm:text-[42px] text-white tracking-[-2px]">
        {{ s.value }}<sup class="text-[16px] sm:text-[20px] text-blue-accent">{{ s.sup }}</sup>
      </div>
      <div class="text-white/40 text-xs mt-1">{{ s.label }}</div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()

const stats = computed(() => [
  { value: '12', sup: 'K+', label: t.value.stats.resumes },
  { value: '3',  sup: 'min', label: t.value.stats.avgTime },
  { value: '96', sup: '%',  label: t.value.stats.satisfied },
])
</script>
