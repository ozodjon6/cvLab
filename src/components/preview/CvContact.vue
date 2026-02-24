<template>
  <!-- Link mode: shows label + clickable -->
  <a
    v-if="value && href"
    :href="href"
    target="_blank"
    rel="noopener noreferrer"
    :style="{
      fontSize: '11px',
      fontWeight: '500',
      color: light ? 'rgba(255,255,255,.85)' : '#1A56DB',
      textDecoration: 'none',
      borderBottom: light ? '1px solid rgba(255,255,255,.25)' : '1px solid rgba(26,86,219,.25)',
    }"
  >
    {{ label || value }}
  </a>
  <!-- Text mode: plain contact info -->
  <span
    v-else-if="value"
    :style="{
      fontSize: '11px',
      fontWeight: '500',
      color: light ? 'rgba(255,255,255,.8)' : '#3B4F68',
    }"
  >
    {{ value }}
  </span>
</template>
<script setup lang="ts">
defineProps<{
  value?: string
  light?: boolean
  label?: string
  href?: string
}>()
</script>
