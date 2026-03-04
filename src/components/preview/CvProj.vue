<template>
  <div v-if="filled.length" class="cv-sec mb-3.5">
    <div class="cv-sec-title">{{ t.cv.projects }}</div>
    <div style="margin-left:5px; padding-left:14px; border-left:2px solid #E2E8F0; display:flex; flex-direction:column; gap:12px; margin-top:6px;">
      <div v-for="p in filled" :key="p.id" style="position:relative">
        <div style="position:absolute; left:-21.5px; top:4px; width:11px; height:11px; border-radius:50%; background:#fff; border:2.5px solid #6B7A90;"></div>
        
        <div style="font-weight:700;font-size:12.5px;line-height:1.2;display:flex;align-items:center;gap:6px">
          {{ p.name }}
          <a v-if="p.link" :href="toUrl(p.link)" target="_blank" style="font-size:10px;color:#1A56DB;text-decoration:none;font-weight:600">
            Link ↗
          </a>
        </div>
        <div style="font-size:11px;color:#6B7A90;margin-top:3px;margin-bottom:4px;">
          <span>{{ fmt(p.startDate) }}{{ fmt(p.startDate) && fmt(p.endDate) ? ' – ' : '' }}{{ fmt(p.endDate) }}</span>
        </div>
        <div v-if="p.description" style="font-size:11.5px;color:#374151;line-height:1.6" class="rich-text" v-html="p.description"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectItem } from '@/types/cv'
import { fmtDate } from '@/types/cv'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()

const props = defineProps<{ items: ProjectItem[] }>()
const filled = computed(() => props.items.filter(p => p.name))

function fmt(d: string) { return fmtDate(d, t.value.months) }

function toUrl(val: string): string {
  if (!val) return ''
  return val.match(/^https?:\/\//) ? val : `https://${val}`
}
</script>
