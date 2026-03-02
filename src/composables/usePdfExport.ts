import { ref } from 'vue'
import { useToast } from './useToast'
import html2canvas from 'html2canvas'
import { jsPDF } from 'jspdf'

/**
 * Convert every <svg> inside `root` to a rasterised <img> (PNG data-URI).
 * html2canvas has a known bug that mis-positions inline SVGs.
 * Replacing them with <img> elements that contain PNG data fixes it completely.
 */
async function replaceSvgsWithPng(root: HTMLElement) {
  const svgs = root.querySelectorAll<SVGSVGElement>('svg')
  for (const svg of Array.from(svgs)) {
    const parent = svg.parentElement
    if (!parent) continue

    // — resolve currentColor to the actual computed color —
    const parentColor = getComputedStyle(parent).color || '#3B4F68'
    const svgClone = svg.cloneNode(true) as SVGSVGElement
    svgClone.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    if (svgClone.getAttribute('stroke') === 'currentColor') {
      svgClone.setAttribute('stroke', parentColor)
    }
    // Also fix children that might use currentColor
    svgClone.querySelectorAll('[stroke="currentColor"]').forEach(el => {
      el.setAttribute('stroke', parentColor)
    })

    const w = parseInt(svg.getAttribute('width') || '12', 10)
    const h = parseInt(svg.getAttribute('height') || '12', 10)
    svgClone.setAttribute('width', String(w))
    svgClone.setAttribute('height', String(h))

    // Serialize → data URI
    const serialized = new XMLSerializer().serializeToString(svgClone)
    const encodedSvg =
      'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(serialized)

    try {
      // Load as image
      const tempImg = new Image()
      await new Promise<void>((resolve, reject) => {
        tempImg.onload = () => resolve()
        tempImg.onerror = () => reject(new Error('svg load fail'))
        tempImg.src = encodedSvg
      })

      // Draw to high-res canvas → PNG
      const canvas = document.createElement('canvas')
      canvas.width = w * 4
      canvas.height = h * 4
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(tempImg, 0, 0, canvas.width, canvas.height)
      const pngUri = canvas.toDataURL('image/png')

      // Build replacement <img>
      const replacement = document.createElement('img')
      replacement.src = pngUri
      replacement.width = w
      replacement.height = h
      // Copy the original inline style from the SVG
      const existingStyle = svg.getAttribute('style') || ''
      replacement.setAttribute('style', existingStyle)

      svg.parentNode!.replaceChild(replacement, svg)
    } catch {
      // If conversion fails for any SVG, leave it as-is
    }
  }
}

export function usePdfExport() {
  const exporting = ref(false)
  const toast = useToast()

  async function exportPdf(elementId: string, filename = 'cv.pdf') {
    const el = document.getElementById(elementId)
    if (!el) { toast.error('Element topilmadi'); return }

    exporting.value = true
    toast.info('PDF tayyorlanmoqda...')

    const elScrollH = el.scrollHeight

    // Off-screen container at full 794 px width (no transforms)
    const container = document.createElement('div')
    container.style.cssText =
      'position:absolute;top:0;left:0;width:794px;z-index:-9999;pointer-events:none;opacity:0;'
    document.body.appendChild(container)

    // Clone & strip transforms
    const clone = el.cloneNode(true) as HTMLElement
    clone.style.cssText =
      `width:794px;height:${elScrollH}px;min-height:0;box-shadow:none;transform:none;` +
      `font-family:"Plus Jakarta Sans",sans-serif;` +
      `-webkit-font-smoothing:antialiased;text-rendering:optimizeLegibility;`

    clone.querySelectorAll<HTMLElement>('[style]').forEach(child => {
      if (child.style.transform && child.style.transform !== 'none') {
        child.style.transform = 'none'
      }
      if (child.style.minHeight) child.style.minHeight = '0'
    })

    // Fix sidebar (modern template)
    clone.querySelectorAll<HTMLElement>('div').forEach(div => {
      const s = div.getAttribute('style') || ''
      if (s.includes('display:flex') && s.includes('flex:1')) {
        div.style.display = 'block'
        div.style.overflow = 'hidden'
        div.style.minHeight = (elScrollH - 120) + 'px'
      }
    })
    const sidebarEl = clone.querySelector<HTMLElement>('div[style*="width:220px"]')
    if (sidebarEl) {
      sidebarEl.style.float = 'left'
      sidebarEl.style.minHeight = (elScrollH - 120) + 'px'
    }

    container.appendChild(clone)

    // Wait for layout
    await new Promise(r => requestAnimationFrame(r))
    await new Promise(r => requestAnimationFrame(r))

    // ★ KEY FIX: Convert all SVGs to PNG images before html2canvas ★
    await replaceSvgsWithPng(clone)

    // Wait again after replacement
    await new Promise(r => requestAnimationFrame(r))

    // Collect <a> link positions for clickable PDF annotations
    const linkData: { x: number; y: number; w: number; h: number; url: string }[] = []
    const cloneRect = clone.getBoundingClientRect()
    clone.querySelectorAll<HTMLAnchorElement>('a[href]').forEach(a => {
      const href = a.getAttribute('href')
      if (!href || href === '#') return
      const r = a.getBoundingClientRect()
      linkData.push({
        x: r.left - cloneRect.left,
        y: r.top - cloneRect.top,
        w: r.width,
        h: r.height,
        url: href,
      })
    })

    try {
      const canvas = await html2canvas(clone, {
        scale: 4,
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
      const pxToMm = pageW / 794

      const imgW = pageW
      const imgH = (canvas.height * pageW) / canvas.width

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      })

      if (imgH <= pageH + 3) {
        pdf.addImage(
          canvas.toDataURL('image/jpeg', 1.0),
          'JPEG', 0, 0, imgW, Math.min(imgH, pageH)
        )
        // Add clickable links
        for (const link of linkData) {
          pdf.link(link.x * pxToMm, link.y * pxToMm, link.w * pxToMm, link.h * pxToMm, { url: link.url })
        }
      } else {
        const pxPerPage = Math.floor((pageH * canvas.width) / pageW)
        const totalPages = Math.ceil(canvas.height / pxPerPage)
        const srcPxPerPage = pageH / pxToMm

        for (let i = 0; i < totalPages; i++) {
          if (i > 0) pdf.addPage()

          const srcY = Math.floor(i * pxPerPage)
          const srcH = Math.min(pxPerPage, canvas.height - srcY)
          if (srcH <= 0) break

          const pageCanvas = document.createElement('canvas')
          pageCanvas.width = canvas.width
          pageCanvas.height = srcH

          const ctx = pageCanvas.getContext('2d')!
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, pageCanvas.width, pageCanvas.height)
          ctx.drawImage(canvas, 0, srcY, canvas.width, srcH, 0, 0, canvas.width, srcH)

          const sliceH = (srcH * pageW) / canvas.width
          pdf.addImage(
            pageCanvas.toDataURL('image/jpeg', 1.0),
            'JPEG', 0, 0, imgW, sliceH
          )

          // Links on this page
          const pageTopPx = i * srcPxPerPage
          const pageBottomPx = pageTopPx + srcPxPerPage
          for (const link of linkData) {
            if (link.y + link.h > pageTopPx && link.y < pageBottomPx) {
              pdf.link(
                link.x * pxToMm,
                (link.y - pageTopPx) * pxToMm,
                link.w * pxToMm,
                link.h * pxToMm,
                { url: link.url }
              )
            }
          }
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
