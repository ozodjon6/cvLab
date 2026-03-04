<template>
  <div v-if="skills.length" class="cv-sec mb-3.5">
    <div class="cv-sec-title">{{ t.cv.skills }}</div>
    <div class="cv-skills-list">
      <span
        v-for="s in skills"
        :key="s"
        class="cv-skill-badge"
      >
        {{ s }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
defineProps<{ skills: string[] }>()
</script>
<style scoped>
.cv-skills-list {
  line-height: 0;
}

.cv-skill-badge {
  display: inline-block;
  height: 20px;
  line-height: 20px;
  padding: 0 11px;
  margin: 0 4px 5px 0;
  border-radius: 100px;
  background: #e8f0fe;
  color: #1a56db;
  font-size: 10.5px;
  font-weight: 600;
  white-space: nowrap;
  vertical-align: top;
}
</style>
