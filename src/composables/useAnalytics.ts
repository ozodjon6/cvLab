/**
 * Analytics composable — GA4 event tracking uchun markazlashtirilgan modul
 *
 * Barcha custom eventlar shu yerdan boshqariladi:
 *   - boshlash_click   (section: 'hero' | 'cta')
 *   - pdf_export       (status: 'success' | 'error', template?: string)
 *   - page_view        (avtomatik — router orqali)
 */

/* ── Global gtag type ── */
declare global {
    interface Window {
        gtag?: (...args: unknown[]) => void
        dataLayer?: unknown[]
    }
}

/* ── Helpers ── */
function gtag(...args: unknown[]) {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag(...args)
    }
}

/* ── Event tracker functions ── */

/**
 * "Boshlash" tugmasi bosilganda
 * @param section - qaysi section dan bosildi: 'hero' | 'cta'
 */
export function trackBoshlashClick(section: 'hero' | 'cta') {
    gtag('event', 'boshlash_click', {
        event_category: 'engagement',
        event_label: section,
        section,
    })
}

/**
 * PDF muvaffaqiyatli yaratilganda yoki xatolik bo'lganda
 * @param status  - 'success' | 'error'
 * @param template - qaysi template ishlatilgan (agar bor bo'lsa)
 */
export function trackPdfExport(status: 'success' | 'error', template?: string) {
    gtag('event', 'pdf_export', {
        event_category: 'conversion',
        event_label: status,
        status,
        template: template || 'unknown',
    })
}

/**
 * Sahifa ko'rilganda (router.afterEach ichida ishlatiladi)
 * GA4 enhanced measurement yoqilgan bo'lsa avtomatik track qiladi,
 * lekin SPA uchun manual ham qo'shamiz
 */
export function trackPageView(path: string, title: string) {
    gtag('event', 'page_view', {
        page_path: path,
        page_title: title,
    })
}

/**
 * Builder step o'zgarganda
 * @param step - 1-5 gacha
 */
export function trackBuilderStep(step: number) {
    const stepNames: Record<number, string> = {
        1: 'template_select',
        2: 'personal_info',
        3: 'experience',
        4: 'education',
        5: 'skills',
    }
    gtag('event', 'builder_step', {
        event_category: 'engagement',
        event_label: stepNames[step] || `step_${step}`,
        step,
        step_name: stepNames[step] || `step_${step}`,
    })
}
