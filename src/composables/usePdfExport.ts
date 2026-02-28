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

    // Capture actual rendered dimensions before cloning
    const elScrollH = el.scrollHeight

    // Create an off-screen container at full 794px width (no transforms)
    const container = document.createElement('div')
    container.style.cssText =
      'position:absolute;top:0;left:0;width:794px;z-index:-9999;pointer-events:none;opacity:0;'
    document.body.appendChild(container)

    // Clone and strip all transforms / scaling
    const clone = el.cloneNode(true) as HTMLElement
    clone.style.cssText =
      `width:794px;height:${elScrollH}px;min-height:0;box-shadow:none;transform:none;` +
      `font-family:"Plus Jakarta Sans",sans-serif;` +
      `-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;`

    // Remove any CSS transforms on children (from the live scale())
    clone.querySelectorAll<HTMLElement>('[style]').forEach(child => {
      if (child.style.transform && child.style.transform !== 'none') {
        child.style.transform = 'none'
      }
      if (child.style.minHeight) child.style.minHeight = '0'
    })

    // Fix specific layout issues for the PDF snapshot
    // Force sidebar background to fill full height
    clone.querySelectorAll<HTMLElement>('div').forEach(div => {
      const s = div.getAttribute('style') || ''
      // The two-column flex wrapper needs explicit height
      if (s.includes('display:flex') && s.includes('flex:1')) {
        div.style.display = 'block'
        div.style.overflow = 'hidden'
        div.style.minHeight = (elScrollH - 120) + 'px'
      }
    })

    // Force sidebar to use float instead of flex for the clone
    const sidebarEl = clone.querySelector<HTMLElement>('div[style*="width:220px"]')
    if (sidebarEl) {
      sidebarEl.style.float = 'left'
      sidebarEl.style.minHeight = (elScrollH - 120) + 'px'
    }

    container.appendChild(clone)

    // Wait two animation frames so the layout fully recalculates
    await new Promise(r => requestAnimationFrame(r))
    await new Promise(r => requestAnimationFrame(r))

    try {
      const canvas = await html2canvas(clone, {
        scale: 4, // 4x scale ensures text is ultra sharp (retina-like) even with JPEG
        useCORS: true,
        allowTaint: true,
        windowWidth: 794,
        width: 794,
        height: elScrollH,
        imageTimeout: 0,
        backgroundColor: '#ffffff',
        logging: false,
      })

      // A4 in mm
      const pageW = 210
      const pageH = 297

      // Total mm-height for the canvas content
      const imgW = pageW
      const imgH = (canvas.height * pageW) / canvas.width

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      })

      if (imgH <= pageH + 3) {
        // Treat as single page (tolerance of 3mm for minHeight overshoot)
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG', 0, 0, imgW, Math.min(imgH, pageH)
        )
      } else {
        // Multi-page: slice canvas into A4-sized pixel chunks
        const pxPerPage = Math.floor((pageH * canvas.width) / pageW)
        const totalPages = Math.ceil(canvas.height / pxPerPage)

        for (let i = 0; i < totalPages; i++) {
          if (i > 0) pdf.addPage()

          const srcY = Math.floor(i * pxPerPage)
          const srcH = Math.min(pxPerPage, canvas.height - srcY)

          // Guard: skip empty or zero-height slices
          if (srcH <= 0) break

          const pageCanvas = document.createElement('canvas')
          pageCanvas.width = canvas.width
          pageCanvas.height = srcH

          const ctx = pageCanvas.getContext('2d')!
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height)
          ctx.drawImage(
            canvas,
            0, srcY, canvas.width, srcH,
            0, 0, canvas.width, srcH
          )

          const sliceH = (srcH * pageW) / canvas.width
          pdf.addImage(
            pageCanvas.toDataURL('image/jpeg', 1.0),
            'JPEG', 0, 0, imgW, sliceH
          )
        }
      }

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
