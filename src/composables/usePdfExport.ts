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

    // Create a hidden but layout-participating container
    // (left:-9999px can cause html2canvas to produce blank output)
    const container = document.createElement('div')
    container.style.cssText =
      'position:absolute;top:0;left:0;width:794px;z-index:-9999;pointer-events:none;opacity:0;'
    document.body.appendChild(container)

    // Clone the CV element with no scale transforms
    // IMPORTANT: min-height must be 0 so content-only CVs don't produce blank 2nd page
    const clone = el.cloneNode(true) as HTMLElement
    clone.style.cssText =
      'transform:none!important;width:794px;min-height:0!important;box-shadow:none;' +
      'font-family:"Plus Jakarta Sans",sans-serif;'
    // Also reset min-height on any inner containers that might force A4 height
    clone.querySelectorAll<HTMLElement>('[style]').forEach(child => {
      if (child.style.minHeight) child.style.minHeight = '0'
    })
    container.appendChild(clone)

    try {
      // Correct call: h2p(element).set(opts).save()
      await h2p(clone)
        .set({
          margin: 0,
          filename,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: {
            scale: 2,
            useCORS: true,
            letterRendering: true,
            scrollX: 0,
            scrollY: 0,
          },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
          pagebreak: { mode: ['css', 'legacy'] },
        })
        .save()
      toast.success('PDF muvaffaqiyatli yuklandi ✓')
    } catch (e) {
      console.error(e)
      toast.error('PDF yaratishda xatolik yuz berdi')
    } finally {
      document.body.removeChild(container)
      exporting.value = false
    }
  }

  return { exporting, exportPdf }
}
