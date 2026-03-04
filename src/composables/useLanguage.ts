import { ref, computed, readonly } from 'vue'

import uz from '@/language/uz.json'
import ru from '@/language/ru.json'
import en from '@/language/en.json'

export type LangCode = 'uz' | 'ru' | 'en'

const translations: Record<LangCode, typeof uz> = { uz, ru, en }

const STORAGE_KEY = 'cvlab-lang'

function getSavedLang(): LangCode {
    try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved && (saved === 'uz' || saved === 'ru' || saved === 'en')) {
            return saved
        }
    } catch { }
    return 'uz'
}

// ── Shared reactive state (singleton) ──
const currentLang = ref<LangCode>(getSavedLang())
const transitioning = ref(false)

export function useLanguage() {
    const t = computed(() => translations[currentLang.value])

    const availableLanguages: { code: LangCode; name: string; flag: string }[] = [
        { code: 'uz', name: "O'zbek", flag: '🇺🇿' },
        { code: 'ru', name: 'Русский', flag: '🇷🇺' },
        { code: 'en', name: 'English', flag: '🇬🇧' },
    ]

    function setLanguage(lang: LangCode) {
        if (lang === currentLang.value) return

        // Trigger smooth transition
        transitioning.value = true

        // Small delay for fade-out, then switch
        setTimeout(() => {
            currentLang.value = lang
            localStorage.setItem(STORAGE_KEY, lang)
            document.documentElement.lang = lang

            // Fade back in
            setTimeout(() => {
                transitioning.value = false
            }, 50)
        }, 200)
    }

    return {
        t,
        currentLang: readonly(currentLang),
        transitioning: readonly(transitioning),
        availableLanguages,
        setLanguage,
    }
}
