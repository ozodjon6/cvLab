<template>
  <div v-if="bio" class="cv-sec mb-3.5">
    <div class="cv-sec-title">Men haqimda</div>
    <p style="font-size:11.5px;color:#374151;line-height:1.65;white-space:pre-wrap">{{ bio }}</p>
  </div>
</template>
<script setup lang="ts">
defineProps<{ bio: string }>()
</script>
