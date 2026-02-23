<template>
  <div v-if="bio" class="mb-3">
    <div class="cv-sec-title">Men haqimda</div>
    <p class="text-[11.5px] leading-relaxed whitespace-pre-wrap" style="color:#374151">{{ bio }}</p>
  </div>
</template>
<script setup lang="ts">
defineProps<{ bio: string }>()
</script>
