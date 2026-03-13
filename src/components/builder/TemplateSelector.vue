<template>
  <div class="relative">
    <h2 class="font-display font-bold text-lg tracking-tight mb-1 dark:text-white">{{ t.templateSelector.title }}</h2>
    <div class="flex items-center justify-between mb-5">
      <p class="text-xs text-gray-400 m-0">{{ t.templateSelector.subtitle }}</p>
      
      <label class="flex items-center cursor-pointer group">
        <div class="relative w-8 h-[18px] rounded-full transition-colors duration-200"
             :class="store.showExample ? 'bg-blue-brand' : 'bg-gray-200 dark:bg-gray-700'">
          <input type="checkbox" class="sr-only" v-model="store.showExample" :disabled="isLockedForFree" />
          <div class="absolute left-0.5 top-0.5 bg-white w-[14px] h-[14px] rounded-full transition-transform duration-200 shadow-sm" 
               :class="{ 'translate-x-[14px]': store.showExample }"></div>
        </div>
        <div class="ml-2 text-[11px] font-semibold transition-colors duration-200" 
             :class="store.showExample ? 'text-blue-brand dark:text-blue-400' : 'text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300'">
          {{ t.templateSelector.fillExample }}
        </div>
      </label>
    </div>
    <div class="relative mt-2">
      <div
        v-if="isLockedForFree"
        class="absolute inset-0 z-20 cursor-pointer rounded-xl flex flex-col items-center justify-center gap-3 bg-white/60 dark:bg-navy-900/60 backdrop-blur-[2px]"
        @click="limitStore.openPremiumAccessDialog('feature')"
        :title="t.templateSelector.premiumLockTitle"
      >
        <div class="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-brand dark:text-blue-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        <div class="text-center px-4 max-w-[280px]">
          <p class="text-sm font-bold text-gray-800 dark:text-gray-100 mb-1">{{ t.templateSelector.premiumTitle }}</p>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ t.templateSelector.premiumDesc }}</p>
        </div>
        <button class="btn-primary !py-2 !px-5 !text-xs">{{ t.limit.getPremium }}</button>
      </div>

      <div class="grid grid-cols-2 gap-2.5 transition-all duration-300" :class="{ 'blur-[3px] opacity-60 select-none pointer-events-none': isLockedForFree }">
        <div v-for="tmpl in templates" :key="tmpl.id"
             class="relative border-2 rounded-[10px] overflow-hidden
                    transition-all duration-200 bg-white dark:bg-navy-800"
             :class="[
               selected === tmpl.id
                 ? 'border-blue-brand shadow-[0_0_0_3px_rgba(26,86,219,.12)] dark:shadow-[0_0_0_3px_rgba(37,99,235,.2)]'
                 : 'border-gray-200 dark:border-gray-700',
               !isLockedForFree ? 'cursor-pointer hover:-translate-y-0.5 hover:shadow-[0_7px_20px_rgba(10,37,64,.1)] dark:hover:shadow-[0_7px_20px_rgba(0,0,0,.3)]' : ''
             ]"
             @click="!isLockedForFree && emit('update:selected', tmpl.id)">

        <div v-if="selected === tmpl.id"
             class="absolute top-1.5 right-1.5 w-[17px] h-[17px] rounded-full bg-blue-brand text-white
                    flex items-center justify-center text-[9px] font-bold z-10">✓</div>

        <div class="h-[140px] overflow-hidden bg-gray-50 dark:bg-gray-800" v-html="tmpl.preview" />
        <div class="px-2.5 py-1.5 text-[11px] font-bold border-t border-gray-100 dark:border-gray-700 dark:text-gray-200">{{ tmpl.name }}</div>
      </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { TemplateId } from '@/types/cv'
import { useLanguage } from '@/composables/useLanguage'
import { useCVStore } from '@/stores/cv'
import { useAuthStore } from '@/stores/auth'
import { useLimitStore } from '@/stores/limit'

const store = useCVStore()
const authStore = useAuthStore()
const limitStore = useLimitStore()
const { t } = useLanguage()

const isLockedForFree = computed(() => {
  return !!(authStore.user && !limitStore.isPremiumPlan && store.cloudId)
})

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
  {
    id: 'academic', name: 'Academic',
    preview: `<div style="background:#fff;padding:10px;font-family:serif;text-align:center">
      <div style="margin:0 auto;margin-bottom:4px;display:flex;justify-content:center">${pl('80%','#0A2540','6px')}</div>
      <div style="margin:0 auto;margin-bottom:4px;display:flex;justify-content:center">${pl('40%','#666','2px')}</div>
      <div style="margin:0 auto;margin-bottom:4px;display:flex;justify-content:center;gap:4px">
        ${pl('15%','#333','2px')}${pl('15%','#333','2px')}${pl('15%','#333','2px')}
      </div>
      <div style="text-align:left;border-bottom:1px solid #000;margin-bottom:4px;padding-bottom:2px">${pl('30%','#0A2540','4px')}</div>
      <div style="text-align:left;margin-top:2px">${pl('100%','#666','2px')}</div>
      <div style="text-align:left;margin-top:2px">${pl('80%','#666','2px')}</div>
      <div style="text-align:left;border-bottom:1px solid #000;margin-top:6px;margin-bottom:4px;padding-bottom:2px">${pl('40%','#0A2540','4px')}</div>
      <div style="display:flex;justify-content:space-between;margin-top:4px">
        <div style="width:40%">${pl('100%','#333','2px')}</div>
        <div style="width:20%">${pl('100%','#666','2px')}</div>
      </div>
      <div style="text-align:left;margin-top:3px">${pl('80%','#666','2px')}</div>
    </div>`,
  },
]
</script>
