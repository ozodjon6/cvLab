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
          <button @click="limitStore.openPremiumAccessDialog('feature')" class="px-4 py-1.5 bg-amber-500 hover:bg-amber-600 text-white text-[11px] font-bold rounded-lg transition-colors shadow-sm">
            {{ t.limit.getPremium }}
          </button>
        </div>
      </div>
    </div>

    <!-- Content (No blur, just click tracking) -->
    <div
      class="flex-1 overflow-y-auto pr-1 custom-scrollbar space-y-8"
      @click.capture="isLocked ? (limitStore.openPremiumAccessDialog('feature'), $event.stopPropagation()) : null"
    >
      <!-- ── Public Link (Premium Feature) ── -->
      <div class="p-4 bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800/50 rounded-2xl relative group overflow-hidden">
        <div class="flex items-center justify-between mb-2">
          <p class="text-[11px] font-bold uppercase tracking-[.1em] text-blue-600 dark:text-blue-400">{{ t.customizer.publicLink }}</p>
          <span class="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-400 uppercase tracking-wider">Premium</span>
        </div>
        <p class="text-[11px] text-gray-500 dark:text-gray-400 mb-4">{{ t.customizer.publicLinkDesc }}</p>

        <div class="space-y-3">
          <!-- Toggle Link -->
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

          <!-- Custom Slug Editor (Visible when public) -->
          <div v-if="isPublic" class="space-y-3">
             <div class="p-4 bg-white dark:bg-navy-900 border border-blue-200/50 dark:border-gray-700 rounded-2xl shadow-sm transition-all focus-within:shadow-md">
                <p class="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2.5 px-1">{{ t.customizer.publicLink }}</p>

                  <div class="flex flex-col gap-3">
                    <!-- URL Preview with Copy -->
                    <div class="flex items-center justify-between gap-3 p-2 px-3 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl border border-blue-100/50 dark:border-blue-800/30">
                      <div class="flex items-center gap-2 min-w-0">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="text-blue-500 shrink-0"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>
                        <span class="text-[11px] text-blue-600 dark:text-blue-400 font-bold truncate">cvlab.uz/r/{{ currentSlug }}</span>
                      </div>
                      <button
                        @click="copyPublicLink"
                        class="shrink-0 flex items-center gap-1.5 px-2 py-1 bg-white dark:bg-navy-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-navy-700 transition-all active:scale-95"
                      >
                         <svg v-if="!isCopied" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
                         <svg v-else width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" class="text-green-500 animate-in zoom-in duration-300"><path d="M20 6L9 17l-5-5"/></svg>
                         <span class="text-[10px] font-bold text-gray-500 dark:text-gray-400 capitalize">{{ isCopied ? t.customizer.linkCopied : t.customizer.copyLink }}</span>
                      </button>
                    </div>

                    <!-- Unified, Premium Input Bar -->
                    <div
                      class="group/slug-input flex items-center h-12 bg-gray-50/50 dark:bg-navy-950/50 border-2 border-gray-100 dark:border-gray-800 focus-within:border-blue-500/40 focus-within:bg-white dark:focus-within:bg-navy-900 focus-within:ring-4 focus-within:ring-blue-500/5 rounded-2xl transition-all overflow-hidden cursor-text"
                      @click="slugInputRef?.focus()"
                    >
                      <!-- Prefix Area -->
                      <div class="px-4 flex items-center h-full bg-gray-100/50 dark:bg-navy-900/50 border-r border-gray-100 dark:border-gray-800 select-none">
                        <span class="text-[12px] font-black text-gray-400 dark:text-gray-500 tracking-tight transition-colors group-focus-within/slug-input:text-blue-500/70">/r/</span>
                      </div>

                      <!-- Input Field -->
                      <input
                        ref="slugInputRef"
                        v-model="editableSlug"
                        @input="onSlugInput"
                        placeholder="your-custom-link"
                        class="min-w-0 flex-1 bg-transparent border-none p-0 px-4 text-[14px] font-bold text-gray-900 dark:text-white focus:ring-0 placeholder:text-gray-300 dark:placeholder:text-gray-600 h-full"
                      />

                      <!-- Right Side Actions (Fixed Width to prevent jumping) -->
                      <div class="flex items-center justify-center w-14 h-full border-l border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-navy-900/30 cursor-pointer">
                        <transition name="scale-fade" mode="out-in">
                          <!-- Check Availability Icon Button (Visible when modified) -->
                          <button
                            v-if="editableSlug !== currentSlug"
                            key="check"
                            @click.stop="checkAvailability"
                            :disabled="isChecking || !editableSlug"
                            class="w-9 h-9 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg shadow-blue-600/30 transition-all active:scale-90 disabled:opacity-50"
                            :title="t.customizer.checkAvailability"
                          >
                            <svg v-if="!isChecking" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                            <div v-else class="flex gap-1">
                              <span class="w-1 h-1 bg-white rounded-full animate-bounce"></span>
                              <span class="w-1 h-1 bg-white rounded-full animate-bounce [animation-delay:0.2s]"></span>
                            </div>
                          </button>

                          <!-- Static Edit Icon (Visible when unchanged) -->
                          <div
                            v-else
                            key="edit"
                            class="w-9 h-9 flex items-center justify-center text-gray-400 group-hover/slug-input:text-blue-500 transition-colors"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                          </div>
                        </transition>
                      </div>
                    </div>
                  </div>

                <!-- Status Message -->
                <div v-if="slugStatus !== 'idle'" class="flex items-center gap-1.5 mt-2.5 px-1 slide-in-from-top-1 animate-in duration-200">
                  <div class="h-1.5 w-1.5 rounded-full animate-pulse" :class="{
                    'bg-green-500': slugStatus === 'available',
                    'bg-red-500': slugStatus === 'taken' || slugStatus === 'invalid'
                  }"></div>
                  <p class="text-[10px] font-bold" :class="{
                    'text-green-600 dark:text-green-400': slugStatus === 'available',
                    'text-red-500': slugStatus === 'taken' || slugStatus === 'invalid'
                  }">
                    {{
                      slugStatus === 'available' ? t.customizer.slugAvailable :
                      slugStatus === 'taken' ? t.customizer.slugTaken :
                      slugStatus === 'invalid' ? t.customizer.invalidSlug : ''
                    }}
                  </p>
                </div>
             </div>
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

          <div class="relative group w-full aspect-square rounded-xl border-2 border-transparent">
             <input
              type="color"
              :value="currentColor"
              @input="onCustomColor"
              class="absolute inset-0 opacity-0 cursor-pointer w-full h-full z-10"
            />
            <div class="absolute inset-1 rounded-lg flex items-center justify-center bg-gray-100 dark:bg-navy-800 text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-200 transition-colors" :style="{ backgroundColor: currentColor }">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="mix-blend-difference text-white"><path d="M12 4v16m8-8H4"/></svg>
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
            class="group flex items-center gap-3 p-3 bg-white dark:bg-navy-900 border border-gray-100 dark:border-gray-800 rounded-xl transition-all duration-200 shadow-sm"
          >
            <div class="cursor-grab active:cursor-grabbing text-gray-300 dark:text-gray-600 group-hover:text-gray-400 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M8 9h8M8 15h8"/></svg>
            </div>
            <span class="flex-1 text-[12.5px] font-semibold text-gray-700 dark:text-gray-300">{{ getSectionLabel(sec) }}</span>
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
import { supabase } from '@/lib/supabase'

const store = useCVStore()
const { template } = storeToRefs(store)
const limitStore = useLimitStore()
const { t } = useLanguage()

const isLocked = computed(() => !limitStore.isPremiumPlan)
const hasColorHeader = computed(() => template.value === 'modern' || template.value === 'bold')
const isAcademicTemplate = computed(() => template.value === 'academic')

const currentColor = computed(() => store.data.settings?.themeColor ?? '#1A56DB')
const currentFont  = computed(() => isAcademicTemplate.value ? 'EB Garamond' : (store.data.settings?.fontFamily ?? 'Inter'))
const isPublic     = computed(() => store.data.settings?.isPublic ?? false)
const currentSlug   = computed(() => store.data.settings?.publicSlug ?? '')
const slugInputRef  = ref<HTMLInputElement | null>(null)

// Slug Logic
const editableSlug = ref(currentSlug.value)
const slugStatus = ref<'idle' | 'loading' | 'available' | 'taken' | 'invalid'>('idle')
const isChecking = ref(false)
const isCopied = ref(false)

watch(currentSlug, (v) => { editableSlug.value = v })

function onSlugInput() {
  slugStatus.value = 'idle'
  editableSlug.value = editableSlug.value.toLowerCase().replace(/[^a-z0-9-]/g, '')
}

async function checkAvailability() {
  const slug = editableSlug.value.trim()
  if (!slug) return

  if (slug.length < 3) {
    slugStatus.value = 'invalid'
    return
  }

  isChecking.value = true
  slugStatus.value = 'loading'

  try {
    // Check in Supabase
    const { data: existing, error } = await supabase
      .from('resumes')
      .select('id')
      .eq('slug', slug)
      .not('id', 'eq', store.cloudId || '00000000-0000-0000-0000-000000000000') // Don't match self
      .maybeSingle()

    if (error) throw error

    if (existing) {
      slugStatus.value = 'taken'
    } else {
      slugStatus.value = 'available'
      // Update store immediately if available and user wants
      store.setSettings({ publicSlug: slug })
    }
  } catch (err) {
    console.error('Error checking slug:', err)
    slugStatus.value = 'idle'
  } finally {
    isChecking.value = false
  }
}

function togglePublic() {
  const newVal = !isPublic.value
  let slug = currentSlug.value
  if (newVal && !slug) {
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

// Settings handlers
function setColor(val: string) { if (!isLocked.value) store.setSettings({ themeColor: val }) }
function onCustomColor(e: Event) { if (!isLocked.value) store.setSettings({ themeColor: (e.target as HTMLInputElement).value }) }
function setFont(val: string) { if (!isLocked.value && !isAcademicTemplate.value) store.setSettings({ fontFamily: val }) }

// Drag & Drop (unchanged logic)
const DEFAULT_ORDER = ['experience', 'education', 'projects', 'skills']
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
  store.setSettings({ sectionOrder: arr })
}
function moveDown(idx: number) {
  if (isLocked.value || idx === localSectionOrder.value.length - 1) return
  const arr = [...localSectionOrder.value]
  ;[arr[idx + 1], arr[idx]] = [arr[idx], arr[idx + 1]]
  store.setSettings({ sectionOrder: arr })
}
function getSectionLabel(sec: string): string {
  const keys = t.value.customizer.sections
  return (keys as any)[sec] ?? sec
}

const THEME_COLORS = [
  { value: '#1A56DB', name: 'Blue' }, { value: '#0A2540', name: 'Navy' },
  { value: '#059669', name: 'Emerald' }, { value: '#D97706', name: 'Amber' },
  { value: '#DC2626', name: 'Red' }, { value: '#7C3AED', name: 'Violet' },
  { value: '#0891B2', name: 'Cyan' }, { value: '#374151', name: 'Slate' },
]
const FONT_OPTIONS = [
  { value: 'EB Garamond', label: 'EB Garamond', sampleText: 'Abc 123' },
  { value: 'Inter', label: 'Inter', sampleText: 'Abc 123' },
  { value: 'Roboto', label: 'Roboto', sampleText: 'Abc 123' },
  { value: 'Georgia', label: 'Georgia', sampleText: 'Abc 123' },
  { value: 'Outfit', label: 'Outfit', sampleText: 'Abc 123' },
  { value: 'Plus Jakarta Sans', label: 'Jakarta Sans', sampleText: 'Abc 123' },
]
</script>
<style scoped lang="css">
.scale-fade-enter-active, .scale-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.scale-fade-enter-from, .scale-fade-leave-to {
  opacity: 0;
  transform: scale(0.8) rotate(-10deg);
}
</style>
