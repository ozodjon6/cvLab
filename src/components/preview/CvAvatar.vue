<template>
  <div :style="style" class="shrink-0 overflow-hidden flex items-center justify-center">
    <img v-if="photo" :src="photo" :style="imgStyle" />
    <span v-else class="font-display font-bold" :style="textStyle">{{ initials }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  photo: string | null
  initials: string
  size: number
  light?: boolean
}>()

const style = computed(() => ({
  width: props.size + 'px',
  height: props.size + 'px',
  minWidth: props.size + 'px',
  minHeight: props.size + 'px',
  borderRadius: '50%',
  background: props.light ? '#E8F0FE' : 'rgba(255,255,255,.12)',
  border: props.light ? '2px solid #E2E8F0' : '2px solid rgba(255,255,255,.2)',
}))
const imgStyle = computed(() => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover' as const,
  borderRadius: '50%',
  display: 'block',
}))
const textStyle = computed(() => ({
  fontSize: Math.round(props.size * 0.32) + 'px',
  color: props.light ? '#1A56DB' : 'rgba(255,255,255,.7)',
}))
</script>
