import { ref } from 'vue'
import { useToast } from './useToast'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

export function usePdfExport() {
  const exporting = ref(false)
  const toast = useToast()

  async function exportPdf(elementId: string, filename = 'cv.pdf') {
    const el = document.getElementById(elementId)
    if (!el) { toast.error('Element topilmadi'); return }

    exporting.value = true
    toast.info('PDF tayyorlanmoqda...')

    // Create a hidden but layout-participating container
    const container = document.createElement('div')
    container.style.cssText =
      'position:absolute;top:0;left:0;width:794px;z-index:-9999;pointer-events:none;opacity:0;'
    document.body.appendChild(container)

    // Clone with crisp text rendering settings
    const clone = el.cloneNode(true) as HTMLElement
    clone.style.cssText =
      'transform:none!important;width:794px;min-height:0!important;box-shadow:none;' +
      'font-family:"Plus Jakarta Sans",sans-serif;' +
      '-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;' +
      'text-rendering:optimizeLegibility;'

    // Reset min-heights that force blank space
    clone.querySelectorAll<HTMLElement>('[style]').forEach(child => {
      if (child.style.minHeight) child.style.minHeight = '0'
    })
    container.appendChild(clone)

    // Wait one frame for layout to settle
    await new Promise(r => requestAnimationFrame(r))

    try {
      // Render to canvas at high DPI with direct html2canvas (not the bundle)
      const canvas = await html2canvas(clone, {
        scale: 4,                // 4× resolution for sharp text
        useCORS: true,
        windowWidth: 794,
        imageTimeout: 0,
        backgroundColor: '#ffffff',
        logging: false,
      })

      // A4 dimensions in mm
      const pageW = 210
      const pageH = 297

      // Calculate content height in mm relative to page width
      const imgW = pageW
      const imgH = (canvas.height * pageW) / canvas.width

      // Create PDF
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: false,   // No compression — keeps text sharpness
      })

      // If content fits one page, add as single image
      if (imgH <= pageH) {
        pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG', 0, 0, imgW, imgH,
          undefined, 'NONE'  // NONE = no compression
        )
      } else {
        // Multi-page: slice the canvas into A4-sized chunks
        const totalPages = Math.ceil(imgH / pageH)
        for (let i = 0; i < totalPages; i++) {
          if (i > 0) pdf.addPage()

          // Slice this page's portion from the canvas
          const srcY = (i * pageH * canvas.width) / pageW
          const srcH = Math.min(
            (pageH * canvas.width) / pageW,
            canvas.height - srcY
          )

          const pageCanvas = document.createElement('canvas')
          pageCanvas.width = canvas.width
          pageCanvas.height = srcH
          const ctx = pageCanvas.getContext('2d')!
          ctx.drawImage(
            canvas,
            0, srcY, canvas.width, srcH,
            0, 0, canvas.width, srcH
          )

          const sliceH = (srcH * pageW) / canvas.width
          pdf.addImage(
            pageCanvas.toDataURL('image/png'),
            'PNG', 0, 0, imgW, sliceH,
            undefined, 'NONE'
          )
        }
      }

      // Auto-download the PDF
      pdf.save(filename)
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
