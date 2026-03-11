<template>
  <nav class="fixed top-0 inset-x-0 z-[300] h-14 flex items-center justify-between px-4 sm:px-8 md:px-12
              bg-white/72 dark:bg-navy-900/80 backdrop-blur-[28px] border-b border-white/40 dark:border-white/10
              shadow-[0_1px_0_rgba(0,0,0,.06)] dark:shadow-none transition-colors duration-300">

    <router-link to="/" class="no-underline flex items-center gap-1.5" :aria-label="t.nav.ariaHome">
      <Logo />
      <span class="hidden sm:inline-block text-[9px] font-semibold text-blue-brand/80 dark:text-blue-400 bg-blue-brand/8 dark:bg-blue-900/40 rounded-full px-1.5 py-0.5 tracking-wide">v2.0</span>
    </router-link>

    <div class="flex items-center gap-2 sm:gap-3.5">
      <a href="https://buymeacoffee.com/ozodbro" target="_blank" rel="noopener noreferrer" class="hidden sm:flex hover:-translate-y-0.5 transition-transform duration-200 dark:bg-[rgb(255,221,0)] dark:px-2 dark:py-1.5 dark:rounded-lg">
        <img src="/buyme-coffe.webp" alt="Buy me a coffee" class="h-6 w-auto drop-shadow-sm" />
      </a>
      <ThemeSwitcher />
      <LanguageSwitcher />
      <button @click="handleBoshlash" class="btn-primary !py-1.5 sm:!py-2 !px-4 sm:!px-5 !text-[12px] sm:!text-[13.5px]" :disabled="isChecking">
        <span v-if="isChecking" class="inline-block h-3.5 w-3.5 rounded-full border-2 border-white/30 border-t-white animate-spin mr-1.5"></span>
        {{ t.nav.start }}
      </button>

      <!-- Auth -->
      <template v-if="!auth.loading">
        <button v-if="!auth.user" @click="auth.openAuthModal" class="btn-ghost hidden sm:flex text-[12px] sm:text-[13.5px] font-medium !py-1.5 sm:!py-2 !px-3 cursor-pointer">
          Kirish
        </button>
        <div v-else class="relative hidden sm:block" ref="profileDropdownRef">

          <button @click="isProfileOpen = !isProfileOpen" class="relative z-50 flex items-center gap-2 cursor-pointer outline-none pl-2">
            <img v-if="auth.user.user_metadata?.avatar_url" :src="auth.user.user_metadata.avatar_url" class="w-8 h-8 rounded-full object-cover shadow-sm bg-gray-100" />
            <div v-else class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-xs uppercase">
              {{ auth.user.email?.[0] || 'U' }}
            </div>
          </button>

          <Transition
            enter-active-class="transition ease-out duration-200"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-150"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div v-if="isProfileOpen" class="absolute right-0 top-full pt-2 w-56 z-50 origin-top-right">
              <div class="bg-white dark:bg-navy-800 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700 py-1">

                <!-- Plan Tarifingiz -->
                <div class="px-4 py-3 border-b border-gray-50 dark:border-gray-700 bg-gray-50/30 dark:bg-navy-900/40">
                  <p class="text-[11px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-semibold mb-1">{{ t.limit.plan }}</p>
                  <div v-if="limitStore.isPremiumPlan" class="text-[13px] font-bold text-blue-brand dark:text-blue-400 flex items-center gap-1.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    {{ t.limit.premium }}
                  </div>
                  <div v-else class="flex flex-col gap-0.5">
                    <div class="text-[13px] font-bold text-gray-800 dark:text-gray-200">
                      {{ t.limit.free }}
                    </div>
                    <div class="text-[12.5px] font-medium text-gray-500 dark:text-gray-400">
                      <span v-if="limitStore.availableLimit && limitStore.availableLimit > 0" class="text-gray-600 dark:text-gray-300">
                        {{ t.limit.dailyLimitLeft.replace('{count}', String(limitStore.availableLimit)) }}
                      </span>
                      <span v-else class="text-orange-500 dark:text-orange-400">
                        {{ t.limit.dailyLimitOver }}
                      </span>
                    </div>
                  </div>
                </div>

                <router-link @click="isProfileOpen = false" to="/my-resumes" class="w-full text-left px-4 py-2 mt-1 text-[13px] text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-navy-900 flex items-center gap-2 cursor-pointer transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"></path>
                  </svg>
                  Mening rezyumelarim
                </router-link>
                <div class="h-px bg-gray-100 dark:bg-gray-700 my-1"></div>
                <button @click="auth.signOut(); isProfileOpen = false" class="w-full text-left px-4 py-2 text-[13px] text-red-600 dark:text-red-400 hover:bg-gray-50 dark:hover:bg-navy-900 flex items-center gap-2 cursor-pointer transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"></path>
                  </svg>
                  Tizimdan chiqish
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </template>
    </div>
  </nav>

  <WhatsNewModal />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import Logo from './Logo.vue'
import LanguageSwitcher from './LanguageSwitcher.vue'
import ThemeSwitcher from './ThemeSwitcher.vue'
import WhatsNewModal from '@/components/ui/WhatsNewModal.vue'
import { useRouter } from 'vue-router'
import { useLanguage } from '@/composables/useLanguage'
import { useAuthStore } from '@/stores/auth'
import { useLimitStore } from '@/stores/limit'
import { useCVStore } from '@/stores/cv'
import { onClickOutside } from '@vueuse/core'

const { t } = useLanguage()
const router = useRouter()
const auth = useAuthStore()
const limitStore = useLimitStore()
const cvStore = useCVStore()
const isChecking = ref(false)
const isProfileOpen = ref(false)
const profileDropdownRef = ref<HTMLElement | null>(null)

onClickOutside(profileDropdownRef, () => {
  isProfileOpen.value = false
})

async function handleBoshlash() {
  isChecking.value = true
  try {
    cvStore.reset()
    router.push('/builder')
  } finally {
    isChecking.value = false
  }
}

onMounted(() => {
  if (auth.user) {
    limitStore.loadPlanStatus()
  }
})

watch(() => auth.user, (newVal) => {
  if (newVal) {
    limitStore.loadPlanStatus()
  }
})
</script>
