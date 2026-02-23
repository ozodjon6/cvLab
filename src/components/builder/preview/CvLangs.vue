<template>
  <div v-if="langs.length" class="mb-3">
    <div class="cv-sec-title">Tillar</div>
    <div v-for="l in langs" :key="l.id" class="flex justify-between text-[11.5px] mb-1">
      <span class="font-semibold">{{ l.name }}</span>
      <span style="color:#6B7A90">{{ l.level }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { LanguageItem } from '@/types/cv'
defineProps<{ langs: LanguageItem[] }>()
</script>
