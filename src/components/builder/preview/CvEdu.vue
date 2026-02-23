<template>
  <div v-if="education.length" class="mb-3">
    <div class="cv-sec-title">Ta'lim</div>
    <div v-for="edu in education" :key="edu.id" class="mb-2">
      <div class="font-bold text-[12.5px]">{{ edu.institution }}</div>
      <div class="text-[11px] mt-0.5" style="color:#6B7A90">
        {{ edu.degree }}{{ edu.degree && edu.years ? ' · ' : '' }}{{ edu.years }}
      </div>
      <p v-if="edu.notes" class="text-[11px] mt-0.5" style="color:#374151">{{ edu.notes }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { EducationItem } from '@/types/cv'
defineProps<{ education: EducationItem[] }>()
</script>
