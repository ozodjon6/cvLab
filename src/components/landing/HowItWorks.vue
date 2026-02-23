<template>
  <section class="py-[72px] px-16">
    <div class="max-w-[1060px] mx-auto">
      <p class="section-label">Jarayon</p>
      <h2 class="section-title text-[clamp(24px,3vw,38px)] mb-12">3 qadamda tayyor</h2>

      <div class="grid grid-cols-3 gap-8 relative">
        <!-- connector line -->
        <div class="absolute top-[26px] left-[17%] right-[17%] h-px
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
