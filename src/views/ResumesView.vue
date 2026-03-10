<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <AppNav />
    <main class="flex-1 pt-24 px-4 sm:px-8 max-w-5xl mx-auto w-full">
      <div class="flex items-center justify-between mb-8">
        <h1 class="text-3xl font-display font-bold text-gray-900">Mening rezyumelarim</h1>
        <router-link to="/builder" class="btn-primary cursor-pointer" @click="createNew">Yangi yaratish</router-link>
      </div>

      <div v-if="loading" class="flex justify-center py-20">
        <div class="h-8 w-8 rounded-full border-4 border-gray-200 border-t-blue-brand animate-spin"></div>
      </div>
      
      <div v-else-if="resumes.length === 0" class="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
        <div class="h-16 w-16 bg-blue-50 text-blue-brand rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
        </div>
        <h3 class="text-xl font-bold text-gray-900 mb-2">Hali hech qanday rezyume yo'q</h3>
        <p class="text-gray-500 mb-6 text-sm">Yangi professional rezyumeni bepul yarating</p>
        <router-link to="/builder" class="btn-primary cursor-pointer" @click="createNew">Boshlash</router-link>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="item in resumes" :key="item.id" 
             class="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col"
             @click="openResume(item)">
          <div class="p-6 flex-1">
            <h3 class="font-bold text-lg text-gray-900 mb-2 group-hover:text-blue-brand transition-colors">{{ item.title || 'Rezyumem' }}</h3>
            <div class="flex items-center justify-between text-xs text-gray-500">
               <span>Shablon: <span class="capitalize">{{ item.template }}</span></span>
               <span>{{ formatDate(item.updated_at) }}</span>
            </div>
          </div>
          <div class="px-6 py-3 bg-gray-50 border-t border-gray-100 text-sm font-medium text-blue-brand flex items-center justify-between">
            Tahrirlash
            <svg class="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </div>
        </div>
      </div>
    </main>
    <AppFooter class="mt-auto" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth'
import { useCVStore } from '@/stores/cv'
import AppNav from '@/components/layout/AppNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import type { CVData, TemplateId } from '@/types/cv'

const router = useRouter()
const authStore = useAuthStore()
const cvStore = useCVStore()

const resumes = ref<any[]>([])
const loading = ref(true)

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
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  if (authStore.loading) {
    const unwatch = watch(() => authStore.loading, (isLoading) => {
      if (!isLoading) {
         fetchResumes()
         unwatch()
      }
    })
  } else {
    fetchResumes()
  }
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

function createNew() {
  cvStore.reset()
}
</script>
