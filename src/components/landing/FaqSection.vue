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
            <span class="faq-chevron" :class="{ open: activeIndex === i }">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </button>
          <Transition name="faq-slide">
            <div v-show="activeIndex === i" class="p-5 text-gray-600 text-[14px] leading-relaxed bg-white border-t border-gray-100">
              {{ faq.answer }}
            </div>
          </Transition>
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

<style scoped>
.faq-chevron {
  flex-shrink: 0;
  color: #9ca3af;
  display: flex;
  align-items: center;
  transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s;
}
.faq-chevron.open {
  transform: rotate(180deg);
  color: #6b7280;
}

/* Only animate opening — closing is instant (prevents jump when switching items) */
.faq-slide-enter-active {
  transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.4, 0, 0.2, 1);
}
.faq-slide-leave-active {
  transition: none;
}
.faq-slide-enter-from {
  opacity: 0;
  transform: translateY(-6px);
}
.faq-slide-leave-to {
  opacity: 0;
}
</style>
