import { ref } from 'vue'

export type ToastType = 'success' | 'error' | 'info'
export interface Toast { id: string; message: string; type: ToastType }

// Singleton state — shared across all usages
const toasts = ref<Toast[]>([])

export function useToast() {
  function show(message: string, type: ToastType = 'success', ms = 3000) {
    const id = Math.random().toString(36).slice(2)
    toasts.value.push({ id, message, type })
    setTimeout(() => { toasts.value = toasts.value.filter(t => t.id !== id) }, ms)
  }

  return {
    toasts,
    success: (msg: string) => show(msg, 'success'),
    error:   (msg: string) => show(msg, 'error'),
    info:    (msg: string) => show(msg, 'info'),
    dismiss: (id: string) => { toasts.value = toasts.value.filter(t => t.id !== id) },
  }
}
