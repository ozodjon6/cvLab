import { ref } from 'vue'
import { useToast } from './useToast'

export function usePdfExport() {
  const exporting = ref(false)
  const toast = useToast()

  async function exportPdf(elementId: string, filename = 'cv.pdf') {
    // Check library
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const h2p = (window as any)['html2pdf']
    if (typeof h2p !== 'function') {
      toast.error('PDF kutubxonasi yuklanmadi. Internet aloqasini tekshiring.')
      return
    }

    const el = document.getElementById(elementId)
    if (!el) { toast.error('Element topilmadi'); return }

    exporting.value = true
    toast.info('PDF tayyorlanmoqda...')

    // Clone without scale transform
    const clone = el.cloneNode(true) as HTMLElement
    clone.style.cssText =
      'transform:none!important;width:794px;min-height:auto;box-shadow:none;' +
      'position:fixed;left:-9999px;top:0;font-family:"Plus Jakarta Sans",sans-serif;'
    document.body.appendChild(clone)

    try {
      await h2p()
        .set({
          margin: 0,
          filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true, letterRendering: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
        })
        .from(clone)
        .save()
      toast.success('PDF muvaffaqiyatli yuklandi ✓')
    } catch (e) {
      console.error(e)
      toast.error('PDF yaratishda xatolik yuz berdi')
    } finally {
      clone.parentNode?.removeChild(clone)
      exporting.value = false
    }
  }

  return { exporting, exportPdf }
}
