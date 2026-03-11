<template>
  <div class="min-h-screen bg-gray-50 dark:bg-navy-900 flex flex-col transition-colors duration-300">
    <AppNav />
    <main class="flex-1 pt-24 px-4 sm:px-8 max-w-7xl mx-auto w-full">
      <!-- Not found state if strictly not matching / logging out -->
      <div v-if="showNotFound" class="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center w-full">
        <div class="h-24 w-24 bg-blue-50 dark:bg-blue-900/40 text-blue-brand dark:text-blue-400 rounded-full flex items-center justify-center mb-6 mx-auto">
          <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
        </div>
        <h1 class="text-[80px] leading-none font-bold text-gray-900 dark:text-white mb-4 tracking-tighter">404</h1>
        <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-3">Sahifa topilmadi</h2>
        <p class="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-8">
          Siz qidirayotgan sahifa mavjud emas yoki tizimga kirmaganingiz sababli yashirilgan.
        </p>
        <router-link to="/" class="btn-primary">
          Bosh sahifaga qaytish
        </router-link>
      </div>

      <template v-else>
        <div class="flex items-center justify-between mb-8">
          <h1 class="text-3xl font-display font-bold text-gray-900 dark:text-white">Mening rezyumelarim</h1>
          <button class="btn-primary cursor-pointer flex items-center justify-center" @click="createNew" :disabled="isChecking">
            <span v-if="isChecking" class="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin mr-1.5"></span>
            Yangi yaratish
          </button>
        </div>

        <div v-if="loading" class="flex justify-center py-20">
          <div class="h-8 w-8 rounded-full border-4 border-gray-200 border-t-blue-brand animate-spin"></div>
        </div>

      <div v-else-if="resumes.length === 0" class="text-center py-20 bg-white dark:bg-navy-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
        <div class="h-16 w-16 bg-blue-50 dark:bg-blue-900/40 text-blue-brand dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-2">Hali hech qanday rezyume yo'q</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-6 text-sm">Yangi professional rezyumeni bepul yarating</p>
        <button class="btn-primary cursor-pointer mt-2 flex items-center justify-center mx-auto" @click="createNewStart" :disabled="isCheckingStart">
          <span v-if="isCheckingStart" class="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin mr-1.5"></span>
          Boshlash
        </button>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in resumes" :key="item.id"
             class="group bg-white dark:bg-navy-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col hover:border-blue-brand/50"
             @click="openResume(item)">
          <div class="p-6 flex-1">
            <h3 class="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2 group-hover:text-blue-brand dark:group-hover:text-blue-400 transition-colors">{{ item.title || 'Rezyumem' }}</h3>
            <div class="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
               <span>Shablon: <span class="capitalize text-gray-700 dark:text-gray-300">{{ item.template }}</span></span>
               <span>{{ formatDate(item.updated_at) }}</span>
            </div>
          </div>
          <div class="px-6 py-3 bg-gray-50 gap-2 dark:bg-navy-900 border-t border-gray-100 dark:border-gray-700 flex items-center justify-between transition-colors">
            <button @click.stop="openResume(item)" class="text-[13px] font-medium text-blue-brand dark:text-blue-400 flex items-center hover:opacity-80 transition-opacity">
              Tahrirlash
              <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <div class="flex items-center gap-2">
               <!-- Preview button -->
               <button @click.stop="handlePreview(item)" :class="{'blur-[1px] opacity-60': !limitStore.isPremiumPlan}" class="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-navy-400 dark:hover:bg-navy-600 text-gray-700 dark:text-gray-200 text-[12.5px] font-semibold rounded-lg transition-colors" :title="t.myResumes.previewPremium">
                 <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                 {{ t.myResumes.preview }}
               </button>
               <!-- Delete button -->
               <button @click.stop="confirmDelete(item)" :class="{'blur-[1px] opacity-60': !limitStore.isPremiumPlan}" class="flex items-center justify-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/30 dark:hover:bg-red-900/50 text-red-600 dark:text-red-400 text-[12.5px] font-semibold rounded-lg transition-colors" :title="t.myResumes.deletePremium">
                 <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                 {{ t.myResumes.delete }}
               </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Preview Modal -->
      <div v-if="previewItem" class="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4" @click="closePreview">
        <div class="bg-[#e8edf2] dark:bg-[#061528] rounded-2xl w-full max-w-[90%] max-h-[90vh] overflow-y-auto relative flex flex-col items-center p-4 sm:p-8" @click.stop>
          <div class="absolute top-4 right-4 z-10 flex items-center gap-2">
            <button @click="onDownloadFromPreview" class="h-8 flex items-center justify-center gap-1.5 px-3 bg-blue-brand text-white text-[12px] font-semibold rounded-full shadow-sm hover:scale-105 transition-transform" :disabled="pdf.exporting.value">
              <svg v-if="!pdf.exporting.value" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
              <span v-else class="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              <span class="hidden sm:inline">{{ t.builder.downloadPdf }}</span>
            </button>
            <button @click="closePreview" class="w-8 h-8 flex items-center justify-center bg-white dark:bg-navy-800 text-gray-600 dark:text-gray-300 rounded-full shadow-sm hover:scale-105 transition-transform border border-gray-200 dark:border-gray-700">
              <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <CvPreview />
        </div>
      </div>

      <!-- Delete Confirmation Modal -->
      <div v-if="deleteItem" class="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" @click="closeDeleteModal">
        <div class="bg-white dark:bg-navy-800 rounded-2xl w-full max-w-sm p-6 shadow-xl relative transform transition-all" @click.stop>
          <div class="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/40 text-red-600 dark:text-red-400 flex items-center justify-center mb-4 mx-auto">
             <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
          </div>
          <h3 class="text-xl font-bold text-center text-gray-900 dark:text-white mb-2">{{ t.myResumes.confirmDeleteTitle }}</h3>
          <p class="text-center text-sm text-gray-500 dark:text-gray-400 mb-6">{{ t.myResumes.confirmDeleteDesc }}</p>
          <div class="flex items-center gap-3">
            <button @click="closeDeleteModal" class="flex-1 py-2.5 px-4 bg-gray-100 hover:bg-gray-200 dark:bg-navy-700 dark:hover:bg-navy-600 text-gray-700 dark:text-gray-200 font-semibold rounded-xl transition-colors disabled:opacity-50" :disabled="isDeleting">
              {{ t.myResumes.cancel }}
            </button>
            <button @click="executeDelete" class="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" :disabled="isDeleting">
              <span v-if="isDeleting" class="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              {{ isDeleting ? t.myResumes.deleting : t.myResumes.yesDelete }}
            </button>
          </div>
        </div>
      </div>
      </template>
    </main>
    <AppFooter class="mt-auto" v-if="authStore.user" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'
import { useCVStore } from '@/stores/cv'
import { useLimitStore } from '@/stores/limit'
import AppNav from '@/components/layout/AppNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import CvPreview from '@/components/preview/CvPreview.vue'
import { useLanguage } from '@/composables/useLanguage'
import { usePdfExport } from '@/composables/usePdfExport'
import type { CVData, TemplateId } from '@/types/cv'

const router = useRouter()
const { t } = useLanguage()
const pdf = usePdfExport()
const authStore = useAuthStore()
const cvStore = useCVStore()
const limitStore = useLimitStore()
const isChecking = ref(false)
const isCheckingStart = ref(false)

const resumes = ref<any[]>([])
const loading = ref(true)
const previewItem = ref<any>(null)
const deleteItem = ref<any>(null)
const isDeleting = ref(false)

// We track whether page should show 404 instead
const showNotFound = ref(false)

async function fetchResumes() {
  if (!authStore.user) {
    loading.value = false
    return
  }
  try {
    const { data, error } = await supabase
      .from('resumes')
      .select('id, title, template, updated_at, data')
      .eq('user_id', authStore.user.id)
      .order('updated_at', { ascending: false })

    if (error) throw error
    resumes.value = data || []

    await limitStore.loadPlanStatus()
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

function handleAuthValidation() {
  if (!authStore.user) {
    showNotFound.value = true
    document.title = "Sahifa topilmadi — cvLab"
  } else {
    showNotFound.value = false
    fetchResumes()
  }
}

onMounted(() => {
  if (authStore.loading) {
    const unwatch = watch(() => authStore.loading, (isLoading) => {
      if (!isLoading) {
         handleAuthValidation()
         unwatch()
      }
    })
  } else {
    handleAuthValidation()
  }
})

watch(() => authStore.user, () => {
  handleAuthValidation()
})

function formatDate(dateString: string) {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('uz-UZ', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(date)
}

function openResume(item: any) {
  cvStore.data = item.data as CVData
  cvStore.template = item.template as TemplateId
  cvStore.cloudId = item.id

  // Set the step safely to show the loaded data
  cvStore.step = 1
  cvStore.maxStep = 6

  router.push('/builder')
}

async function createNew() {
  isChecking.value = true
  try {
    cvStore.reset()
    router.push('/builder')
  } finally {
    isChecking.value = false
  }
}

async function createNewStart() {
  isCheckingStart.value = true
  try {
    cvStore.reset()
    router.push('/builder')
  } finally {
    isCheckingStart.value = false
  }
}

function handlePreview(item: any) {
  if (!limitStore.isPremiumPlan) {
    limitStore.showPremiumDialog = true
    return
  }
  cvStore.data = item.data as CVData
  cvStore.template = item.template as TemplateId
  cvStore.cloudId = item.id
  previewItem.value = item
}

function closePreview() {
  previewItem.value = null
}

async function onDownloadFromPreview() {
  const fn = cvStore.fullName || 'cv'
  const name = fn.toLowerCase().replace(/\s+/g, '_') + '.pdf'
  await pdf.exportPdf('cv-preview', name)
}

function confirmDelete(item: any) {
  if (!limitStore.isPremiumPlan) {
    limitStore.showPremiumDialog = true
    return
  }
  deleteItem.value = item
}

function closeDeleteModal() {
  if (isDeleting.value) return
  deleteItem.value = null
}

async function executeDelete() {
  if (!deleteItem.value) return
  isDeleting.value = true

  try {
    const item = deleteItem.value
    const { error } = await supabase.from('resumes').delete().eq('id', item.id)
    if (error) throw error
    resumes.value = resumes.value.filter(r => r.id !== item.id)

    // If the deleted resume was currently loaded in store, reset it
    if (cvStore.cloudId === item.id) {
       cvStore.reset()
    }
    deleteItem.value = null
  } catch (err) {
    console.error("Xatolik:", err)
    alert(t.value.myResumes.deleteError)
  } finally {
    isDeleting.value = false
  }
}
</script>
```
