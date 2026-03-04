<template>
  <footer class="px-6 sm:px-16 py-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
    <router-link to="/" class="no-underline"><Logo size="sm" /></router-link>
    <p class="text-xs text-gray-400">© 2026 cvLab · cvlab.uz</p>
    <a href="https://buymeacoffee.com/ozodbro" target="_blank" rel="noopener noreferrer" class="btn-bmc">
      ☕ Kofe olib ber
    </a>
  </footer>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
</script>
