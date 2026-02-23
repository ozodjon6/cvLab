<template>
  <div>
    <h2 class="font-display font-bold text-lg tracking-tight mb-1">Ish tajribasi</h2>
    <p class="text-xs text-gray-400 mb-4">Eng so'nggi ishlaringizdan boshlang</p>

    <TransitionGroup name="block">
      <div v-for="(exp, idx) in store.data.experience" :key="exp.id" class="data-block">
        <div class="flex justify-between items-center mb-2.5 text-[12px] font-bold">
          <span>Ish joyi #{{ idx + 1 }}</span>
          <button class="text-red-400 hover:text-red-500 text-[11.5px] font-semibold transition-colors"
            @click="store.rmExp(exp.id)">✕ O'chirish</button>
        </div>

        <div class="grid grid-cols-2 gap-2.5 mb-2.5">
          <div>
            <label class="field-label field-label-req">Lavozim</label>
            <input class="input-base" type="text" placeholder="Frontend Developer"
              :value="exp.jobTitle" @input="set(exp.id,'jobTitle',$event)" />
          </div>
          <div>
            <label class="field-label field-label-req">Kompaniya</label>
            <input class="input-base" type="text" placeholder="IT Park"
              :value="exp.company" @input="set(exp.id,'company',$event)" />
          </div>
        </div>

        <div class="mb-2.5">
          <label class="field-label">Joylashuv</label>
          <input class="input-base" type="text" placeholder="Toshkent"
            :value="exp.location" @input="set(exp.id,'location',$event)" />
        </div>

        <div class="grid grid-cols-2 gap-2.5 mb-2">
          <div>
            <label class="field-label">Boshlanish</label>
            <input class="input-base" type="date"
              :value="exp.startDate" @input="set(exp.id,'startDate',$event)" />
          </div>
          <div>
            <label class="field-label">Tugash</label>
            <input class="input-base" type="date" :disabled="exp.isCurrent"
              :value="exp.endDate" @input="set(exp.id,'endDate',$event)" />
          </div>
        </div>

        <label class="flex items-center gap-2 mb-2.5 cursor-pointer text-[12.5px] font-medium">
          <input type="checkbox" class="w-3.5 h-3.5 accent-blue-brand cursor-pointer"
            :checked="exp.isCurrent"
            @change="onCurrent(exp.id,$event)" />
          Hozir shu yerda ishlayman
        </label>

        <div>
          <label class="field-label">Vazifalar / Yutuqlar</label>
          <textarea class="input-base resize-none overflow-hidden" rows="3"
            placeholder="Asosiy vazifalar va yutuqlar..."
            :value="exp.description" @input="setTa(exp.id,'description',$event)" />
        </div>
      </div>
    </TransitionGroup>

    <button class="add-btn mt-0.5" @click="store.addExp()">
      <PlusIcon /> Tajriba qo'shish
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCVStore } from '@/stores/cv'
import type { ExperienceItem } from '@/types/cv'
import PlusIcon from './PlusIcon.vue'

const store = useCVStore()

function set(id: string, field: keyof ExperienceItem, e: Event) {
  store.setExp(id, field, (e.target as HTMLInputElement).value)
}
function setTa(id: string, field: keyof ExperienceItem, e: Event) {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 200) + 'px'
  store.setExp(id, field, el.value)
}
function onCurrent(id: string, e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  store.setExp(id, 'isCurrent', checked)
  if (checked) store.setExp(id, 'endDate', '')
}
</script>
