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
  const { runPageTransition } = usePageTransition()

  function toggleDarkWithTransition() {
    runPageTransition(() => {
      toggleDark()
    })
  }

  return { isDark, toggleDark, toggleDarkWithTransition }
}
