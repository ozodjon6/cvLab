<template>
  <div
    class="rounded-full shrink-0 overflow-hidden flex items-center justify-center font-display font-bold"
    :style="{ width: size + 'px', height: size + 'px', fontSize: size * 0.3 + 'px' }"
    :class="light
      ? 'bg-navy-50 text-navy-500'
      : 'bg-white/10 border-2 border-white/20 text-white/70'"
  >
    <img v-if="photo" :src="photo" class="w-full h-full object-cover" />
    <span v-else>{{ initials }}</span>
  </div>
</template>

<script setup lang="ts">
defineProps<{ photo: string | null; initials: string; size: number; light?: boolean }>()
</script>
