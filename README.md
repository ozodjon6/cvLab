# cvLab — Professional CV Builder

O'zbekistondagi eng qulay professional CV va resume yaratish platformasi.

## 🚀 Boshlash

```bash
# 1. Papkaga kiring
cd cvlab

# 2. Paketlarni o'rnating
npm install

# 3. Dev serverni ishga tushiring
npm run dev
```

Brauzerda: **http://localhost:5173**

## 📦 Build

```bash
npm run build
npm run preview
```

## 🗂️ Loyiha strukturasi

```
cvlab/
├── public/
│   └── favicon.svg
├── src/
│   ├── assets/
│   │   └── main.css              # Tailwind + custom components
│   ├── components/
│   │   ├── builder/              # Qadamlar: TemplateSelector, PersonalForm...
│   │   ├── landing/              # Landing sahifa qismlari
│   │   ├── layout/               # AppNav, AppFooter, Logo
│   │   ├── preview/              # CvPreview, CvExp, CvEdu, CvSkills...
│   │   └── ui/                   # ToastContainer
│   ├── composables/
│   │   ├── usePdfExport.ts       # PDF export (html2pdf.js)
│   │   ├── usePhotoUpload.ts     # Rasm yuklash
│   │   ├── useResizable.ts       # Panel kengligini o'zgartirish
│   │   └── useToast.ts           # Toast xabarlari
│   ├── router/
│   │   └── index.ts              # Vue Router + SEO meta
│   ├── stores/
│   │   └── cv.ts                 # Pinia store (barcha CV ma'lumotlari)
│   ├── types/
│   │   └── cv.ts                 # TypeScript turlari + validatsiya
│   ├── views/
│   │   ├── HomeView.vue          # Landing sahifa
│   │   └── BuilderView.vue       # CV builder sahifasi
│   ├── App.vue
│   └── main.ts
├── index.html                    # SEO meta tags, structured data
├── vite.config.ts                # @alias sozlamalari
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

## ⚙️ Texnologiyalar

| Texnologiya | Maqsad |
|-------------|--------|
| **Vue 3** + Composition API | Frontend framework |
| **TypeScript** | Type safety |
| **Vite** | Build tool |
| **Tailwind CSS** | Styling |
| **Pinia** | State management |
| **Vue Router** | Routing + SEO meta |
| **html2pdf.js** (CDN) | PDF eksport |

## 🔗 @Alias lar

```ts
'@'           → src/
'@components' → src/components/
'@composables'→ src/composables/
'@stores'     → src/stores/
'@types'      → src/types/
'@views'      → src/views/
'@assets'     → src/assets/
```

## 🔍 SEO

- `<title>`, `<meta description>`, `<meta keywords>`
- Open Graph (Facebook, Telegram)
- Twitter Card
- Schema.org WebApplication structured data
- `rel="canonical"`
- Vue Router route-based meta update

---

**cvLab** · cvlab.uz
