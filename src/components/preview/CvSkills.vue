<template>
  <div v-if="skills.length" class="cv-sec mb-3.5">
    <div class="cv-sec-title">Ko'nikmalar</div>
    <div>
      <span v-for="s in skills" :key="s"
            style="display:inline-flex;
                   align-items:center;
                   justify-content:center;
                   background:#E8F0FE;color:#1A56DB;
                   font-size:10.5px;font-weight:600;
                   padding:4px 11px;
                   border-radius:100px;
                   line-height:normal;
                   white-space:nowrap;
                   margin:0 4px 5px 0;">{{ s }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ skills: string[] }>()
</script>
