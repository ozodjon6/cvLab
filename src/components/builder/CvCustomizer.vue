<template>
  <div class="relative h-full flex flex-col">
    <!-- Header info -->
    <div class="mb-4">
      <h2 class="font-display font-bold text-lg tracking-tight mb-1 dark:text-white">{{ t.customizer.title }}</h2>
      <p class="text-xs text-gray-400">{{ t.customizer.subtitle }}</p>
    </div>

    <!-- Premium Info Block for Free Users -->
    <div v-if="isLocked" class="mb-6 p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10 border border-amber-200/50 dark:border-amber-700/30">
      <div class="flex items-start gap-3">
        <div class="w-8 h-8 shrink-0 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-amber-600 dark:text-amber-400">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
        </div>
        <div>
          <h3 class="text-[13px] font-bold text-amber-900 dark:text-amber-100 mb-1">{{ t.customizer.premiumTitle }}</h3>
          <p class="text-[11px] text-amber-800/70 dark:text-amber-400/70 leading-relaxed mb-3">
            {{ t.customizer.premiumDesc }}
          </p>
          <button @click="limitStore.openPremiumAccessDialog()" class="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold rounded-lg transition-colors shadow-sm">
            {{ t.limit.getPremium }}
          </button>
        </div>
      </div>
    </div>

    <!-- Content (No blur, just click tracking) -->
    <div 
      class="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-8"
      @click.capture="isLocked ? (limitStore.openPremiumAccessDialog(), $event.stopPropagation()) : null"
    >
      <!-- ── Public Link (Premium Feature) ── -->
      <div class="p-4 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-2xl relative group overflow-hidden">
        <div class="flex items-center justify-between mb-2">
          <p class="text-[11px] font-bold uppercase tracking-[.1em] text-blue-600 dark:text-blue-400">{{ t.customizer.publicLink }}</p>
          <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 uppercase tracking-wider">Premium</span>
        </div>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-4">{{ t.customizer.publicLinkDesc }}</p>
        
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 bg-white dark:bg-navy-900 border border-blue-200/50 dark:border-gray-700 rounded-xl shadow-sm">
            <span class="text-[12.5px] font-semibold text-gray-700 dark:text-gray-300">{{ t.customizer.enableLink }}</span>
            <button 
              @click="togglePublic" 
              class="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
              :class="isPublic ? 'bg-blue-brand' : 'bg-gray-200 dark:bg-gray-700'"
            >
              <span class="pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out" :class="isPublic ? 'translate-x-4' : 'translate-x-0'" />
            </button>
          </div>

          <div v-if="isPublic && currentSlug" class="flex items-center gap-2 p-1.5 pl-3 bg-white dark:bg-navy-800 border border-blue-200/50 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm">
            <span class="flex-1 text-[11px] font-medium text-gray-500 truncate select-all">cvlab.uz/r/{{ currentSlug }}</span>
            <button 
              @click="copyPublicLink" 
              class="px-3 py-1.5 bg-blue-brand hover:bg-blue-600 text-white text-[11px] font-bold rounded-lg transition-colors shadow-sm"
            >
              {{ isCopied ? t.customizer.linkCopied : t.customizer.copyLink }}
            </button>
          </div>
        </div>
      </div>

      <!-- ── Theme Color ── -->
      <div v-if="hasColorHeader" class="space-y-4">
        <p class="text-[11px] font-bold uppercase tracking-[.1em] text-gray-400 dark:text-gray-500">{{ t.customizer.themeColor }}</p>
        <div class="grid grid-cols-5 gap-2">
          <button
            v-for="c in THEME_COLORS"
            :key="c.value"
            @click="setColor(c.value)"
            class="group relative w-full aspect-square rounded-xl transition-all duration-200 border-2"
            :class="currentColor === c.value ? 'border-blue-brand ring-4 ring-blue-brand/10' : 'border-transparent hover:border-gray-200 dark:hover:border-gray-700'"
          >
            <span class="absolute inset-1 rounded-lg shadow-inner" :style="{ backgroundColor: c.value }"></span>
            <span v-if="currentColor === c.value" class="absolute inset-0 flex items-center justify-center text-white">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4"><path d="M20 6L9 17l-5-5"/></svg>
            </span>
          </button>
          
          <!-- Custom Color Picker -->
          <div class="relative group w-full aspect-square rounded-xl border-2 border-transparent">
             <input
              type="color"
              :value="currentColor"
              @input="onCustomColor"
              class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <div class="absolute inset-1 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-navy-800 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 4v16m8-8H4"/></svg>
            </div>
          </div>
        </div>
      </div>

      <!-- ── Font Family ── -->
      <div class="space-y-4">
        <div class="flex items-center justify-between">
          <p class="text-[11px] font-bold uppercase tracking-[.1em] text-gray-400 dark:text-gray-500">{{ t.customizer.fontFamily }}</p>
          <span v-if="isAcademicTemplate" class="text-[10px] font-medium text-amber-600 bg-amber-50 dark:bg-amber-900/20 px-2 py-0.5 rounded">Fixed for Template</span>
        </div>
        <div class="grid grid-cols-2 gap-2">
          <button
            v-for="f in FONT_OPTIONS"
            :key="f.value"
            @click="setFont(f.value)"
            :disabled="isAcademicTemplate && f.value !== 'EB Garamond'"
            class="px-3 py-3 rounded-xl border-2 text-left transition-all duration-200"
            :class="[
              currentFont === f.value ? 'border-blue-brand bg-blue-50/50 dark:bg-blue-900/20' : 'border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 dark:text-gray-300',
              (isAcademicTemplate && f.value !== 'EB Garamond') ? 'opacity-30 cursor-not-allowed grayscale' : ''
            ]"
            :style="{ fontFamily: f.value }"
          >
            <p class="text-[13px] font-bold mb-0.5">{{ f.label }}</p>
            <p class="text-[10px] opacity-60">{{ f.sampleText }}</p>
          </button>
        </div>
      </div>

      <!-- ── Section Order ── -->
      <div class="space-y-4">
        <p class="text-[11px] font-bold uppercase tracking-[.1em] text-gray-400 dark:text-gray-500">{{ t.customizer.sectionOrder }}</p>
        <p class="text-[11px] text-gray-400 mb-2">{{ t.customizer.sectionOrderHint }}</p>
        
        <div class="space-y-2">
          <div
            v-for="(sec, idx) in localSectionOrder"
            :key="sec"
            draggable="true"
            @dragstart="onDragStart(idx)"
            @dragover.prevent="onDragOver(idx)"
            @drop="onDrop"
            @dragend="onDragEnd"
            class="group flex items-center gap-3 p-3 bg-white dark:bg-navy-900 border border-gray-100 dark:border-gray-800 rounded-xl transition-all duration-200"
            :class="{ 
              'ring-2 ring-blue-brand/50 border-blue-brand/50 scale-[1.02] shadow-lg z-10': dragOverIdx === idx,
              'opacity-100': true
            }"
          >
            <!-- Handle -->
            <div class="cursor-grab active:cursor-grabbing text-gray-300 dark:text-gray-600 group-hover:text-gray-400 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 9h8M8 15h8"/></svg>
            </div>
            
            <!-- Label -->
            <span class="flex-1 text-[12.5px] font-semibold text-gray-700 dark:text-gray-300">{{ getSectionLabel(sec) }}</span>

            <!-- Move buttons (visible on hover) -->
            <div class="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button @click.stop="moveUp(idx)" :disabled="idx === 0" class="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800 text-gray-400 disabled:opacity-20">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M18 15l-6-6-6 6"/></svg>
              </button>
              <button @click.stop="moveDown(idx)" :disabled="idx === localSectionOrder.length - 1" class="w-6 h-6 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-navy-800 text-gray-400 disabled:opacity-20">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M6 9l6 6 6-6"/></svg>
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

// Logic for components
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
  { value: 'EB Garamond',      label: 'EB Garamond',    sampleText: 'Abc 123' },
  { value: 'Inter',            label: 'Inter',         sampleText: 'Abc 123' },
  { value: 'Roboto',           label: 'Roboto',        sampleText: 'Abc 123' },
  { value: 'Georgia',          label: 'Georgia',       sampleText: 'Abc 123' },
  { value: 'Outfit',           label: 'Outfit',        sampleText: 'Abc 123' },
  { value: 'Plus Jakarta Sans', label: 'Jakarta Sans',  sampleText: 'Abc 123' },
]

const currentColor = computed(() => store.data.settings?.themeColor ?? '#1A56DB')
const currentFont  = computed(() => isAcademicTemplate.value ? 'EB Garamond' : (store.data.settings?.fontFamily ?? 'Inter'))
const isPublic     = computed(() => store.data.settings?.isPublic ?? false)
const currentSlug   = computed(() => store.data.settings?.publicSlug ?? '')

const isCopied = ref(false)

function togglePublic() {
  const newVal = !isPublic.value
  let slug = currentSlug.value
  if (newVal && !slug) {
    // Cleaner slug: firstName-lastName-random
    const fName = store.data.personal.firstName.toLowerCase().replace(/[^a-z0-9]/g, '')
    const lName = store.data.personal.lastName.toLowerCase().replace(/[^a-z0-9]/g, '')
    const base = `${fName}-${lName}`.replace(/^-+|-+$/g, '') || 'resume'
    const random = Math.random().toString(36).substring(2, 6)
    slug = `${base}-${random}`
  }
  
  store.setSettings({ isPublic: newVal, publicSlug: slug })
}

async function copyPublicLink() {
  if (!currentSlug.value) return
  const origin = window.location.origin
  const fullUrl = `${origin}/r/${currentSlug.value}`
  try {
    await navigator.clipboard.writeText(fullUrl)
    isCopied.value = true
    setTimeout(() => { isCopied.value = false }, 2000)
  } catch (err) {
    console.error('Failed to copy link:', err)
  }
}

function setColor(val: string) {
  if (isLocked.value) return
  store.setSettings({ themeColor: val })
}
function onCustomColor(e: Event) {
  if (isLocked.value) return
  const val = (e.target as HTMLInputElement).value
  store.setSettings({ themeColor: val })
}
function setFont(val: string) {
  if (isLocked.value || isAcademicTemplate.value) return
  store.setSettings({ fontFamily: val })
}

// Drag & Drop
const EXCLUDE_SECTIONS = ['languages']
const filterOrder = (arr: string[]) => arr.filter(s => !EXCLUDE_SECTIONS.includes(s))
const localSectionOrder = ref<string[]>(filterOrder(store.data.settings?.sectionOrder ?? DEFAULT_ORDER))
watch(() => store.data.settings?.sectionOrder, (v) => { if (v) localSectionOrder.value = filterOrder(v) }, { deep: true })

let dragIdx = -1
const dragOverIdx = ref(-1)

function onDragStart(idx: number) { if (!isLocked.value) dragIdx = idx }
function onDragOver(idx: number)  { if (!isLocked.value) dragOverIdx.value = idx }
function onDrop() {
  if (isLocked.value || dragIdx === -1 || dragIdx === dragOverIdx.value) return
  const arr = [...localSectionOrder.value]
  const [moved] = arr.splice(dragIdx, 1)
  arr.splice(dragOverIdx.value, 0, moved)
  localSectionOrder.value = arr
  store.setSettings({ sectionOrder: arr })
  dragIdx = -1; dragOverIdx.value = -1
}
function onDragEnd() { dragOverIdx.value = -1 }

function moveUp(idx: number) {
  if (isLocked.value || idx === 0) return
  const arr = [...localSectionOrder.value]
  ;[arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]]
  localSectionOrder.value = arr
  store.setSettings({ sectionOrder: arr })
}
function moveDown(idx: number) {
  if (isLocked.value || idx === localSectionOrder.value.length - 1) return
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

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
.dark .custom-scrollbar::-webkit-scrollbar-thumb { background: #334155; }
</style>
