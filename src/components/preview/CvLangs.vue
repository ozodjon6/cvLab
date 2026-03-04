<template>
  <div v-if="filled.length" class="cv-sec mb-3.5">
    <div class="cv-sec-title">{{ t.cv.languages }}</div>
    <div v-for="l in filled" :key="l.id"
         style="display:flex;justify-content:space-between;font-size:11.5px;margin-bottom:4px">
      <span style="font-weight:600">{{ l.name }}</span>
      <span style="color:#6B7A90">{{ levelLabel(l.level) }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { LanguageItem } from '@/types/cv'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()

const props = defineProps<{ langs: LanguageItem[] }>()
const filled = computed(() => props.langs.filter(l => l.name))

function levelLabel(lv: string): string {
  if (lv === 'Ona tili') return t.value.skillsForm.nativeLevel
  const map: Record<string, string> = {
    'C2': 'C2 (Proficiency)',
    'C1': 'C1 (Advanced)',
    'B2': 'B2 (Upper-Intermediate)',
    'B1': 'B1 (Intermediate)',
    'A2': 'A2 (Elementary)',
    'A1': 'A1 (Beginner)',
  }
  return map[lv] || lv
}
</script>
