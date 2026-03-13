import { ref, computed, readonly } from 'vue'

import uz from '@/language/uz.json'
import ru from '@/language/ru.json'
import en from '@/language/en.json'
import { usePageTransition } from '@/composables/usePageTransition'

export type LangCode = 'uz' | 'ru' | 'en'

const translations: Record<LangCode, typeof uz> = { uz, ru, en }

const STORAGE_KEY = 'cvlab-lang'
const { transitioning, runPageTransition } = usePageTransition()

function getSavedLang(): LangCode {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved && (saved === 'uz' || saved === 'ru' || saved === 'en')) {
            return saved
        }
        
        // Auto-detect based on browser language
        const browserLang = navigator.language.toLowerCase()
        if (browserLang.includes('uz')) return 'uz'
        if (browserLang.includes('ru')) return 'ru'
        
        // Default to English for international users
        return 'en'
    } catch { }
    return 'en'
}

// ── Shared reactive state (singleton) ──
const currentLang = ref<LangCode>(getSavedLang())

export function useLanguage() {
    const t = computed(() => translations[currentLang.value])

    const availableLanguages: { code: LangCode; name: string; flag: string }[] = [
        { code: 'uz', name: "O'zbek", flag: '/flags/uz.svg' },
        { code: 'ru', name: 'Русский', flag: '/flags/ru.svg' },
        { code: 'en', name: 'English', flag: '/flags/gb.svg' },
    ]

    function setLanguage(lang: LangCode) {
        if (lang === currentLang.value) return

        runPageTransition(() => {
            currentLang.value = lang
            localStorage.setItem(STORAGE_KEY, lang)
            document.documentElement.lang = lang
        })
    }

    return {
        t,
        currentLang: readonly(currentLang),
        transitioning: readonly(transitioning),
        availableLanguages,
        setLanguage,
    }
}
