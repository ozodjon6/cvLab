<template>
  <section class="py-16 md:py-[90px] px-6 sm:px-16 bg-white">
    <div class="max-w-[800px] mx-auto">
      <p class="section-label text-center mb-2">{{ t.faq.label }}</p>
      <h2 class="section-title text-center text-[28px] md:text-[clamp(28px,3.5vw,42px)] mb-8 md:mb-12 font-extrabold tracking-[-1px] leading-[1.1]">
        {{ t.faq.title }}
      </h2>

      <div class="space-y-4">
        <div v-for="(faq, i) in t.faq.items" :key="i" class="faq-item">
          <button
            @click="toggle(i)"
            class="faq-trigger"
            :aria-expanded="activeIndex === i"
          >
            <h3 class="font-semibold text-[15px] sm:text-[16px] text-gray-900 pr-4">{{ faq.question }}</h3>
            <span class="faq-icon" :class="{ open: activeIndex === i }">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </span>
          </button>
          <div class="faq-body" :class="{ expanded: activeIndex === i }">
            <div class="faq-content">{{ faq.answer }}</div>
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

<style scoped>
.faq-item {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  overflow: hidden;
}

.faq-trigger {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  text-align: left;
  background: #f9fafb;
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.faq-trigger:hover {
  background: #f3f4f6;
}

.faq-icon {
  flex-shrink: 0;
  color: #9ca3af;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
}

.faq-icon.open {
  transform: rotate(180deg);
  color: #6b7280;
}

/* Smooth height animation using max-height */
.faq-body {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.35s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-body.expanded {
  max-height: 500px;
}

.faq-content {
  padding: 20px;
  color: #4b5563;
  font-size: 14px;
  line-height: 1.7;
  background: white;
  border-top: 1px solid #f3f4f6;
}
</style>
