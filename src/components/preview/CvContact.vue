<template>
  <span v-if="value" :style="{ fontSize: '10.5px', color: light ? 'rgba(255,255,255,.6)' : '#6B7A90' }">
    {{ value }}
  </span>
</template>
<script setup lang="ts">
defineProps<{ value?: string; light?: boolean }>()
</script>
