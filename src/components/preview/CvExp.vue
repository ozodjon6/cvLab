<template>
  <div v-if="filled.length" class="cv-sec mb-3.5">
    <div class="cv-sec-title">Ish tajribasi</div>
    <div v-for="e in filled" :key="e.id" style="margin-bottom:9px">
      <div style="font-weight:700;font-size:12.5px">{{ e.jobTitle }}</div>
      <div style="display:flex;justify-content:space-between;font-size:11px;color:#6B7A90;margin-top:2px;margin-bottom:3px;flex-wrap:wrap;gap:3px">
        <span>{{ e.company }}{{ e.location ? ' · ' + e.location : '' }}</span>
        <span>{{ fmt(e.startDate) }}{{ fmt(e.startDate) && end(e) ? ' – ' : '' }}{{ end(e) }}</span>
      </div>
      <p v-if="e.description" style="font-size:11.5px;color:#374151;line-height:1.6;white-space:pre-wrap">{{ e.description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ExperienceItem } from '@/types/cv'
import { fmtDate } from '@/types/cv'

const props = defineProps<{ items: ExperienceItem[] }>()
const filled = computed(() => props.items.filter(e => e.jobTitle || e.company))
function fmt(d: string) { return fmtDate(d) }
function end(e: ExperienceItem) { return e.isCurrent ? 'hozir' : fmtDate(e.endDate) }
</script>
