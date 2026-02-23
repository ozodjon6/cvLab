<template>
  <section class="py-[90px] px-16 bg-gray-50">
    <div class="max-w-[1060px] mx-auto">
      <p class="section-label">Imkoniyatlar</p>
      <h2 class="section-title text-[clamp(28px,3.5vw,42px)] mb-12 max-w-[480px]">
        Hamma narsa bir joyda
      </h2>

      <div class="grid grid-cols-3 gap-5">
        <div v-for="f in features" :key="f.title" class="feature-card">
          <div class="w-10 h-10 bg-blue-light rounded-[10px] flex items-center justify-center mb-3.5 text-lg">
            {{ f.icon }}
          </div>
          <h3 class="font-semibold text-[15px] mb-2">{{ f.title }}</h3>
          <p class="text-[13px] text-gray-400 leading-relaxed">{{ f.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const features = [
  { icon: '✦', title: '4 ta professional shablon', desc: 'HR mutaxassislar tomonidan tasdiqlangan zamonaviy shablonlar.' },
  { icon: '⬡', title: 'Real-time preview',         desc: "Har bir o'zgartirish bir zumda ko'rsatiladi." },
  { icon: '↗', title: "Ko'p tilli",                desc: "O'zbek, rus va ingliz tillarida professional rezyume yarating." },
  { icon: '⊡', title: 'PDF eksport',               desc: 'Professional PDF formatida yuklab oling.' },
  { icon: '◈', title: 'Mutlaqo bepul',             desc: "Hech qanday to'lov yo'q. Yarating va yuklab oling." },
  { icon: '⊕', title: 'ATS friendly',              desc: "Avtomatik HR tizimlardan o'tish uchun optimallashtirilgan." },
]
</script>
