import { readonly, ref } from 'vue'

const transitioning = ref(false)

/**
 * Standard Fade Transition (for Language switching etc.)
 */
function runPageTransition(action: () => void, fadeOutMs = 200, fadeInDelayMs = 50) {
  transitioning.value = true
  setTimeout(() => {
    action()
    setTimeout(() => {
      transitioning.value = false
    }, fadeInDelayMs)
  }, fadeOutMs)
}

/**
 * Modern Circular Ripple Transition (specifically for Theme switching)
 */
function runThemeTransition(action: () => void, event?: MouseEvent) {
  // @ts-ignore
  if (!document.startViewTransition) {
    action()
    return
  }

  const x = event?.clientX ?? window.innerWidth / 2
  const y = event?.clientY ?? window.innerHeight / 2
  const endRadius = Math.hypot(
    Math.max(x, window.innerWidth - x),
    Math.max(y, window.innerHeight - y)
  )

  // @ts-ignore
  const transition = document.startViewTransition(() => {
    action()
  })

  transition.ready.then(() => {
    const clipPath = [
      `circle(0px at ${x}px ${y}px)`,
      `circle(${endRadius}px at ${x}px ${y}px)`,
    ]
    
    // Create the ripple animation
    document.documentElement.animate(
      {
        clipPath: clipPath,
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    )
  })
}

export function usePageTransition() {
  return {
    transitioning: readonly(transitioning),
    runPageTransition,
    runThemeTransition
  }
}
