<template>
  <div v-if="education.length" class="mb-3">
    <div class="cv-sec-title">Ta'lim</div>
    <div v-for="edu in education" :key="edu.id" class="mb-2">
      <div class="font-bold text-[12.5px]">{{ edu.institution }}{{ edu.location ? ' · ' + edu.location : '' }}</div>
      <div class="flex justify-between text-[11px] mt-0.5" style="color:#6B7A90">
        <span>{{ edu.degree }}</span>
        <span>{{ fmtDate(edu.startDate) }}{{ fmtDate(edu.startDate) && (edu.isCurrent || edu.endDate) ? ' – ' : '' }}{{ edu.isCurrent ? 'hozir' : fmtDate(edu.endDate) }}</span>
      </div>
      <div v-if="edu.notes" class="rich-text text-[11px] mt-0.5" style="color:#374151" v-html="edu.notes"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import type { EducationItem } from '@/types/cv'
import { fmtDate } from '@/types/cv'
defineProps<{ education: EducationItem[] }>()
</script>
