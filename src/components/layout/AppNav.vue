<template>
  <nav class="fixed top-0 inset-x-0 z-[300] h-14 flex items-center justify-between px-12
              bg-white/72 backdrop-blur-[28px] border-b border-white/40
              shadow-[0_1px_0_rgba(0,0,0,.06)]">

    <router-link to="/" class="no-underline flex items-center gap-1.5" aria-label="cvLab bosh sahifa">
      <Logo />
      <span class="text-[9px] font-semibold text-blue-brand/60 bg-blue-brand/8 rounded-full px-1.5 py-0.5 tracking-wide">v1.0</span>
    </router-link>

    <div class="flex items-center gap-3.5">
      <a href="https://buymeacoffee.com" target="_blank" rel="noopener noreferrer" class="btn-bmc">
        ☕ Kofe olib ber
      </a>
      <router-link to="/builder" class="btn-primary !py-2 !px-5 !text-[13.5px]">
        Boshlash →
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
</script>
