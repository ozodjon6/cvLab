<template>
  <section class="min-h-screen flex items-center relative overflow-hidden
                  pt-[calc(56px+60px)] pb-20 px-16">

    <!-- Gradient bg -->
    <div class="absolute inset-0 pointer-events-none"
         style="background:radial-gradient(ellipse 60% 60% at 72% 40%,#dbeafe 0%,transparent 65%),
                            radial-gradient(ellipse 30% 40% at 15% 80%,#bfdbfe 0%,transparent 60%)" />

    <!-- Animated grid -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <svg ref="svgRef" class="w-full h-full absolute inset-0" />
    </div>

    <!-- Main content -->
    <div class="relative z-10 max-w-[560px]">
      <div class="inline-flex items-center gap-1.5 bg-blue-light text-blue-brand text-[11px]
                  font-bold tracking-[.08em] uppercase px-3.5 py-[5px] rounded-full mb-6
                  animate-fade-up">
        <span class="w-[5px] h-[5px] bg-blue-brand rounded-full" />
        O'zbekistonning resume platformasi
      </div>

      <h1 class="font-display font-extrabold leading-[1.04] tracking-[-2.5px] mb-5
                 text-[clamp(38px,5vw,62px)] animate-fade-up-d1">
        Professional<br>
        resume, <em class="not-italic text-blue-brand font-light">daqiqada.</em>
      </h1>

      <p class="text-base text-gray-500 leading-relaxed mb-9 animate-fade-up-d2">
        cvLab bilan professional rezyumengizni yarating. Zamonaviy shablonlar
        va real-time preview bilan ish topish osonlashadi.
      </p>

      <div class="flex gap-3 flex-wrap animate-fade-up-d3">
        <router-link to="/builder" class="btn-primary text-[14px] !px-7 !py-3.5">
          Boshlash
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </router-link>
        <a href="https://buymeacoffee.com" target="_blank" rel="noopener" class="btn-bmc !text-[14px] !px-5 !py-3.5 !border-2 !rounded-[9px]">
          ☕ Kofe olib ber
        </a>
      </div>
    </div>

    <!-- CV Mockup -->
    <div class="absolute right-10 top-1/2 -translate-y-1/2 w-[460px] animate-float-in z-10 hidden xl:block">
      <div class="bg-white rounded-2xl overflow-hidden
                  shadow-[0_28px_70px_rgba(10,37,64,.18),0_0_0_1px_rgba(10,37,64,.06)]
                  [transform:perspective(900px)_rotateY(-8deg)_rotateX(2deg)]
                  hover:[transform:perspective(900px)_rotateY(-3deg)_rotateX(1deg)]
                  transition-transform duration-500">
        <!-- Header -->
        <div class="bg-navy-800 px-6 py-5 text-white">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-10 h-10 rounded-full bg-white/10 border-2 border-white/20 flex items-center
                        justify-center font-display font-bold text-[13px] text-white/70 flex-shrink-0">OJ</div>
            <div>
              <div class="font-display font-bold text-[17px]">Ozodbek Jumaev</div>
              <div class="text-[10px] text-white/50 uppercase tracking-[.06em]">Frontend Engineer</div>
            </div>
          </div>
          <div class="flex gap-3 text-[9.5px] text-white/45">
            <span>📧 ozodjon6@gmail.com</span>
            <span>📍 Toshkent</span>
          </div>
        </div>
        <!-- Body -->
        <div class="px-6 py-4">
          <div class="text-[9px] font-bold tracking-[.1em] uppercase text-blue-brand mb-2 mt-1">Ko'nikmalar</div>
          <MiniBar label="Angular / Vue.js" :pct="92" />
          <MiniBar label="TypeScript" :pct="85" />
          <MiniBar label="Node.js" :pct="78" />
          <div class="text-[9px] font-bold tracking-[.1em] uppercase text-blue-brand mb-2 mt-4">Tajriba</div>
          <div class="text-[11px] font-semibold">Senior Frontend Developer</div>
          <div class="text-[10px] text-gray-400 mb-2">E Projects Group · 2024 — hozir</div>
          <div class="h-[3px] bg-gray-100 rounded-full w-[88%] mb-1" />
          <div class="h-[3px] bg-gray-100 rounded-full w-[70%]" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MiniBar from './MiniBar.vue'

const svgRef = ref<SVGElement | null>(null)

function buildGrid() {
  const svg = svgRef.value
  if (!svg) return
  const W = window.innerWidth, H = window.innerHeight
  svg.setAttribute('viewBox', `0 0 ${W} ${H}`)
  const gap = 40
  let s = ''
  for (let x = 0; x <= W; x += gap) s += `<line class="grid-v" x1="${x}" y1="0" x2="${x}" y2="${H}"/>`
  for (let y = 0; y <= H; y += gap) s += `<line class="grid-h" x1="0" y1="${y}" x2="${W}" y2="${y}"/>`
  ;[[160,0],[280,2],[400,4]].forEach(([y,d]) =>
    s += `<line class="glow-line glow-h" x1="0" y1="${y}" x2="${W}" y2="${y}" style="animation-delay:${d}s"/>`)
  ;[[200,0],[500,2.5],[800,5]].forEach(([x,d]) =>
    s += `<line class="glow-line glow-v" x1="${x}" y1="0" x2="${x}" y2="${H}" style="animation-delay:${d}s"/>`)
  ;[[200,160,0],[500,280,.6],[800,160,1.2],[200,400,1.8],[500,400,2.4]].forEach(([x,y,d]) =>
    s += `<circle class="glow-dot" cx="${x}" cy="${y}" r="3" style="animation-delay:${d}s"/>`)
  svg.innerHTML = s
}

onMounted(buildGrid)
</script>
