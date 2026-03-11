<template>
  <footer class="px-6 sm:px-16 py-4 border-t border-gray-100 dark:border-gray-800 dark:bg-navy-900 flex flex-col md:flex-row items-center justify-between gap-4 transition-colors">
    <router-link to="/" class="no-underline"><Logo size="sm" /></router-link>

    <p class="text-xs text-gray-400 dark:text-gray-500">
      &copy; {{ currentYear }} cvLab.uz &middot; {{ t.footer.copyright }}
    </p>

    <!-- Social links + coffee -->
    <div class="flex items-center gap-3">
      <!-- LinkedIn -->
      <a
        href="https://www.linkedin.com/in/ozodjon-jumaev/"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
        aria-label="LinkedIn"
        title="LinkedIn"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </a>

      <!-- Telegram -->
      <a
        href="https://t.me/ozodbek1411"
        target="_blank"
        rel="noopener noreferrer"
        class="social-link"
        aria-label="Telegram"
        title="Telegram"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
        </svg>
      </a>

      <a href="https://buymeacoffee.com/ozodbro" target="_blank" rel="noopener noreferrer" class="hover:-translate-y-0.5 transition-transform duration-200">
        <img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=ozodbro&button_colour=FFDD00&font_colour=000000&font_family=Cookie&outline_colour=000000&coffee_colour=ffffff" alt="Buy me a coffee" class="h-7 w-auto drop-shadow-sm rounded-md" />
      </a>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Logo from './Logo.vue'
import { useLanguage } from '@/composables/useLanguage'

const { t } = useLanguage()
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: #9ca3af;
  background: transparent;
  transition: color 0.2s, background 0.2s, transform 0.2s;
  text-decoration: none;
}
.social-link:hover {
  color: #374151;
  background: #f3f4f6;
  transform: translateY(-2px);
}
:global(.dark) .social-link {
  color: #6b7280;
}
:global(.dark) .social-link:hover {
  color: #d1d5db;
  background: #1f2937;
}
</style>
