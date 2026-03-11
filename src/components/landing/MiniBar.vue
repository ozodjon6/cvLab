<template>
  <div class="mb-1.5">
    <div class="flex justify-between text-[10px] mb-0.5 text-navy-800 dark:text-gray-200">
      <span>{{ label }}</span><span class="text-gray-400 dark:text-gray-500">{{ pct }}%</span>
    </div>
    <div class="h-[3px] bg-blue-light dark:bg-navy-700 rounded-full">
      <div class="h-full bg-blue-brand dark:bg-blue-500 rounded-full transition-all duration-700" :style="{ width: pct + '%' }" />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ label: string; pct: number }>()
</script>
