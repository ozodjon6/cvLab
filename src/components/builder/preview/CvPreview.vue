<template>
  <!-- Outer wrapper sized to match scaled content height -->
  <div ref="wrapRef" class="w-full">
    <div id="cv-preview" ref="cvRef" class="cv-paper" :style="paperStyle">

      <!-- ══ MODERN ══ -->
      <template v-if="tpl === 'modern'">
        <div class="flex items-center gap-3.5 px-7 py-5" style="background:#0A2540;color:#fff">
          <CvAvatar :photo="p.photoUrl" :initials="store.inits" :size="56" />
          <div class="min-w-0">
            <div class="font-display font-bold text-[19px] mb-0.5 truncate">{{ fullName }}</div>
            <div class="text-[10px] uppercase tracking-[.07em]" style="opacity:.5">{{ p.jobTitle || 'Kasb / Lavozim' }}</div>
            <div class="flex gap-3 mt-1.5 flex-wrap">
              <CvContact v-if="p.email"       :val="p.email" />
              <CvContact v-if="p.phone"       :val="p.phone" />
              <CvContact v-if="p.city"        :val="p.city" />
              <CvContact v-if="dobFormatted"  :val="dobFormatted" />
            </div>
          </div>
        </div>
        <div class="flex">
          <div class="w-[190px] shrink-0 p-4" style="background:#F7F9FC;border-right:1px solid #E2E8F0">
            <CvSkills   :skills="cv.skills" />
            <CvLangs    :langs="cv.languages" />
            <CvEdu      :education="cv.education" />
          </div>
          <div class="flex-1 p-5 min-w-0">
            <CvAbout  :bio="p.bio" />
            <CvExp    :experience="cv.experience" />
          </div>
        </div>
      </template>

      <!-- ══ CLEAN ══ -->
      <template v-else-if="tpl === 'clean'">
        <div class="px-7 pt-5 pb-3.5" style="border-bottom:2.5px solid #0A2540">
          <div class="font-display font-bold text-[22px] tracking-[-1px]">{{ fullName }}</div>
          <div class="text-[12px] font-semibold mt-0.5" style="color:#1A56DB">{{ p.jobTitle || 'Kasb / Lavozim' }}</div>
          <div class="flex gap-4 mt-2 flex-wrap">
            <CvContact v-if="p.email"      :val="p.email"      dark />
            <CvContact v-if="p.phone"      :val="p.phone"      dark />
            <CvContact v-if="p.city"       :val="p.city"       dark />
            <CvContact v-if="dobFormatted" :val="dobFormatted" dark />
          </div>
        </div>
        <div class="px-7 py-5">
          <CvAbout  :bio="p.bio" />
          <CvExp    :experience="cv.experience" />
          <CvSkills :skills="cv.skills" />
          <CvLangs  :langs="cv.languages" />
          <CvEdu    :education="cv.education" />
        </div>
      </template>

      <!-- ══ BOLD ══ -->
      <template v-else-if="tpl === 'bold'">
        <div class="px-7 py-6" style="background:#1A56DB;color:#fff">
          <div class="font-display font-bold text-[22px] tracking-[-1px] mb-0.5">{{ fullName }}</div>
          <div class="text-[10px] uppercase tracking-[.07em] mb-2.5" style="opacity:.65">{{ p.jobTitle || 'Kasb / Lavozim' }}</div>
          <div class="flex gap-3 flex-wrap">
            <CvContact v-if="p.email"      :val="p.email" />
            <CvContact v-if="p.phone"      :val="p.phone" />
            <CvContact v-if="p.city"       :val="p.city" />
            <CvContact v-if="dobFormatted" :val="dobFormatted" />
          </div>
        </div>
        <div class="px-7 py-5">
          <CvAbout  :bio="p.bio" />
          <CvExp    :experience="cv.experience" />
          <CvSkills :skills="cv.skills" />
          <CvLangs  :langs="cv.languages" />
          <CvEdu    :education="cv.education" />
        </div>
      </template>

      <!-- ══ MINIMAL ══ -->
      <template v-else>
        <div class="px-7 py-5 flex items-center gap-3.5" style="border-bottom:1px solid #E2E8F0">
          <CvAvatar :photo="p.photoUrl" :initials="store.inits" :size="48" light />
          <div class="min-w-0">
            <div class="font-display font-bold text-[18px] tracking-[-0.5px] truncate">{{ fullName }}</div>
            <div class="text-[11px] font-medium mt-0.5" style="color:#1A56DB">{{ p.jobTitle || 'Kasb / Lavozim' }}</div>
            <div class="flex gap-3 mt-1 flex-wrap">
              <CvContact v-if="p.email"      :val="p.email"      dark />
              <CvContact v-if="p.phone"      :val="p.phone"      dark />
              <CvContact v-if="p.city"       :val="p.city"       dark />
              <CvContact v-if="dobFormatted" :val="dobFormatted" dark />
            </div>
          </div>
        </div>
        <div class="px-7 py-4">
          <CvAbout  :bio="p.bio" />
          <CvExp    :experience="cv.experience" />
          <CvSkills :skills="cv.skills" />
          <CvLangs  :langs="cv.languages" />
          <CvEdu    :education="cv.education" />
        </div>
      </template>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useCVStore } from '@/stores/cv'
import { fmtDob } from '@/types/cv'
import CvAvatar  from './CvAvatar.vue'
import CvContact from './CvContact.vue'
import CvAbout   from './CvAbout.vue'
import CvExp     from './CvExp.vue'
import CvEdu     from './CvEdu.vue'
import CvSkills  from './CvSkills.vue'
import CvLangs   from './CvLangs.vue'

const store = useCVStore()
const { data: cv, template: tpl, fullName } = storeToRefs(store)
const p = computed(() => cv.value.personal)
const dobFormatted = computed(() => fmtDob(p.value.dateOfBirth))

// ── Scale to fit wrapper ──
const wrapRef = ref<HTMLElement | null>(null)
const cvRef   = ref<HTMLElement | null>(null)
const scale   = ref(1)

const paperStyle = computed(() => ({
  width:           '794px',
  minHeight:       '1123px',
  transformOrigin: 'top left',
  transform:       `scale(${scale.value})`,
  boxShadow:       '0 4px 24px rgba(0,0,0,.15)',
}))

function recalc() {
  const wrap = wrapRef.value
  if (!wrap) return
  const s = Math.min(1, (wrap.clientWidth) / 794)
  scale.value = s
  nextTick(() => {
    const cv = cvRef.value
    if (cv && wrap) wrap.style.height = cv.scrollHeight * s + 'px'
  })
}

onMounted(() => {
  recalc()
  const ro = new ResizeObserver(recalc)
  if (wrapRef.value) ro.observe(wrapRef.value)
})
watch(cv,  recalc, { deep: true })
watch(tpl, () => nextTick(recalc))
</script>
