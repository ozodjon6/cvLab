<template>
  <section class="py-16 md:py-[90px] px-6 sm:px-16 bg-white">
    <div class="max-w-[800px] mx-auto">
      <p class="section-label text-center mb-2">{{ t.faq.label }}</p>
      <h2 class="section-title text-center text-[28px] md:text-[clamp(28px,3.5vw,42px)] mb-8 md:mb-12 font-extrabold tracking-[-1px] leading-[1.1]">
        {{ t.faq.title }}
      </h2>

      <div class="space-y-4">
        <div v-for="(faq, i) in t.faq.items" :key="i" class="border border-gray-200 rounded-xl overflow-hidden">
          <button 
            @click="toggle(i)"
            class="w-full flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h3 class="font-semibold text-[15px] sm:text-[16px] text-gray-900 pr-4">{{ faq.question }}</h3>
            <span class="text-gray-400 font-display text-xl leading-none">
              {{ activeIndex === i ? '−' : '+' }}
            </span>
          </button>
          <div v-show="activeIndex === i" class="p-5 text-gray-600 text-[14px] leading-relaxed bg-white border-t border-gray-100">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
const activeIndex = ref<number | null>(0)

function toggle(index: number) {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>
