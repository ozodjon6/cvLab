import { useDark, useToggle } from '@vueuse/core'
import { usePageTransition } from '@/composables/usePageTransition'

// Single shared instance across the entire app
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
})

const toggleDark = useToggle(isDark)

export function useDarkMode() {
  const { runThemeTransition } = usePageTransition()

  function toggleDarkWithTransition(event?: MouseEvent) {
    runThemeTransition(() => {
      toggleDark()
    }, event)
  }

  return { isDark, toggleDark, toggleDarkWithTransition }
}
