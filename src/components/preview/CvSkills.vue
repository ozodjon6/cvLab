<template>
  <div v-if="skills.length" class="cv-sec mb-3.5">
    <div class="cv-sec-title">Ko'nikmalar</div>
    <div>
      <span v-for="s in skills" :key="s"
            style="display:inline-block;
                   background:#E8F0FE;color:#1A56DB;
                   font-size:10.5px;font-weight:600;
                   padding:5px 11px;
                   border-radius:100px;
                   line-height:1;
                   white-space:nowrap;
                   margin:0 4px 5px 0;
                   vertical-align:middle;">{{ s }}</span>
    </div>
  </div>
</template>
<script setup lang="ts">
defineProps<{ skills: string[] }>()
</script>
