<template>
  <div class="mb-1.5">
    <div class="flex justify-between text-[10px] mb-0.5 text-navy-800">
      <span>{{ label }}</span><span class="text-gray-400">{{ pct }}%</span>
    </div>
    <div class="h-[3px] bg-blue-light rounded-full">
      <div class="h-full bg-blue-brand rounded-full transition-all duration-700" :style="{ width: pct + '%' }" />
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ label: string; pct: number }>()
</script>
