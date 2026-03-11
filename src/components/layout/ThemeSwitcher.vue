<template>
  <button
    class="theme-toggle"
    :class="{ 'theme-toggle--dark': isDark }"
    @click="toggleDark()"
    aria-label="Toggle Dark Mode"
  >
    <!-- Sun icon (left side) -->
    <span class="theme-toggle__icon theme-toggle__icon--sun" :class="isDark ? 'theme-toggle__icon--faded' : 'theme-toggle__icon--active'">
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    </span>

    <!-- Moon icon (right side) -->
    <span class="theme-toggle__icon theme-toggle__icon--moon" :class="isDark ? 'theme-toggle__icon--active' : 'theme-toggle__icon--faded'">
      <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </span>

    <!-- Sliding thumb -->
    <span class="theme-toggle__thumb" :class="isDark ? 'theme-toggle__thumb--right' : 'theme-toggle__thumb--left'">
      <!-- Active icon inside thumb -->
      <svg v-if="!isDark" class="theme-toggle__thumb-icon" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
      <svg v-else class="theme-toggle__thumb-icon" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>
    </span>
  </button>
</template>

<script setup lang="ts">
import { useDarkMode } from '@/composables/useDarkMode'

const { isDark, toggleDark } = useDarkMode()
</script>

<style>
/* Using non-scoped styles to avoid :global() issues */
.theme-toggle {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 60px;
  height: 30px;
  border-radius: 999px;
  background: #e2e8f0;
  border: 1px solid #cbd5e1;
  cursor: pointer;
  padding: 0;
  transition: background 0.4s ease, border-color 0.4s ease;
}

.theme-toggle--dark {
  background: #1e293b;
  border-color: #334155;
}

/* Track icons */
.theme-toggle__icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: opacity 0.3s ease, color 0.3s ease;
}

.theme-toggle__icon--sun {
  left: 7px;
  color: #94a3b8;
}

.theme-toggle__icon--moon {
  right: 7px;
  color: #94a3b8;
}

.theme-toggle__icon--active {
  opacity: 0;
}

.theme-toggle__icon--faded {
  opacity: 0.6;
}

/* Sliding thumb */
.theme-toggle__thumb {
  position: absolute;
  top: 3px;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left 0.45s cubic-bezier(0.34, 1.56, 0.64, 1),
              background 0.3s ease,
              box-shadow 0.3s ease;
  pointer-events: none;
}

.theme-toggle__thumb--left {
  left: 3px;
}

.theme-toggle__thumb--right {
  left: calc(100% - 25px);
  background: #334155;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.4);
}

.theme-toggle__thumb-icon {
  color: #3b82f6;
  transition: color 0.3s ease;
}

.theme-toggle__thumb--right .theme-toggle__thumb-icon {
  color: #93c5fd;
}
</style>
