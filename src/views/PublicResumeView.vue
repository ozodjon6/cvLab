<template>
  <div class="min-h-screen bg-gray-50 dark:bg-navy-900 flex flex-col items-center py-8 px-4 sm:px-6">
    <!-- Loading state -->
    <div v-if="isLoading" class="flex flex-col items-center justify-center py-24">
      <div class="h-12 w-12 rounded-full border-4 border-blue-500/20 border-t-blue-500 animate-spin mb-4"></div>
      <p class="text-gray-500 dark:text-gray-400 font-medium">Rezyume yuklanmoqda...</p>
    </div>

    <!-- Error / Not Found -->
    <div v-else-if="error" class="max-w-md w-full text-center py-20">
      <div class="w-20 h-20 bg-red-50 dark:bg-red-900/40 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
      </div>
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{{ errorTitle }}</h1>
      <p class="text-gray-500 dark:text-gray-400 mb-8">{{ errorDesc }}</p>
      <router-link to="/" class="btn-primary inline-flex items-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
        Bosh sahifaga qaytish
      </router-link>
    </div>

    <!-- Resume Preview -->
    <div v-else class="w-full max-w-[850px] animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div class="flex items-center justify-between mb-6 px-1">
        <router-link to="/" class="flex items-center gap-2 group transition-opacity">
          <div class="w-8 h-8 rounded-lg bg-blue-brand flex items-center justify-center text-white font-bold text-lg">C</div>
          <span class="font-display font-bold text-xl dark:text-white group-hover:text-blue-brand transition-colors">cvLab</span>
        </router-link>

        <button @click="printResume" class="btn-secondary !py-2 !px-4 flex items-center gap-2 text-sm">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9V2h12v7M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2m-2 4H8v-4h8v4z"/></svg>
          PDF yuklash / Chop etish
        </button>
      </div>

      <div class="bg-white shadow-2xl rounded-sm overflow-hidden ring-1 ring-gray-950/5 relative">
        <CvPreview ref="previewRef" />
      </div>
      
      <div class="mt-8 text-center">
        <p class="text-xs text-gray-400 flex items-center justify-center gap-1">
          Ushbu rezyume <a href="https://cvlab.uz" target="_blank" class="text-blue-brand font-bold hover:underline">cvLab.uz</a> yordamida yaratilgan
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { useCVStore } from '@/stores/cv'
import CvPreview from '@/components/preview/CvPreview.vue'

const route = useRoute()
const cvStore = useCVStore()

const isLoading = ref(true)
const error = ref(false)
const errorTitle = ref('')
const errorDesc = ref('')
const previewRef = ref<any>(null)

async function loadPublicResume() {
  const slug = route.params.slug as string
  if (!slug) {
    showError('Havola noto\'g\'ri', 'Ushbu havola bo\'yicha hech narsa topilmadi.')
    return
  }

  try {
    const { data, error: dbError } = await supabase
      .from('resumes')
      .select('*')
      .eq('slug', slug)
      .eq('is_public', true)
      .single()

    if (dbError || !data) {
      showError('Rezyume topilmadi', 'Ushbu rezyume o\'chirilgan bo\'lishi yoki u ommaga yopiq bo\'lishi mumkin.')
      return
    }

    // Set store data temporarily for preview
    cvStore.data = data.data
    cvStore.template = data.template
    
    // Update doc title
    const name = `${data.data.personal.firstName} ${data.data.personal.lastName}`
    document.title = `${name} — Rezyume (cvLab)`

  } catch (err) {
    console.error('Error loading public resume:', err)
    showError('Xatolik yuz berdi', 'Ma\'lumotlarni yuklashda muammo yuzaga keldi.')
  } finally {
    isLoading.value = false
  }
}

function showError(title: string, desc: string) {
  error.value = true
  errorTitle.value = title
  errorDesc.value = desc
  isLoading.value = false
}

function printResume() {
  window.print()
}

onMounted(() => {
  loadPublicResume()
})
</script>

<style scoped>
@media print {
  .bg-gray-50, .bg-white { background: white !important; }
  .min-h-screen { padding: 0 !important; }
  .btn-secondary, .btn-primary, router-link, button, .flex.items-center.justify-between, .mt-8 { display: none !important; }
  .w-full { width: 100% !important; margin: 0 !important; }
  .shadow-2xl { shadow: none !important; }
  .max-w-\[850px\] { max-width: 100% !important; }
}
</style>
