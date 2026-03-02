<template>
  <div v-if="skills.length" class="mb-3">
    <div class="cv-sec-title">Ko'nikmalar</div>
    <div class="cv-skills-list">
      <span
        v-for="sk in skills"
        :key="sk"
        class="cv-skill-badge"
      >
        {{ sk }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ skills: string[] }>()
</script>
