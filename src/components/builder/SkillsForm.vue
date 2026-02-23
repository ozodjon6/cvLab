<template>
  <div>
    <h2 class="font-display font-bold text-lg tracking-tight mb-1">Ko'nikmalar & Tillar</h2>
    <p class="text-xs text-gray-400 mb-4">Texnik va qo'shimcha ko'nikmalar</p>

    <!-- Skills -->
    <div class="mb-5">
      <label class="field-label">Ko'nikma qo'shing</label>
      <div class="flex gap-2 mb-2.5">
        <input ref="skillRef" v-model="skillText" class="input-base flex-1"
          type="text" placeholder="React, Python, Figma..."
          @keydown.enter="add" />
        <button class="bg-blue-brand text-white rounded-lg px-3.5 text-xl cursor-pointer
                       transition-colors hover:bg-navy-800 flex-shrink-0 flex items-center
                       border-0 h-auto"
          @click="add">+</button>
      </div>
      <div class="flex flex-wrap gap-1.5">
        <div v-for="(sk, i) in store.data.skills" :key="sk + i"
             class="flex items-center gap-1 bg-blue-brand text-white px-3 py-1 rounded-md
                    text-[12px] font-semibold hover:bg-navy-800 transition-colors">
          <span>{{ sk }}</span>
          <button class="text-white/70 hover:text-white text-[14px] leading-none border-0 bg-transparent cursor-pointer"
            @click="store.rmSkill(i)">×</button>
        </div>
      </div>
    </div>

    <!-- Languages -->
    <div>
      <label class="field-label mb-2">Tillar</label>
      <TransitionGroup name="block">
        <div v-for="(lang, idx) in store.data.languages" :key="lang.id" class="data-block">
          <div class="flex justify-between items-center mb-2.5 text-[12px] font-bold">
            <span>Til #{{ idx + 1 }}</span>
            <button class="text-red-400 hover:text-red-500 text-[11.5px] font-semibold transition-colors"
              @click="store.rmLang(lang.id)">✕</button>
          </div>
          <div class="grid grid-cols-2 gap-2.5">
            <div>
              <label class="field-label">Til</label>
              <input class="input-base" type="text" placeholder="O'zbek, Ingliz..."
                :value="lang.name" @input="set(lang.id,'name',$event)" />
            </div>
            <div>
              <label class="field-label">Daraja</label>
              <select class="input-base"
                :value="lang.level" @change="set(lang.id,'level',$event)">
                <option v-for="lv in LANGUAGE_LEVELS" :key="lv" :value="lv">{{ lv }}</option>
              </select>
            </div>
          </div>
        </div>
      </TransitionGroup>
      <button class="add-btn mt-0.5" @click="store.addLang()">
        <PlusIcon /> Til qo'shish
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCVStore } from '@/stores/cv'
import { LANGUAGE_LEVELS } from '@/types/cv'
import type { LanguageItem } from '@/types/cv'
import PlusIcon from './PlusIcon.vue'

const store = useCVStore()
const skillText = ref('')
const skillRef  = ref<HTMLInputElement | null>(null)

function add() {
  const v = skillText.value.trim()
  if (!v) return
  store.addSkill(v)
  skillText.value = ''
  skillRef.value?.focus()
}

function set(id: string, field: keyof LanguageItem, e: Event) {
  store.setLang(id, field, (e.target as HTMLInputElement | HTMLSelectElement).value)
}
</script>
