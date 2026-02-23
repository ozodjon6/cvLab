<template>
  <span class="text-[10.5px]" :style="dark ? 'color:#6B7A90' : 'color:rgba(255,255,255,.6)'">
    {{ val }}
  </span>
</template>
<script setup lang="ts">
defineProps<{ val: string; dark?: boolean }>()
</script>
