<template>
  <div class="relative">
    <h2 class="font-display font-bold text-lg tracking-tight mb-1 dark:text-white">{{ t.customizer.title }}</h2>
    <p class="text-xs text-gray-400 mb-5">{{ t.customizer.subtitle }}</p>

    <!-- Premium Overlay -->
    <div
      v-if="isLocked"
      class="absolute inset-0 z-20 cursor-pointer rounded-xl flex flex-col items-center justify-center gap-3 bg-white/60 dark:bg-navy-900/60 backdrop-blur-[2px]"
      @click="limitStore.openPremiumAccessDialog()"
    >
      <div class="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/40 flex items-center justify-center text-blue-brand dark:text-blue-400">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
      </div>
      <div class="text-center px-4">
        <p class="text-sm font-bold text-gray-800 dark:text-gray-100 mb-1">{{ t.customizer.premiumTitle }}</p>
        <p class="text-xs text-gray-500 dark:text-gray-400">{{ t.customizer.premiumDesc }}</p>
      </div>
      <button class="btn-primary !py-2 !px-5 !text-xs">{{ t.limit.getPremium }}</button>
    </div>

    <!-- Content (blurred when locked) -->
    <div :class="{ 'blur-[3px] opacity-60 select-none pointer-events-none': isLocked }">

      <!-- ── Theme Color (only for templates with colored headers) ── -->
      <div v-if="hasColorHeader" class="mb-6">
        <p class="text-[11px] font-bold uppercase tracking-[.1em] text-gray-400 dark:text-gray-500 mb-3">{{ t.customizer.themeColor }}</p>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="color in THEME_COLORS"
            :key="color.value"
            @click="setColor(color.value)"
            class="w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 focus:outline-none"
            :style="{ background: color.value }"
            :class="currentColor === color.value ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-navy-800 ring-current scale-110' : 'border-transparent'"
            :title="color.name"
          />
          <!-- Custom color -->
          <label
            class="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-600 flex items-center justify-center cursor-pointer hover:border-blue-brand transition-colors relative overflow-hidden"
            :title="t.customizer.customColor"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-400"><path d="M12 5v14M5 12h14"/></svg>
            <input type="color" :value="customColorInput" @input="onCustomColor" class="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
          </label>
        </div>
      </div>

      <!-- ── Font Family ── -->
      <div class="mb-6">
        <p class="text-[11px] font-bold uppercase tracking-[.1em] text-gray-400 dark:text-gray-500 mb-3">{{ t.customizer.fontFamily }}</p>
        <div class="grid grid-cols-1 gap-1.5">
          <button
            v-for="font in FONT_OPTIONS"
            :key="font.value"
            @click="setFont(font.value)"
            :disabled="isAcademicTemplate && font.value !== 'EB Garamond'"
            class="flex items-center gap-3 px-3 py-2 rounded-lg border-[1.5px] transition-all duration-200 text-left focus:outline-none"
            :class="currentFont === font.value
              ? 'border-blue-brand bg-blue-50 dark:bg-blue-900/20 dark:border-blue-500'
              : 'border-gray-200 dark:border-gray-700 hover:border-blue-brand/40'"
            :style="isAcademicTemplate && font.value !== 'EB Garamond' ? { opacity: 0.45, cursor: 'not-allowed' } : undefined"
          >
            <span class="flex-1 text-[13px] font-semibold text-gray-800 dark:text-gray-200" :style="{ fontFamily: font.value }">{{ font.label }}</span>
            <span class="text-[10px] text-gray-400 dark:text-gray-500 italic" :style="{ fontFamily: font.value }">{{ font.sampleText }}</span>
            <svg v-if="currentFont === font.value" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-blue-brand dark:text-blue-400 shrink-0"><path d="M20 6L9 17l-5-5"/></svg>
          </button>
        </div>
      </div>

      <!-- ── Section Order ── -->
      <div>
        <p class="text-[11px] font-bold uppercase tracking-[.1em] text-gray-400 dark:text-gray-500 mb-2">{{ t.customizer.sectionOrder }}</p>
        <p class="text-[11px] text-gray-400 dark:text-gray-500 mb-3">{{ t.customizer.sectionOrderHint }}</p>
        <div class="flex flex-col gap-1.5">
          <div
            v-for="(sec, idx) in localSectionOrder" :key="sec"
            class="flex items-center gap-2.5 px-3 py-2.5 bg-gray-50 dark:bg-navy-900 border border-gray-200 dark:border-gray-700 rounded-lg cursor-grab active:cursor-grabbing transition-all duration-150"
            draggable="true"
            @dragstart="onDragStart(idx)"
            @dragover.prevent="onDragOver(idx)"
            @drop="onDrop"
            @dragend="onDragEnd"
            :class="dragOverIdx === idx
              ? 'border-blue-brand bg-blue-50 dark:bg-blue-900/20 scale-[1.01]'
              : 'hover:border-blue-brand/30'"
          >
            <!-- Drag handle -->
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-gray-300 dark:text-gray-600 shrink-0"><path d="M8 6h.01M8 12h.01M8 18h.01M16 6h.01M16 12h.01M16 18h.01"/></svg>

            <!-- Section icon -->
            <div class="w-7 h-7 rounded-md flex items-center justify-center shrink-0" :class="SECTION_META[sec]?.colors ?? 'bg-gray-100 dark:bg-gray-800'">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" :class="SECTION_META[sec]?.iconColor ?? 'text-gray-500'">
                <path :d="SECTION_META[sec]?.icon ?? sectionIconFallback" />
              </svg>
            </div>

            <span class="flex-1 text-[12.5px] font-semibold text-gray-700 dark:text-gray-300">{{ getSectionLabel(sec) }}</span>

            <!-- Move buttons -->
            <div class="flex gap-0.5 shrink-0">
              <button @click.stop="moveUp(idx)" :disabled="idx === 0" class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-navy-700 disabled:opacity-25 transition-colors focus:outline-none">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 15l-6-6-6 6"/></svg>
              </button>
              <button @click.stop="moveDown(idx)" :disabled="idx === localSectionOrder.length - 1" class="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-200 dark:hover:bg-navy-700 disabled:opacity-25 transition-colors focus:outline-none">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useCVStore } from '@/stores/cv'
import { useLimitStore } from '@/stores/limit'
import { useLanguage } from '@/composables/useLanguage'

const store = useCVStore()
const { template } = storeToRefs(store)
const limitStore = useLimitStore()
const { t } = useLanguage()

// Locked for free/guest users
const isLocked = computed(() => !limitStore.isPremiumPlan)

// Only modern and bold have full colored header backgrounds
const hasColorHeader = computed(() => template.value === 'modern' || template.value === 'bold')
const isAcademicTemplate = computed(() => template.value === 'academic')

const DEFAULT_ORDER = ['experience', 'education', 'projects', 'skills']

const THEME_COLORS = [
  { value: '#1A56DB', name: 'Blue' },
  { value: '#0A2540', name: 'Navy' },
  { value: '#059669', name: 'Emerald' },
  { value: '#D97706', name: 'Amber' },
  { value: '#DC2626', name: 'Red' },
  { value: '#7C3AED', name: 'Violet' },
  { value: '#0891B2', name: 'Cyan' },
  { value: '#374151', name: 'Slate' },
]

const FONT_OPTIONS = [
  { value: 'EB Garamond',     label: 'EB Garamond',   sampleText: 'Abc 123' },
  { value: 'Inter',            label: 'Inter',        sampleText: 'Abc 123' },
  { value: 'Roboto',           label: 'Roboto',        sampleText: 'Abc 123' },
  { value: 'Georgia',          label: 'Georgia',       sampleText: 'Abc 123' },
  { value: 'Outfit',           label: 'Outfit',        sampleText: 'Abc 123' },
  { value: 'Plus Jakarta Sans', label: 'Jakarta Sans', sampleText: 'Abc 123' },
]

// Section icons meta
const sectionIconFallback = 'M4 6h16M4 10h16M4 14h8'
const SECTION_META: Record<string, { icon: string; colors: string; iconColor: string }> = {
  experience: {
    icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
    colors: 'bg-blue-50 dark:bg-blue-900/30',
    iconColor: 'text-blue-500 dark:text-blue-400',
  },
  education: {
    icon: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
    colors: 'bg-emerald-50 dark:bg-emerald-900/30',
    iconColor: 'text-emerald-500 dark:text-emerald-400',
  },
  projects: {
    icon: 'M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4',
    colors: 'bg-violet-50 dark:bg-violet-900/30',
    iconColor: 'text-violet-500 dark:text-violet-400',
  },
  skills: {
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
    colors: 'bg-amber-50 dark:bg-amber-900/30',
    iconColor: 'text-amber-500 dark:text-amber-400',
  },
}

const currentColor = computed(() => store.data.settings?.themeColor ?? '#1A56DB')
const currentFont  = computed(() => isAcademicTemplate.value ? 'EB Garamond' : (store.data.settings?.fontFamily ?? 'Inter'))
const customColorInput = ref(currentColor.value)

function setColor(val: string) {
  customColorInput.value = val
  store.setSettings({ themeColor: val })
}
function onCustomColor(e: Event) {
  const val = (e.target as HTMLInputElement).value
  customColorInput.value = val
  store.setSettings({ themeColor: val })
}
function setFont(val: string) {
  if (isAcademicTemplate.value) return
  store.setSettings({ fontFamily: val })
}

// ── Drag & Drop ──
const EXCLUDE_SECTIONS = ['languages']
const filterOrder = (arr: string[]) => arr.filter(s => !EXCLUDE_SECTIONS.includes(s))

const localSectionOrder = ref<string[]>(filterOrder(store.data.settings?.sectionOrder ?? DEFAULT_ORDER))
watch(() => store.data.settings?.sectionOrder, (v) => { if (v) localSectionOrder.value = filterOrder(v) }, { deep: true })

let dragIdx = -1
const dragOverIdx = ref(-1)

function onDragStart(idx: number) { dragIdx = idx }
function onDragOver(idx: number)  { dragOverIdx.value = idx }
function onDrop() {
  if (dragIdx === -1 || dragIdx === dragOverIdx.value) return
  const arr = [...localSectionOrder.value]
  const [moved] = arr.splice(dragIdx, 1)
  arr.splice(dragOverIdx.value, 0, moved)
  localSectionOrder.value = arr
  store.setSettings({ sectionOrder: arr })
  dragIdx = -1; dragOverIdx.value = -1
}
function onDragEnd() { dragOverIdx.value = -1 }

function moveUp(idx: number) {
  if (idx === 0) return
  const arr = [...localSectionOrder.value]
  ;[arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
  localSectionOrder.value = arr
  store.setSettings({ sectionOrder: arr })
}
function moveDown(idx: number) {
  if (idx === localSectionOrder.value.length - 1) return
  const arr = [...localSectionOrder.value]
  ;[arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]]
  localSectionOrder.value = arr
  store.setSettings({ sectionOrder: arr })
}

type SectionKey = keyof typeof t.value.customizer.sections
function getSectionLabel(sec: string): string {
  return t.value.customizer.sections[sec as SectionKey] ?? sec
}
</script>
