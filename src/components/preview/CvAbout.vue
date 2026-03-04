<template>
  <div v-if="bio" class="cv-sec mb-3.5">
    <div class="cv-sec-title">{{ t.cv.about }}</div>
    <div style="font-size:11.5px;color:#374151;line-height:1.65" class="rich-text" v-html="bio"></div>
  </div>
</template>
<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
defineProps<{ bio: string }>()
</script>
