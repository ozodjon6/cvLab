<template>
  <div class="min-h-screen bg-gray-50" style="padding-top:56px">

    <!-- ── Top nav ── -->
    <nav class="fixed top-0 inset-x-0 z-[300] h-14 flex items-center justify-between px-6
                bg-white/72 backdrop-blur-[28px] border-b border-white/40
                shadow-[0_1px_0_rgba(0,0,0,.06)]">

      <!-- Back -->
      <router-link to="/"
        class="flex items-center gap-1.5 text-gray-400 hover:text-navy-800 text-[13px] font-medium
               transition-colors no-underline shrink-0">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Orqaga
      </router-link>

      <!-- Steps -->
      <div class="flex-1 mx-4 min-w-0">
        <StepProgress
          :current="store.step"
          :maxReached="store.maxStep"
          @goto="store.goTo"
        />
      </div>

      <!-- Logo -->
      <router-link to="/" class="no-underline shrink-0"><Logo size="sm" /></router-link>
    </nav>

    <!-- ── Main split ── -->
    <div class="builder-layout overflow-hidden" style="height:calc(100vh - 56px)">

      <!-- ── Form panel ── -->
      <div
        class="form-panel bg-white border-r border-gray-200 flex flex-col overflow-hidden shrink-0"
        :style="desktopPanelStyle"
      >
        <!-- Scrollable form area -->
        <div class="flex-1 overflow-y-auto px-7 py-6">
          <Transition name="slide" mode="out-in">
            <TemplateSelector
              v-if="store.step === 1"
              :key="1"
              :selected="store.template"
              @update:selected="store.setTemplate"
            />
            <PersonalForm  v-else-if="store.step === 2" :key="2" />
            <ExperienceForm v-else-if="store.step === 3" :key="3" />
            <EducationForm  v-else-if="store.step === 4" :key="4" />
            <SkillsForm     v-else                        :key="5" />
          </Transition>
        </div>

        <!-- Bottom nav buttons -->
        <div class="flex justify-between items-center px-7 py-3 border-t border-gray-100 bg-white shrink-0">
          <button
            class="btn-ghost text-[12.5px] !py-2"
            :style="{ visibility: store.step === 1 ? 'hidden' : 'visible' }"
            @click="store.prev()"
          >← Orqaga</button>

          <!-- Step 5: download PDF -->
          <button
            v-if="store.step === 5"
            class="btn-primary text-[12.5px] !py-2 !px-5"
            :disabled="pdf.exporting.value"
            @click="onDownload"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            {{ pdf.exporting.value ? 'Tayyorlanmoqda...' : 'PDF yuklab olish' }}
          </button>

          <!-- Steps 1–4: next -->
          <button
            v-else
            class="btn-primary text-[12.5px] !py-2 !px-5"
            @click="onNext"
          >
            Keyingisi →
          </button>
        </div>
      </div>

      <!-- ── Resize handle (desktop only) ── -->
      <div
        class="resize-handle w-1.5 cursor-col-resize relative shrink-0 transition-colors hover:bg-blue-brand/40 group"
        :class="{ 'bg-blue-brand/60': resize.dragging.value }"
        @mousedown="resize.onDown"
      >
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                    w-0.5 h-7 bg-gray-200 rounded-full
                    group-hover:bg-blue-brand/60 transition-colors" />
      </div>

      <!-- ── Preview panel ── -->
      <div class="preview-panel flex-1 overflow-y-auto bg-[#e8edf2] p-2 flex flex-col items-center min-w-0">
        <!-- Live label -->
        <div class="self-start mb-1.5 flex items-center gap-1.5 text-[10px] font-bold tracking-[.1em]
                    uppercase text-gray-400 pl-0.5">
          <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-blink" />
          Jonli ko'rinish
        </div>

        <!-- The A4 preview -->
        <CvPreview />

        <!-- PDF button below preview -->
        <div class="mt-3 pb-3">
          <button
            class="btn-primary text-[12.5px] !py-2 !px-5"
            :disabled="pdf.exporting.value"
            @click="onDownload"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            {{ pdf.exporting.value ? 'Tayyorlanmoqda...' : 'PDF yuklab olish' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed }         from 'vue'
import { useCVStore }      from '@/stores/cv'
import { useToast }        from '@/composables/useToast'
import { usePdfExport }    from '@/composables/usePdfExport'
import { useResizable }    from '@/composables/useResizable'
import Logo                from '@/components/layout/Logo.vue'
import StepProgress        from '@/components/builder/StepProgress.vue'
import TemplateSelector    from '@/components/builder/TemplateSelector.vue'
import PersonalForm        from '@/components/builder/PersonalForm.vue'
import ExperienceForm      from '@/components/builder/ExperienceForm.vue'
import EducationForm       from '@/components/builder/EducationForm.vue'
import SkillsForm          from '@/components/builder/SkillsForm.vue'
import CvPreview           from '@/components/preview/CvPreview.vue'

const store  = useCVStore()
const toast  = useToast()
const pdf    = usePdfExport()
const resize = useResizable()

// Initialize default blocks if empty
if (store.data.experience.length === 0) store.addExp()
if (store.data.education.length  === 0) store.addEdu()
if (store.data.languages.length  === 0) store.addLang()

const panelW = resize.width

// Only apply fixed desktop panel width on wide screens
const desktopPanelStyle = computed(() => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) return {}
  return { width: panelW.value + 'px', minWidth: '300px', maxWidth: '660px' }
})

function onNext() {
  const ok = store.next()
  if (!ok) {
    const errs = store.stepErrors
    if (errs.length) toast.error(errs[0].message)
  } else if (store.step < 5) {
    toast.success('Saqlandi ✓')
  }
}

function onDownload() {
  const fn = store.fullName || 'cv'
  const name = fn.toLowerCase().replace(/\s+/g, '_') + '.pdf'
  pdf.exportPdf('cv-preview', name)
}
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active { transition: all .22s ease; }
.slide-enter-from   { opacity: 0; transform: translateX(12px); }
.slide-leave-to     { opacity: 0; transform: translateX(-12px); }

/* ── Responsive builder layout ── */
.builder-layout {
  display: flex;
  flex-direction: row;
}

/* Mobile: stack vertically, allow full scroll */
@media (max-width: 767px) {
  .builder-layout {
    flex-direction: column;
    height: auto !important;
    min-height: calc(100vh - 56px);
    overflow-y: auto;
  }
  .form-panel {
    width: 100% !important;
    min-width: unset !important;
    max-width: unset !important;
    height: auto;
    min-height: 320px;
    overflow: visible;
    border-right: none;
    border-bottom: 1px solid #e5e7eb;
  }
  .form-panel > .flex-1 { overflow-y: visible; }
  .resize-handle { display: none; }
  .preview-panel {
    width: 100%;
    overflow-y: visible;
    padding-bottom: 1rem;
  }
}
</style>
