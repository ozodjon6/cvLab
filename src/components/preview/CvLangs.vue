<template>
  <div v-if="filled.length" class="cv-sec mb-3.5">
    <div class="cv-sec-title">Tillar</div>
    <div v-for="l in filled" :key="l.id"
         style="display:flex;justify-content:space-between;font-size:11.5px;margin-bottom:4px">
      <span style="font-weight:600">{{ l.name }}</span>
      <span style="color:#6B7A90">{{ l.level }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { LanguageItem } from '@/types/cv'
const props = defineProps<{ langs: LanguageItem[] }>()
const filled = computed(() => props.langs.filter(l => l.name))
</script>
