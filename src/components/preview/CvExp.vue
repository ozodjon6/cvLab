<template>
  <div v-if="filled.length" class="cv-sec mb-3.5">
    <div class="cv-sec-title">Ish tajribasi</div>
    <div style="margin-left:5px; padding-left:14px; border-left:2px solid #E2E8F0; display:flex; flex-direction:column; gap:12px; margin-top:6px;">
      <div v-for="e in filled" :key="e.id" style="position:relative">
        <!-- Timeline Dot -->
        <div style="position:absolute; left:-21.5px; top:4px; width:11px; height:11px; border-radius:50%; background:#fff; border:2.5px solid #6B7A90;"></div>
        
        <div style="font-weight:700;font-size:12.5px;line-height:1.2;">{{ e.jobTitle }}</div>
        <div style="display:flex;justify-content:space-between;font-size:11px;color:#6B7A90;margin-top:3px;margin-bottom:4px;flex-wrap:wrap;gap:3px">
          <span style="font-weight:500">{{ e.company }}{{ e.location ? ' · ' + e.location : '' }}</span>
          <span>{{ fmt(e.startDate) }}{{ fmt(e.startDate) && end(e) ? ' – ' : '' }}{{ end(e) }}</span>
        </div>
        <div v-if="e.description" style="font-size:11.5px;color:#374151;line-height:1.6" class="rich-text" v-html="e.description"></div>
      </div>
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
