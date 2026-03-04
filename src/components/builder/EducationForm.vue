<template>
  <div>
    <h2 class="font-display font-bold text-lg tracking-tight mb-1">Ta'lim</h2>
    <p class="text-xs text-gray-400 mb-4">O'quv yurtlari va sertifikatlar</p>

    <TransitionGroup name="block">
      <div v-for="(edu, idx) in store.data.education" :key="edu.id" class="data-block">
        <div class="flex justify-between items-center mb-2.5 text-[12px] font-bold">
          <span>Ta'lim #{{ idx + 1 }}</span>
          <button class="text-red-400 hover:text-red-500 text-[11.5px] font-semibold transition-colors"
            @click="store.rmEdu(edu.id)">✕ O'chirish</button>
        </div>

        <div class="mb-2.5">
          <label class="field-label field-label-req">O'quv yurti</label>
          <input class="input-base" type="text" placeholder="TDTU / Westminster University"
            :value="edu.institution" @input="set(edu.id,'institution',$event)" />
        </div>

        <div class="grid grid-cols-2 gap-2.5 mb-2.5">
          <div>
            <label class="field-label">Mutaxassislik</label>
            <input class="input-base" type="text" placeholder="Informatika"
              :value="edu.degree" @input="set(edu.id,'degree',$event)" />
          </div>
          <div>
            <label class="field-label">Joylashuv</label>
            <input class="input-base" type="text" placeholder="Toshkent"
              :value="edu.location" @input="set(edu.id,'location',$event)" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2.5 mb-2">
          <div>
            <label class="field-label">Boshlanish</label>
            <input class="input-base" type="month"
              :value="edu.startDate" @input="set(edu.id,'startDate',$event)" />
          </div>
          <div>
            <label class="field-label">Tugash</label>
            <input class="input-base" type="month" :disabled="edu.isCurrent"
              :value="edu.endDate" @input="set(edu.id,'endDate',$event)" />
          </div>
        </div>

        <label class="flex items-center gap-2 mb-2.5 cursor-pointer text-[12.5px] font-medium">
          <input type="checkbox" class="w-3.5 h-3.5 accent-blue-brand cursor-pointer"
            :checked="edu.isCurrent"
            @change="onCurrent(edu.id,$event)" />
          Hozir shu yerda o'qiyman
        </label>

        <div>
          <label class="field-label">Qo'shimcha ma'lumotlar</label>
          <RichEditor :model-value="edu.notes" @update:model-value="store.setEdu(edu.id, 'notes', $event)" />
        </div>
      </div>
    </TransitionGroup>

    <button class="add-btn mt-0.5" @click="store.addEdu()">
      <PlusIcon /> Ta'lim qo'shish
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCVStore } from '@/stores/cv'
import type { EducationItem } from '@/types/cv'
import PlusIcon from './PlusIcon.vue'
import RichEditor from './RichEditor.vue'

const store = useCVStore()

function set(id: string, field: keyof EducationItem, e: Event) {
  store.setEdu(id, field, (e.target as HTMLInputElement).value)
}
function setTa(id: string, field: keyof EducationItem, e: Event) {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 200) + 'px'
  store.setEdu(id, field, el.value)
}
function onCurrent(id: string, e: Event) {
  const checked = (e.target as HTMLInputElement).checked
  store.setEdu(id, 'isCurrent', checked)
  if (checked) store.setEdu(id, 'endDate', '')
}
</script>
