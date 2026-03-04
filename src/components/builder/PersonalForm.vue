<template>
  <div>
    <h2 class="font-display font-bold text-lg tracking-tight mb-1">{{ t.personalForm.title }}</h2>
    <p class="text-xs text-gray-400 mb-4">{{ t.personalForm.subtitle }}</p>

    <!-- Photo -->
    <div v-if="showPhoto" class="mb-4">
      <label class="field-label">{{ t.personalForm.photo }}</label>
      <div class="border-2 border-dashed border-gray-200 rounded-[10px] p-4 text-center
                  cursor-pointer transition-all duration-200 hover:border-blue-brand hover:bg-blue-light relative"
           @click="fileRef?.click()">
        <input ref="fileRef" type="file" accept="image/*" class="hidden" @change="onFile" />
        <img v-if="store.data.personal.photoUrl" :src="store.data.personal.photoUrl"
             class="w-14 h-14 rounded-full object-cover mx-auto mb-2 border-2 border-gray-200" />
        <template v-else>
          <div class="text-3xl mb-1">🖼️</div>
          <div class="text-[11px] text-gray-400 font-medium">{{ t.personalForm.photoUpload }}</div>
        </template>
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
