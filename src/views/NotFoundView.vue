<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    <AppNav />
    <main class="flex-1 flex flex-col items-center justify-center px-4 py-24 text-center">
      <div class="h-24 w-24 bg-blue-50 text-blue-brand rounded-full flex items-center justify-center mb-6">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" class="w-12 h-12"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      </div>
      <h1 class="text-[80px] leading-none font-bold text-gray-900 mb-4 tracking-tighter">404</h1>
      <h2 class="text-2xl font-bold text-gray-800 mb-3">Sahifa topilmadi</h2>
      <p class="text-gray-500 max-w-sm mx-auto mb-8">
        Siz qidirayotgan sahifa mavjud emas yoki tizimga kirmaganingiz uchun yashirilgan bo'lishi mumkin.
      </p>
      <router-link to="/" class="btn-primary">
        Bosh sahifaga qaytish
      </router-link>
    </main>
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppNav from '@/components/layout/AppNav.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
</script>
