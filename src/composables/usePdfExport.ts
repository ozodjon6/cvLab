import { ref } from 'vue'
import { useToast } from './useToast'

function sanitizePdfTitle(filename: string): string {
  return (filename || 'cv')
    .replace(/\.pdf$/i, '')
    .replace(/[\\/:*?"<>|]+/g, '_')
    .trim() || 'cv'
}

function getDocumentStylesHtml(): string {
  return Array.from(document.querySelectorAll('style,link[rel="stylesheet"]'))
    .map(node => (node as HTMLElement).outerHTML)
    .join('\n')
}

async function openPrintWindow(el: HTMLElement, filename: string): Promise<boolean> {
  const printWin = window.open('', '_blank')
  if (!printWin) return false

  const clone = el.cloneNode(true) as HTMLElement
  clone.style.transform = 'none'
  clone.style.transformOrigin = 'top left'
  clone.style.boxShadow = 'none'
  clone.style.width = '794px'
  clone.style.minHeight = '1123px'
  clone.style.height = 'auto'
  clone.style.margin = '0 auto'

  clone.querySelectorAll<HTMLElement>('[style]').forEach(child => {
    if (child.style.transform && child.style.transform !== 'none') {
      child.style.transform = 'none'
    }
  })

  const title = sanitizePdfTitle(filename)
  const styles = getDocumentStylesHtml()
  const printCss = `
    @page { size: A4; margin: 0; }
    html, body { margin: 0; padding: 0; background: #fff; }
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    #print-root {
      width: 794px;
      margin: 0 auto;
      background: #fff;
    }
    #print-root .cv-paper {
      transform: none !important;
      box-shadow: none !important;
    }
    #print-root .cv-sec,
    #print-root .cv-skill-badge,
    #print-root .cv-contact-item {
      break-inside: avoid;
      page-break-inside: avoid;
    }
    #print-root a {
      text-decoration: none;
      color: inherit;
    }
  `

  const html = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>${title}</title>
    ${styles}
    <style>${printCss}</style>
  </head>
  <body>
    <div id="print-root">${clone.outerHTML}</div>
    <script>
      (function () {
        var trigger = function () {
          setTimeout(function () {
            window.focus();
            window.print();
          }, 250);
        };

        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(trigger).catch(trigger);
        } else {
          window.addEventListener('load', trigger, { once: true });
        }

        window.onafterprint = function () { window.close(); };
      })();
    <\/script>
  </body>
</html>`

  printWin.document.open()
  printWin.document.write(html)
  printWin.document.close()

  return true
}

export function usePdfExport() {
  const exporting = ref(false)
  const toast = useToast()

  async function exportPdf(elementId: string, filename = 'cv.pdf') {
    const el = document.getElementById(elementId)
    if (!el) {
      toast.error('Element topilmadi')
      return
    }

    exporting.value = true
    toast.info('PDF tayyorlanmoqda...')

    try {
      const opened = await openPrintWindow(el, filename)
      if (!opened) {
        toast.error('Popup bloklandi. Iltimos popupga ruxsat bering va qayta urinib ko\'ring.')
        return
      }

      toast.success('Print oynasi ochildi. "Save as PDF" ni tanlang.')
    } catch (e) {
      console.error(e)
      toast.error('PDF oynasini ochishda xatolik yuz berdi')
    } finally {
      exporting.value = false
    }
  }

  return { exporting, exportPdf }
}
