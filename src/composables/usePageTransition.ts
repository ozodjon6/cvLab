import { readonly, ref } from 'vue'

const transitioning = ref(false)
let activeTimer: ReturnType<typeof setTimeout> | null = null

function clearActiveTimer() {
  if (activeTimer) {
    clearTimeout(activeTimer)
    activeTimer = null
  }
}

function runPageTransition(action: () => void, fadeOutMs = 200, fadeInDelayMs = 50) {
  transitioning.value = true
  clearActiveTimer()

  activeTimer = setTimeout(() => {
    action()

    activeTimer = setTimeout(() => {
      transitioning.value = false
      activeTimer = null
    }, fadeInDelayMs)
  }, fadeOutMs)
}

export function usePageTransition() {
  return {
    transitioning: readonly(transitioning),
    runPageTransition,
  }
}
