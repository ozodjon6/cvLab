<template>
  <div v-if="filled.length" class="cv-sec mb-3.5">
    <div class="cv-sec-title">Ta'lim</div>
    <div v-for="e in filled" :key="e.id" style="margin-bottom:8px">
      <div style="font-weight:700;font-size:12.5px">{{ e.institution }}{{ e.location ? ' · ' + e.location : '' }}</div>
      <div style="display:flex;justify-content:space-between;font-size:11px;color:#6B7A90;margin-top:1px">
        <span>{{ e.degree }}</span>
        <span>{{ fmtDate(e.startDate) }}{{ fmtDate(e.startDate) && (e.isCurrent || e.endDate) ? ' – ' : '' }}{{ e.isCurrent ? 'hozir' : fmtDate(e.endDate) }}</span>
      </div>
      <div v-if="e.notes" style="font-size:11px;color:#374151;margin-top:2px" class="rich-text" v-html="e.notes"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { EducationItem } from '@/types/cv'
import { fmtDate } from '@/types/cv'
const props = defineProps<{ items: EducationItem[] }>()
const filled = computed(() => props.items.filter(e => e.institution))
</script>
