<template>
  <div>
    <h2 class="font-display font-bold text-lg tracking-tight mb-1">Shablon tanlang</h2>
    <p class="text-xs text-gray-400 mb-5">Rezyumengiz uchun ko'rinish tanlang</p>

    <div class="grid grid-cols-2 gap-2.5">
      <div v-for="t in templates" :key="t.id"
           class="relative border-2 rounded-[10px] overflow-hidden cursor-pointer
                  transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_7px_20px_rgba(10,37,64,.1)]"
           :class="selected === t.id
             ? 'border-blue-brand shadow-[0_0_0_3px_rgba(26,86,219,.12)]'
             : 'border-gray-200'"
           @click="emit('update:selected', t.id)">

        <div v-if="selected === t.id"
             class="absolute top-1.5 right-1.5 w-[17px] h-[17px] rounded-full bg-blue-brand text-white
                    flex items-center justify-center text-[9px] font-bold z-10">✓</div>

        <div class="h-[140px] overflow-hidden" v-html="t.preview" />
        <div class="px-2.5 py-1.5 text-[11px] font-bold border-t border-gray-100">{{ t.name }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TemplateId } from '@/types/cv'

defineProps<{ selected: TemplateId }>()
const emit = defineEmits<{ 'update:selected': [id: TemplateId] }>()

function pl(w: string, bg = '#E2E8F0', h = '4px') {
  return `<div style="height:${h};background:${bg};border-radius:2px;margin-bottom:3px;width:${w}"></div>`
}

const templates: { id: TemplateId; name: string; preview: string }[] = [
  {
    id: 'modern', name: 'Modern',
    preview: `<div style="background:#0A2540;height:100%;display:flex;flex-direction:column">
      <div style="padding:10px">${pl('60%','rgba(255,255,255,.85)','7px')}${pl('40%','rgba(255,255,255,.3)')}</div>
      <div style="background:#fff;flex:1;padding:8px 10px;display:flex;gap:7px">
        <div style="width:38%;display:flex;flex-direction:column;gap:3px">${pl('75%','#1A56DB')}${pl('90%')}${pl('70%')}${pl('65%','#1A56DB')}${pl('80%')}</div>
        <div style="flex:1;display:flex;flex-direction:column;gap:3px">${pl('50%','#1A56DB')}${pl('95%')}${pl('80%')}${pl('45%','#1A56DB')}${pl('88%')}</div>
      </div></div>`,
  },
  {
    id: 'clean', name: 'Clean',
    preview: `<div style="background:#fff;padding:10px">
      <div style="border-bottom:2px solid #0A2540;padding-bottom:7px;margin-bottom:8px">
        ${pl('58%','#0A2540','6px')}${pl('38%','#1A56DB','3px')}</div>
      ${pl('38%','#1A56DB')}${pl('94%')}${pl('78%',undefined,'4px')}${pl('42%','#1A56DB')}${pl('88%')}${pl('72%')}
    </div>`,
  },
  {
    id: 'bold', name: 'Bold',
    preview: `<div style="background:#1A56DB;display:flex;flex-direction:column">
      <div style="padding:10px">${pl('65%','rgba(255,255,255,.85)','7px')}${pl('42%','rgba(255,255,255,.3)','3px')}</div>
      <div style="background:#fff;flex:1;border-radius:5px 5px 0 0;padding:8px 10px">
        ${pl('42%','#1A56DB')}${pl('90%')}${pl('74%')}${pl('47%','#1A56DB')}${pl('84%')}${pl('62%')}
      </div></div>`,
  },
  {
    id: 'minimal', name: 'Minimal',
    preview: `<div style="background:#fff;padding:10px">
      <div style="display:flex;align-items:center;gap:7px;border-bottom:1px solid #E2E8F0;padding-bottom:8px;margin-bottom:8px">
        <div style="width:26px;height:26px;border-radius:50%;background:#E8F0FE;flex-shrink:0"></div>
        <div>${pl('76px','#0A2540','5px')}${pl('48px','#1A56DB','3px')}</div></div>
      ${pl('38%','#1A56DB')}${pl('93%')}${pl('76%')}${pl('40%','#1A56DB')}${pl('86%')}${pl('68%')}
    </div>`,
  },
]
</script>
