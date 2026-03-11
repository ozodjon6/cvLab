<template>
  <div class="min-h-screen bg-gray-50 dark:bg-navy-900 transition-colors duration-300" style="padding-top:56px">

    <!-- Loading State -->
    <div v-if="isInitializing" class="fixed inset-0 z-[9999] bg-white/70 dark:bg-navy-900/70 backdrop-blur-[3px] flex flex-col items-center justify-center transition-all duration-300">
      <div class="w-12 h-12 rounded-full border-4 border-gray-200 dark:border-gray-700 border-t-blue-brand dark:border-t-blue-400 animate-spin mb-4 shadow-sm"></div>
      <p class="text-sm font-semibold tracking-wide text-gray-700 dark:text-gray-300">{{ t.nav.verifying }}</p>
    </div>

    <!-- ── Top nav ── -->
    <nav class="fixed top-0 inset-x-0 z-[300] h-14 flex items-center justify-between px-3 sm:px-6
                bg-white/72 dark:bg-navy-900/80 backdrop-blur-[28px] border-b border-white/40 dark:border-white/10
                shadow-[0_1px_0_rgba(0,0,0,.06)] dark:shadow-none transition-colors duration-300">

      <!-- Back -->
      <router-link to="/"
        class="flex items-center gap-1 sm:gap-1.5 text-gray-400 dark:text-gray-500 hover:text-navy-800 dark:hover:text-white text-[12px] sm:text-[13px] font-medium
               transition-colors no-underline shrink-0">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        <span class="hidden sm:inline">{{ t.builder.back }}</span>
      </router-link>

      <!-- Steps -->
      <div class="flex-1 mx-4 min-w-0">
        <StepProgress
          :current="store.step"
          :maxReached="store.maxStep"
          @goto="store.goTo"
        />
      </div>

      <!-- Logo + Version + Lang + Theme -->
      <div class="flex items-center gap-2 shrink-0">
        <ThemeSwitcher />
        <LanguageSwitcher />

        <!-- User profile dropdown (same as AppNav logic) -->
        <div v-if="auth.user" class="relative hidden sm:block ml-2 mr-2" ref="profileDropdownRef">
          <button @click="isProfileOpen = !isProfileOpen" class="relative z-[310] flex items-center gap-2 cursor-pointer outline-none pl-2">
            <img v-if="auth.user.user_metadata?.avatar_url" :src="auth.user.user_metadata.avatar_url" class="w-8 h-8 rounded-full object-cover shadow-sm bg-gray-100" />
            <div v-else class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xs uppercase">
              {{ auth.user.email?.[0] || 'U' }}
            </div>
          </button>

          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div v-if="isProfileOpen" class="absolute right-0 top-full pt-2 w-56 z-[300] origin-top-right">
              <div class="bg-white dark:bg-navy-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1">
                <!-- Plan Tarifingiz -->
                <div class="px-4 py-3 border-b border-gray-50 dark:border-gray-700 bg-gray-50/30 dark:bg-navy-900/40">
                  <p class="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold mb-1">{{ t.limit.plan }}</p>
                  <div v-if="limitStore.isPremiumPlan" class="text-[13px] font-bold text-blue-brand dark:text-blue-400 flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    {{ t.limit.premium }}
                  </div>
                  <div v-else class="flex flex-col gap-0.5">
                    <div class="text-[13px] font-bold text-gray-800 dark:text-gray-200">
                      {{ t.limit.free }}
                    </div>
                    <div class="text-[12.5px] font-medium text-gray-500 dark:text-gray-400">
                      <span v-if="limitStore.availableLimit && limitStore.availableLimit > 0" class="text-gray-600 dark:text-gray-300">
                        {{ t.limit.dailyLimitLeft.replace('{count}', String(limitStore.availableLimit)) }}
                      </span>
                      <span v-else class="text-orange-500 dark:text-orange-400">
                        {{ t.limit.dailyLimitOver }}
                      </span>
                    </div>
                  </div>
                </div>

                <router-link @click="isProfileOpen = false" to="/my-resumes" class="w-full text-left px-4 py-2 mt-1 text-[13px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-navy-900 flex items-center gap-2 cursor-pointer transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                  </svg>
                  Mening rezyumelarim
                </router-link>
              </div>
            </div>
          </Transition>
        </div>

        <router-link to="/" class="no-underline shrink-0 hidden sm:flex items-center gap-1.5 ml-2">
          <Logo size="sm" />
          <span class="text-[9px] font-semibold text-blue-brand/80 dark:text-blue-400 bg-blue-brand/8 dark:bg-blue-900/40 rounded-full px-1.5 py-0.5 tracking-wide">v2.0</span>
        </router-link>
      </div>
    </nav>

    <!-- ── Main split ── -->
    <div class="builder-layout overflow-hidden transition-opacity duration-300" :class="{ 'opacity-50 pointer-events-none': isInitializing }" style="height:calc(100vh - 56px)">

      <!-- ── Form panel ── -->
      <div
        class="form-panel bg-white dark:bg-navy-800 border-r border-gray-200 dark:border-gray-700 flex flex-col shrink-0 overflow-y-auto md:overflow-hidden transition-colors"
        :style="desktopPanelStyle"
      >
        <!-- Scrollable form area -->
        <div class="flex-1 overflow-x-hidden md:overflow-y-auto px-4 sm:px-7 py-6">
          <Transition name="slide" mode="out-in">
            <TemplateSelector
              v-if="store.step === 1"
              :key="1"
              :selected="store.template"
              @update:selected="store.setTemplate"
            />
            <PersonalForm   v-else-if="store.step === 2" :key="2" />
            <ExperienceForm v-else-if="store.step === 3" :key="3" />
            <ProjectForm    v-else-if="store.step === 4" :key="4" />
            <EducationForm  v-else-if="store.step === 5" :key="5" />
            <SkillsForm     v-else                        :key="6" />
          </Transition>
        </div>

        <!-- Bottom nav buttons -->
        <div class="flex justify-between items-center px-7 py-3 border-t border-gray-100 dark:border-gray-700 bg-white dark:bg-navy-800 shrink-0 transition-colors">
          <button
            class="btn-ghost text-[12.5px] !py-2"
            :style="{ visibility: store.step === 1 ? 'hidden' : 'visible' }"
            @click="store.prev()"
          >{{ t.builder.backArrow }}</button>

          <!-- Step 6: download PDF -->
          <button
            v-if="store.step === 6"
            class="btn-primary text-[12.5px] !py-2 !px-5"
            :disabled="pdf.exporting.value"
            @click="onDownload"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/>
            </svg>
            {{ pdf.exporting.value ? t.builder.preparing : t.builder.downloadPdf }}
          </button>

          <!-- Steps 1–5: next -->
          <button
            v-else
            class="btn-primary text-[12.5px] !py-2 !px-4 sm:!px-5 shrink-0"
            :class="{ 'btn-attention': store.step === 1 }"
            @click="onNext"
          >
            {{ t.builder.next }}
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
                    w-0.5 h-7 bg-gray-200 dark:bg-gray-700 rounded-full
                    group-hover:bg-blue-brand/60 transition-colors" />
      </div>

      <!-- ── Preview panel ── -->
      <div class="preview-panel flex-1 overflow-y-auto bg-[#e8edf2] dark:bg-[#061528] p-2 sm:p-4 flex flex-col items-center min-w-0 transition-colors">
        <!-- Live label -->
        <div class="self-start mb-1.5 flex items-center gap-1.5 text-[10px] font-bold tracking-[.1em]
                    uppercase text-gray-400 dark:text-gray-500 pl-0.5">
          <span class="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-blink dark:bg-emerald-400" />
          {{ t.builder.livePreview }}
        </div>

        <!-- The A4 preview -->
        <CvPreview />

        <!-- Optional Login button if unauthorized -->
        <div v-if="!auth.user" class="mt-4 px-4 w-full flex justify-center">
          <button
            @click="auth.openAuthModal"
            class="animated-border-btn dark:animated-border-btn-dark !text-gray-700 dark:!text-gray-600 hover:!text-blue-brand dark:hover:!text-blue-400 font-medium text-[13px] !py-2.5 !px-6 transition-all flex items-center justify-center gap-2 max-w-sm w-full rounded-[10px]"
          >
            <svg class="shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
            {{ t.builder.loginToSave }}
          </button>
        </div>
        <div v-else class="pb-6"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, watch, ref, onMounted }  from 'vue'
import { useRouter }       from 'vue-router'
import { useCVStore }      from '@/stores/cv'
import { useAuthStore }    from '@/stores/auth'
import { useToast }        from '@/composables/useToast'
import { usePdfExport }    from '@/composables/usePdfExport'
import { useResizable }    from '@/composables/useResizable'
import { trackBuilderStep }from '@/composables/useAnalytics'
import { useLanguage }     from '@/composables/useLanguage'
import { useLimitStore }   from '@/stores/limit'
import Logo                from '@/components/layout/Logo.vue'
import LanguageSwitcher    from '@/components/layout/LanguageSwitcher.vue'
import ThemeSwitcher       from '@/components/layout/ThemeSwitcher.vue'
import StepProgress        from '@/components/builder/StepProgress.vue'
import TemplateSelector    from '@/components/builder/TemplateSelector.vue'
import PersonalForm        from '@/components/builder/PersonalForm.vue'
import ExperienceForm      from '@/components/builder/ExperienceForm.vue'
import ProjectForm         from '@/components/builder/ProjectForm.vue'
import EducationForm       from '@/components/builder/EducationForm.vue'
import SkillsForm          from '@/components/builder/SkillsForm.vue'
import CvPreview           from '@/components/preview/CvPreview.vue'
import { onClickOutside }  from '@vueuse/core'

const store  = useCVStore()
const auth   = useAuthStore()
const toast  = useToast()
const pdf    = usePdfExport()
const resize = useResizable()
const router = useRouter()
const { t }  = useLanguage()
const limitStore = useLimitStore()
const isProfileOpen = ref(false)
const isInitializing = ref(true)
const profileDropdownRef = ref<HTMLElement | null>(null)

onClickOutside(profileDropdownRef, () => {
  isProfileOpen.value = false
})

// Initialize default blocks if empty
if (store.data.experience.length === 0) store.addExp()
if (store.data.projects.length   === 0) store.addProj()
if (store.data.education.length  === 0) store.addEdu()
if (store.data.languages.length  === 0) store.addLang()

const panelW = resize.width

// Only apply fixed desktop panel width on wide screens
const desktopPanelStyle = computed(() => {
  if (typeof window !== 'undefined' && window.innerWidth < 768) return {}
  return { width: panelW.value + 'px', minWidth: '300px', maxWidth: '660px' }
})

// Analytics track
watch(() => store.step, (newStep) => {
  trackBuilderStep(newStep)
}, { immediate: true })

function onNext() {
  const ok = store.next()
  if (!ok) {
    const errs = store.stepErrors
    if (errs.length) {
      const key = errs[0].messageKey as keyof typeof t.value.validation
      toast.error(t.value.validation[key] || errs[0].messageKey)
    }
  } else if (store.step <= 6) {
    if (auth.user) {
      // Auto save in background
      store.saveToCloud(true)
    }
  }
}

async function onDownload() {
  if (!auth.user) {
    const canCreate = await limitStore.checkCanCreate()
    if (!canCreate) return
    limitStore.incrementGuestCount()
  }

  const fn = store.fullName || 'cv'
  const name = fn.toLowerCase().replace(/\s+/g, '_') + '.pdf'
  await pdf.exportPdf('cv-preview', name)

  store.step = 1

  if (auth.user) {
    router.push('/my-resumes')
  } else {
    router.push('/')
  }
}

onMounted(async () => {
  if (!store.cloudId) {
    const canCreate = await limitStore.checkCanCreate(false)
    if (!canCreate) {
      // Watch for the limit dialogs to close, then redirect
      const unwatch = watch(() => limitStore.showPremiumDialog || limitStore.showGuestDialog, (isShowing) => {
        if (!isShowing) {
          unwatch()
          router.push(auth.user ? '/my-resumes' : '/')
        }
      })
      isInitializing.value = false
      return
    }
  }
  isInitializing.value = false
})
</script>

<style>
.slide-enter-active,
.slide-leave-active { transition: all .22s ease; }
.slide-enter-from   { opacity: 0; transform: translateX(12px); }
.slide-leave-to     { opacity: 0; transform: translateX(-12px); }

@keyframes soft-pulse {
  0% { box-shadow: 0 0 0 0 rgba(5, 74, 237, 0.6); }
  70% { box-shadow: 0 0 0 8px rgba(26, 86, 219, 0); }
  100% { box-shadow: 0 0 0 0 rgba(26, 86, 219, 0); }
}
.btn-attention {
  animation: soft-pulse 2s infinite;
}

.animated-border-btn {
  background: linear-gradient(#fff, #fff) padding-box,
              linear-gradient(90deg, #93c5fd, #34d399, #93c5fd) border-box;
  border: 1.5px solid transparent;
  background-size: 100% 100%, 200% 100%;
  animation: border-pan 3s linear infinite;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
}
.animated-border-btn:hover {
  background: linear-gradient(#f8fafc, #f8fafc) padding-box,
              linear-gradient(90deg, #60a5fa, #10b981, #60a5fa) border-box;
  box-shadow: 0 4px 15px rgba(0,0,0,0.06);
}

@keyframes border-pan {
  0%   { background-position: 0% 50%, 0% 50%; }
  100% { background-position: 0% 50%, 200% 50%; }
}

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
