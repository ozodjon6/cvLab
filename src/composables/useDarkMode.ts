import { useDark, useToggle } from '@vueuse/core'

// Single shared instance across the entire app
const isDark = useDark({
  selector: 'html',
  attribute: 'class',
  valueDark: 'dark',
  valueLight: '',
})

const toggleDark = useToggle(isDark)

export function useDarkMode() {
  return { isDark, toggleDark }
}
