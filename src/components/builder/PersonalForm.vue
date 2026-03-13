<template>
  <div>
    <h2 class="font-display font-bold text-lg tracking-tight mb-1 dark:text-white">{{ t.personalForm.title }}</h2>
    <p class="text-xs text-gray-400 dark:text-gray-500 mb-4">{{ t.personalForm.subtitle }}</p>

    <!-- Photo -->
    <div v-if="showPhoto" class="mb-5">
      <label class="field-label">{{ t.personalForm.photo }}</label>
      
      <div v-if="store.data.personal.photoUrl" class="flex items-center gap-4 p-3 bg-gray-50 dark:bg-navy-900/50 rounded-xl border border-gray-100 dark:border-gray-700">
        <img :src="store.data.personal.photoUrl" class="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-navy-800 shadow-sm" />
        <div class="flex flex-col gap-1.5">
          <button @click="fileRef?.click()" class="text-[12px] font-bold text-blue-brand dark:text-blue-400 hover:underline flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M17 3a2.828 2.828 0 114 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            {{ t.personalForm.photoChange }}
          </button>
          <button @click="store.setPersonal('photoUrl', null)" class="text-[12px] font-bold text-red-500 hover:underline flex items-center gap-1">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            {{ t.personalForm.photoRemove }}
          </button>
        </div>
        <input ref="fileRef" type="file" accept="image/*" class="hidden" @change="onFile" />
      </div>

      <div v-else 
           class="border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl p-6 text-center
                  cursor-pointer transition-all duration-200 hover:border-blue-brand dark:hover:border-blue-500 hover:bg-blue-light dark:hover:bg-blue-900/30 relative"
           @click="fileRef?.click()">
        <input ref="fileRef" type="file" accept="image/*" class="hidden" @change="onFile" />
        <div class="w-12 h-12 bg-blue-50 dark:bg-blue-900/40 rounded-full flex items-center justify-center mx-auto mb-2 text-blue-brand dark:text-blue-400">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
        </div>
        <div class="text-[12px] text-gray-400 font-bold uppercase tracking-wider">{{ t.personalForm.photoUpload }}</div>
      </div>
    </div>

    <!-- Name -->
    <div class="grid grid-cols-2 gap-2.5 mb-3">
      <div>
        <label class="field-label field-label-req">{{ t.personalForm.firstName }}</label>
        <input class="input-base" type="text" placeholder="Ozodbek"
          :value="p.firstName" @input="set('firstName', $event)" />
      </div>
      <div>
        <label class="field-label field-label-req">{{ t.personalForm.lastName }}</label>
        <input class="input-base" type="text" placeholder="Jumaev"
          :value="p.lastName" @input="set('lastName', $event)" />
      </div>
    </div>

    <div class="mb-3">
      <label class="field-label field-label-req">{{ t.personalForm.jobTitle }}</label>
      <input class="input-base" type="text" placeholder="Frontend Engineer"
        :value="p.jobTitle" @input="set('jobTitle', $event)" />
    </div>

    <div class="grid grid-cols-2 gap-2.5 mb-3">
      <div>
        <label class="field-label">{{ t.personalForm.email }}</label>
        <input class="input-base" type="email" placeholder="email@example.com"
          :value="p.email" @input="set('email', $event)" />
      </div>
      <div>
        <label class="field-label">{{ t.personalForm.phone }}</label>
        <input class="input-base" type="tel" placeholder="+998 90 123 45 67"
          :value="p.phone" @input="set('phone', $event)" />
      </div>
    </div>

    <div class="grid grid-cols-2 gap-2.5 mb-3">
      <div>
        <label class="field-label">{{ t.personalForm.city }}</label>
        <input class="input-base" type="text" placeholder="Toshkent"
          :value="p.city" @input="set('city', $event)" />
      </div>
      <div>
        <label class="field-label">{{ t.personalForm.telegram }}</label>
        <input class="input-base" type="text" placeholder="@username"
          :value="p.telegram" @input="set('telegram', $event)" />
      </div>
    </div>

    <div class="mb-3">
      <label class="field-label">{{ t.personalForm.website }}</label>
      <input class="input-base" type="url" placeholder="https://yoursite.com"
        :value="p.website" @input="set('website', $event)" />
    </div>

    <div class="grid grid-cols-2 gap-2.5 mb-3">
      <div>
        <label class="field-label">{{ t.personalForm.linkedin }}</label>
        <input class="input-base" type="url" placeholder="linkedin.com/in/..."
          :value="p.linkedin" @input="set('linkedin', $event)" />
      </div>
      <div>
        <label class="field-label">{{ t.personalForm.github }}</label>
        <input class="input-base" type="url" placeholder="github.com/username"
          :value="p.github" @input="set('github', $event)" />
      </div>
    </div>

    <div>
      <label class="field-label">{{ t.personalForm.bio }}</label>
      <RichEditor :model-value="p.bio" @update:model-value="store.setPersonal('bio', $event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCVStore } from '@/stores/cv'
import { useToast } from '@/composables/useToast'
import { usePhotoUpload } from '@/composables/usePhotoUpload'
import { useLanguage } from '@/composables/useLanguage'
import { storeToRefs } from 'pinia'
import RichEditor from './RichEditor.vue'

const store   = useCVStore()
const toast   = useToast()
const { t }   = useLanguage()
const { read } = usePhotoUpload()
const { template: tpl } = storeToRefs(store)
const p       = store.data.personal
const fileRef = ref<HTMLInputElement | null>(null)
const showPhoto = computed(() => tpl.value === 'modern' || tpl.value === 'minimal')

function set(field: string, e: Event) {
  store.setPersonal(field as keyof typeof p, (e.target as HTMLInputElement).value)
}
function setTextarea(field: string, e: Event) {
  const el = e.target as HTMLTextAreaElement
  el.style.height = 'auto'
  el.style.height = Math.min(el.scrollHeight, 200) + 'px'
  store.setPersonal(field as keyof typeof p, el.value)
}
async function onFile(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  try {
    const url = await read(file)
    store.setPersonal('photoUrl', url)
  } catch (err) {
    toast.error((err as Error).message)
  }
}
</script>
