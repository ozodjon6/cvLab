<template>
  <div v-if="items.length" class="mb-3">
    <div class="cv-sec-title">Ish tajribasi</div>
    <div v-for="exp in items" :key="exp.id" class="mb-2.5">
      <div class="font-bold text-[12.5px]">{{ exp.jobTitle }}</div>
      <div class="flex justify-between text-[11px] mt-0.5 mb-1 flex-wrap gap-1" style="color:#6B7A90">
        <span>{{ exp.company }}{{ exp.location ? ' · ' + exp.location : '' }}</span>
        <span>{{ range(exp) }}</span>
      </div>
      <p v-if="exp.description" class="text-[11.5px] leading-relaxed whitespace-pre-wrap" style="color:#374151">
        {{ exp.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { fmtDate } from '@/types/cv'
import type { ExperienceItem } from '@/types/cv'

defineProps<{ experience: ExperienceItem[] }>()

function range(exp: ExperienceItem): string {
  const s = fmtDate(exp.startDate)
  const e = exp.isCurrent ? 'hozir' : fmtDate(exp.endDate)
  return [s, e].filter(Boolean).join(' – ')
}
</script>
