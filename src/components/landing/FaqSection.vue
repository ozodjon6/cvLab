<template>
  <section class="py-[90px] px-16 bg-white">
    <div class="max-w-[800px] mx-auto">
      <p class="section-label text-center mb-2">Ko'p so'raladigan savollar</p>
      <h2 class="section-title text-center text-[clamp(28px,3.5vw,42px)] mb-12">
        CV va rezyume bo'yicha savollar
      </h2>

      <div class="space-y-4">
        <div v-for="(faq, i) in faqs" :key="i" class="border border-gray-200 rounded-xl overflow-hidden">
          <button 
            @click="toggle(i)"
            class="w-full flex items-center justify-between p-5 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
          >
            <h3 class="font-semibold text-[15px] sm:text-[16px] text-gray-900 pr-4">{{ faq.question }}</h3>
            <span class="text-gray-400 font-display text-xl leading-none">
              {{ activeIndex === i ? '−' : '+' }}
            </span>
          </button>
          <div v-show="activeIndex === i" class="p-5 text-gray-600 text-[14px] leading-relaxed bg-white border-t border-gray-100">
            {{ faq.answer }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeIndex = ref<number | null>(0)

const faqs = [
  {
    question: "CV bilan Rezyume (Resume) ning farqi nimada?",
    answer: "CV (Curriculum Vitae) — bu sizning butun o'quv va ish tajribangizni batafsil yoritib beruvchi hujjat. U ko'pincha akademik va ilmiy sohalarda ishlatiladi. Rezyume (Resume) esa qisqaroq (odatda 1-2 sahifa) bo'lib, aniq bir ish o'rni uchun mos tushadigan eng muhim yutuqlar, tajriba va ko'nikmalarni jamlaydi. cvLab da siz ikkalasini ham osongina yaratishingiz mumkin."
  },
  {
    question: "cvLab dan foydalanish bepulmi?",
    answer: "Ha, cvLab mutlaqo bepul. Saytda har qanday shablonni tanlab, o'z ma'lumotlaringizni to'ldirishingiz va hech qanday cheklovlarsiz yuqori sifatli PDF formatida yuklab olishingiz mumkin."
  },
  {
    question: "Qanday qilib to'g'ri va professional CV yozish mumkin?",
    answer: "Professional CV yozish uchun: 1) O'zingiz haqingizda to'g'ri va qisqa xulosa yozing. 2) Tajribangizni oxirgisidan boshlab xronologik tartibda kiriting. 3) Kutilayotgan ish o'rniga eng kerakli bo'lgan ko'nikmalarga urg'u bering (ATS-friendly). 4) cvLab platformasidagi tayyor tuzilma orqali barcha muhim bandlarni to'ldirib chiqing."
  },
  {
    question: "Mening ma'lumotlarim qanchalik xavfsiz?",
    answer: "Ma'lumotlaringiz serverda saqlanmaydi (agar hisob yaratmagan bo'lsangiz). Barcha kiritilgan ma'lumotlar to'g'ridan-to'g'ri brauzeringizda vaqtinchalik xotirada ishlab chiqiladi va siz sahifani yangilaganingizda tozalanadi."
  },
  {
    question: "Yuklab olingan PDF faylni ATS (Avtomatik ishlov berish tizimlari) o'qiy oladimi?",
    answer: "Albatta. Bizning shablonlar standart matn oqimi va toza shriftlardan foydalanadi, bu esa kompaniyalarning ATS tizimlari sizning rezyumengizdagi matnlarni xatosiz tanib olishini ta'minlaydi."
  }
]

function toggle(index: number) {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>
