<template>
  <div v-if="skills.length" class="mb-3">
    <div class="cv-sec-title">Ko'nikmalar</div>
    <div class="flex flex-wrap gap-[3px]">
      <span v-for="sk in skills" :key="sk"
            class="inline-block text-[10.5px] font-semibold px-2 py-[2px] rounded-full"
            style="background:#E8F0FE;color:#1A56DB">{{ sk }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ skills: string[] }>()
</script>
