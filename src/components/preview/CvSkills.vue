<template>
  <div v-if="skills.length" class="cv-sec mb-3.5">
    <div class="cv-sec-title">Ko'nikmalar</div>
    <div style="display:flex;flex-wrap:wrap;gap:4px">
      <span v-for="s in skills" :key="s"
            style="background:#E8F0FE;color:#1A56DB;
                   font-size:10.5px;font-weight:600;padding:4px 9px;border-radius:100px;
                   line-height:1;text-align:center;white-space:nowrap">
        {{ s }}
      </span>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ skills: string[] }>()
</script>
