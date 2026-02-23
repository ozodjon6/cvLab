<template>
  <div v-if="filled.length" class="cv-sec mb-3.5">
    <div class="cv-sec-title">Ta'lim</div>
    <div v-for="e in filled" :key="e.id" style="margin-bottom:8px">
      <div style="font-weight:700;font-size:12.5px">{{ e.institution }}</div>
      <div style="font-size:11px;color:#6B7A90;margin-top:1px">
        {{ e.degree }}{{ e.degree && e.years ? ' · ' : '' }}{{ e.years }}
      </div>
      <p v-if="e.notes" style="font-size:11px;color:#374151;margin-top:2px">{{ e.notes }}</p>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import type { EducationItem } from '@/types/cv'
const props = defineProps<{ items: EducationItem[] }>()
const filled = computed(() => props.items.filter(e => e.institution))
</script>
