import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: "cvLab — CV va Resume Builder | O'zbekiston",
      description: "Professional CV va rezyumeni daqiqada yarating. Zamonaviy shablonlar, real-time preview, PDF eksport. Mutlaqo bepul.",
    },
  },
  {
    path: '/builder',
    name: 'builder',
    component: () => import('@/views/BuilderView.vue'),
    meta: {
      title: "CV Yaratish — cvLab",
      description: "CV yarating — shablonni tanlang, ma'lumotlaringizni kiriting va PDF yuklab oling.",
    },
  },
  { path: '/:pathMatch(.*)*', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, _from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth' }
    return { top: 0 }
  },
})

router.afterEach(to => {
  if (to.meta.title)       document.title = to.meta.title as string
  const d = document.querySelector('meta[name="description"]')
  if (d && to.meta.description) d.setAttribute('content', to.meta.description as string)
})

export default router
