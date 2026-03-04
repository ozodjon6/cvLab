<template>
  <div>
    <h2 class="font-display font-bold text-lg tracking-tight mb-1">{{ t.projectForm.title }}</h2>
    <p class="text-xs text-gray-400 mb-4">{{ t.projectForm.subtitle }}</p>

    <TransitionGroup name="block">
      <div v-for="(proj, idx) in store.data.projects" :key="proj.id" class="data-block">
        <div class="flex justify-between items-center mb-2.5 text-[12px] font-bold">
          <span>{{ t.projectForm.itemLabel }} #{{ idx + 1 }}</span>
          <button class="text-red-400 hover:text-red-500 text-[11.5px] font-semibold transition-colors"
            @click="store.rmProj(proj.id)">{{ t.projectForm.remove }}</button>
        </div>

        <div class="grid grid-cols-2 gap-2.5 mb-2.5">
          <div>
            <label class="field-label field-label-req">{{ t.projectForm.name }}</label>
            <input class="input-base" type="text" placeholder="E-commerce sayt"
              :value="proj.name" @input="set(proj.id,'name',$event)" />
          </div>
          <div>
            <label class="field-label">{{ t.projectForm.link }}</label>
            <input class="input-base" type="text" placeholder="https://github.com/..."
              :value="proj.link" @input="set(proj.id,'link',$event)" />
          </div>
        </div>

        <div class="grid grid-cols-2 gap-2.5 mb-2.5">
          <div>
            <label class="field-label">{{ t.projectForm.startDate }}</label>
            <input class="input-base" type="month"
              :value="proj.startDate" @input="set(proj.id,'startDate',$event)" />
          </div>
          <div>
            <label class="field-label">{{ t.projectForm.endDate }}</label>
            <input class="input-base" type="month"
              :value="proj.endDate" @input="set(proj.id,'endDate',$event)" />
          </div>
        </div>

        <div>
          <label class="field-label">{{ t.projectForm.description }}</label>
          <RichEditor :model-value="proj.description" @update:model-value="store.setProj(proj.id, 'description', $event)" />
        </div>
      </div>
    </TransitionGroup>

    <button class="add-btn mt-0.5" @click="store.addProj()">
      <PlusIcon /> {{ t.projectForm.addBtn }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useCVStore } from '@/stores/cv'
import { useLanguage } from '@/composables/useLanguage'
import type { ProjectItem } from '@/types/cv'
import PlusIcon from './PlusIcon.vue'
import RichEditor from './RichEditor.vue'

const store = useCVStore()
const { t } = useLanguage()

function set(id: string, field: keyof ProjectItem, e: Event) {
  store.setProj(id, field, (e.target as HTMLInputElement).value)
}
</script>
