<template>
  <section class="py-16 md:py-[72px] px-6 sm:px-16">
    <div class="max-w-[1060px] mx-auto">
      <p class="section-label text-center">Jarayon</p>
      <h2 class="section-title text-center text-[28px] md:text-[clamp(24px,3vw,38px)] mb-10 md:mb-12 font-extrabold tracking-[-1px] leading-[1.1]">3 qadamda tayyor CV va rezyume</h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        <!-- connector line (desktop only) -->
        <div class="hidden md:block absolute top-[26px] left-[17%] right-[17%] h-px
                    bg-gradient-to-r from-transparent via-blue-brand to-transparent" />

        <div v-for="s in steps" :key="s.n" class="text-center relative z-10">
          <div class="w-[52px] h-[52px] bg-white border-2 border-blue-brand rounded-full
                      flex items-center justify-center font-display font-bold text-[18px]
                      text-blue-brand mx-auto mb-4">{{ s.n }}</div>
          <h3 class="font-semibold text-[14px] mb-2">{{ s.title }}</h3>
          <p class="text-[13px] text-gray-400 leading-relaxed">{{ s.desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const steps = [
  { n: 1, title: 'Shablon tanlang',   desc: '4 ta zamonaviy shablon orasidan mosini tanlang.' },
  { n: 2, title: "Ma'lumot kiriting", desc: 'Oddiy formani to\'ldiring — real vaqtda preview.' },
  { n: 3, title: 'Yuklab oling',      desc: 'PDF formatida yuklab oling yoki havola ulashing.' },
]
</script>
