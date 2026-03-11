<template>
  <div class="lang-switcher" ref="switcherRef">
    <button
      class="lang-trigger"
      @click="isOpen = !isOpen"
      :aria-expanded="isOpen"
      aria-label="Tilni tanlash / Выбрать язык / Choose language"
    >
      <img :src="currentFlag" alt="flag" class="lang-flag" />
      <span class="lang-code">{{ currentLang.toUpperCase() }}</span>
      <svg
        class="lang-chevron"
        :class="{ 'rotate-180': isOpen }"
        width="10" height="10" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2.5"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>

    <Transition name="dropdown">
      <div v-if="isOpen" class="lang-dropdown">
        <button
          v-for="lang in availableLanguages"
          :key="lang.code"
          class="lang-option"
          :class="{ active: currentLang === lang.code }"
          @click="selectLang(lang.code)"
        >
          <img :src="lang.flag" alt="flag" class="lang-flag" />
          <span class="lang-name">{{ lang.name }}</span>
          <svg
            v-if="currentLang === lang.code"
            class="lang-check"
            width="14" height="14" viewBox="0 0 24 24"
            fill="none" stroke="currentColor" stroke-width="3"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useLanguage } from '@/composables/useLanguage'
import type { LangCode } from '@/composables/useLanguage'

const { currentLang, availableLanguages, setLanguage } = useLanguage()

const isOpen = ref(false)
const switcherRef = ref<HTMLElement | null>(null)

const currentFlag = computed(() =>
    availableLanguages.find(l => l.code === currentLang.value)?.flag || '/flags/uz.svg'
)

function selectLang(code: LangCode) {
  setLanguage(code)
  isOpen.value = false
}

function onClickOutside(e: MouseEvent) {
  if (switcherRef.value && !switcherRef.value.contains(e.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => document.addEventListener('click', onClickOutside))
onBeforeUnmount(() => document.removeEventListener('click', onClickOutside))
</script>

<style>
.lang-switcher {
  position: relative;
}

.lang-trigger {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 5px 10px;
  background: rgba(10, 37, 64, 0.04);
  border: 1px solid rgba(10, 37, 64, 0.08);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: 12px;
  font-weight: 600;
  color: #374151;
  white-space: nowrap;
}

.lang-trigger:hover {
  background: rgba(10, 37, 64, 0.08);
  border-color: rgba(10, 37, 64, 0.15);
  transform: translateY(-1px);
}

/* Dark mode styles are in src/assets/main.css (global) */

.lang-flag {
  width: 16px;
  height: 12px;
  border-radius: 2px;
  object-fit: cover;
  flex-shrink: 0;
  display: block;
  box-shadow: 0 0 0 1px rgba(0,0,0,0.08); /* Gives a tiny border effect */
}

.lang-code {
  letter-spacing: 0.04em;
}

.lang-chevron {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.5;
}

.lang-chevron.rotate-180 {
  transform: rotate(180deg);
}

.lang-dropdown {
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  min-width: 160px;
  background: white;
  border: 1px solid rgba(10, 37, 64, 0.1);
  border-radius: 12px;
  padding: 4px;
  box-shadow:
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 10px 25px -5px rgba(0, 0, 0, 0.1);
  z-index: 999;
  backdrop-filter: blur(20px);
}

.lang-option {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 9px 12px;
  border: none;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: left;
}

.lang-option:hover {
  background: rgba(26, 86, 219, 0.06);
  color: #1A56DB;
}

.lang-option.active {
  background: rgba(26, 86, 219, 0.08);
  color: #1A56DB;
  font-weight: 600;
}

.lang-name {
  flex: 1;
}

.lang-check {
  color: #1A56DB;
  flex-shrink: 0;
}

/* Dropdown transition */
.dropdown-enter-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
.dropdown-leave-active {
  transition: all 0.15s cubic-bezier(0.4, 0, 1, 1);
}
.dropdown-enter-from {
  opacity: 0;
  transform: translateY(-8px) scale(0.96);
}
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-4px) scale(0.98);
}
</style>
