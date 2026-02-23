import { ref, onMounted, onUnmounted } from 'vue'

export function useResizable(opts = { min: 300, max: 660, initial: 440 }) {
  const width      = ref(opts.initial)
  const dragging   = ref(false)
  let startX = 0, startW = 0

  function onDown(e: MouseEvent) {
    dragging.value = true
    startX = e.clientX
    startW = width.value
    document.body.style.cursor = 'col-resize'
    document.body.style.userSelect = 'none'
  }
  function onMove(e: MouseEvent) {
    if (!dragging.value) return
    width.value = Math.max(opts.min, Math.min(opts.max, startW + e.clientX - startX))
  }
  function onUp() {
    if (!dragging.value) return
    dragging.value = false
    document.body.style.cursor = ''
    document.body.style.userSelect = ''
  }

  onMounted(() => {
    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseup', onUp)
  })
  onUnmounted(() => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  })

  return { width, dragging, onDown }
}
