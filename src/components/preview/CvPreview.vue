<template>
  <!-- Outer wrapper: centers the scaled A4 paper, height tracks scaled content -->
  <div ref="wrapRef" class="w-full flex justify-center overflow-x-hidden">
    <div
      id="cv-preview"
      ref="cvRef"
      class="cv-paper bg-white"
      :style="paperStyle"
    >
      <!-- ── MODERN ─────────────────────────────────────────── -->
      <template v-if="tpl === 'modern'">
        <div style="display:flex;align-items:flex-start;gap:14px;padding:20px 28px;background:#0A2540;color:#fff">
          <CvAvatar :photo="p.photoUrl" :initials="store.initials" :size="56" />
          <div style="min-width:0;padding-top:2px">
            <div class="font-display font-bold text-[19px] mb-0.5 truncate">{{ fullName }}</div>
            <div class="text-[10px] uppercase tracking-[.07em] opacity-50">{{ p.jobTitle || 'Kasb / Lavozim' }}</div>
            <div style="display:flex;gap:12px;margin-top:6px;flex-wrap:wrap">
              <CvContact :value="p.email" light />
              <CvContact :value="p.phone" light />
              <CvContact :value="p.city"  light />
              <CvContact :value="dobStr"  light />
              <CvContact :value="p.website" :href="toUrl(p.website)" light />
              <CvContact :value="p.linkedin" :href="toUrl(p.linkedin)" light />
              <CvContact :value="p.github" :href="toUrl(p.github)" light />
            </div>
          </div>
        </div>
        <!-- Two-column body -->
        <div style="display:flex;flex:1;min-height:0">
          <div style="width:190px;flex-shrink:0;padding:16px;background:#F7F9FC;border-right:1px solid #E2E8F0;min-height:100%">
            <CvSkills :skills="cv.skills" />
            <CvLangs  :langs="cv.languages" />
            <CvEdu    :items="cv.education" />
          </div>
          <div class="flex-1 p-5 min-w-0">
            <CvAbout :bio="p.bio" />
            <CvExp   :items="cv.experience" />
          </div>
        </div>
      </template>

      <!-- ── CLEAN ──────────────────────────────────────────── -->
      <template v-else-if="tpl === 'clean'">
        <div class="px-7 pt-5 pb-3.5" style="border-bottom:2.5px solid #0A2540">
          <div class="font-display font-extrabold text-[22px] tracking-[-1px]">{{ fullName }}</div>
          <div class="text-[12px] font-semibold mt-0.5" style="color:#1A56DB">{{ p.jobTitle }}</div>
          <div class="flex gap-4 mt-2 flex-wrap">
            <CvContact :value="p.email" />
            <CvContact :value="p.phone" />
            <CvContact :value="p.city"  />
            <CvContact :value="dobStr"  />
            <CvContact :value="p.website" :href="toUrl(p.website)" />
            <CvContact :value="p.linkedin" :href="toUrl(p.linkedin)" />
            <CvContact :value="p.github" :href="toUrl(p.github)" />
          </div>
        </div>
        <div class="px-7 py-5">
          <CvAbout :bio="p.bio" />
          <CvExp   :items="cv.experience" />
          <CvSkills :skills="cv.skills" />
          <CvLangs  :langs="cv.languages" />
          <CvEdu    :items="cv.education" />
        </div>
      </template>

      <!-- ── BOLD ───────────────────────────────────────────── -->
      <template v-else-if="tpl === 'bold'">
        <div class="px-7 py-6" style="background:#1A56DB;color:#fff">
          <div class="font-display font-extrabold text-[22px] tracking-[-1px] mb-0.5">{{ fullName }}</div>
          <div class="text-[10px] uppercase tracking-[.07em] opacity-65 mb-2.5">{{ p.jobTitle }}</div>
          <div class="flex gap-3 flex-wrap">
            <CvContact :value="p.email" light />
            <CvContact :value="p.phone" light />
            <CvContact :value="p.city"  light />
            <CvContact :value="dobStr"  light />
            <CvContact :value="p.website" :href="toUrl(p.website)" light />
            <CvContact :value="p.linkedin" :href="toUrl(p.linkedin)" light />
            <CvContact :value="p.github" :href="toUrl(p.github)" light />
          </div>
        </div>
        <div class="px-7 py-5">
          <CvAbout :bio="p.bio" />
          <CvExp   :items="cv.experience" />
          <CvSkills :skills="cv.skills" />
          <CvLangs  :langs="cv.languages" />
          <CvEdu    :items="cv.education" />
        </div>
      </template>

      <!-- ── MINIMAL ─────────────────────────────────────────── -->
      <template v-else>
        <div class="px-7 py-5 flex items-center gap-3.5" style="border-bottom:1px solid #E2E8F0">
          <CvAvatar :photo="p.photoUrl" :initials="store.initials" :size="48" light />
          <div class="min-w-0">
            <div class="font-display font-bold text-[18px] tracking-[-0.5px] truncate">{{ fullName }}</div>
            <div class="text-[11px] font-medium mt-0.5" style="color:#1A56DB">{{ p.jobTitle }}</div>
            <div class="flex gap-3 mt-1 flex-wrap">
              <CvContact :value="p.email" />
              <CvContact :value="p.phone" />
              <CvContact :value="p.city"  />
              <CvContact :value="dobStr"  />
              <CvContact :value="p.website" :href="toUrl(p.website)" />
              <CvContact :value="p.linkedin" :href="toUrl(p.linkedin)" />
              <CvContact :value="p.github" :href="toUrl(p.github)" />
            </div>
          </div>
        </div>
        <div class="px-7 py-4">
          <CvAbout :bio="p.bio" />
          <CvExp   :items="cv.experience" />
          <CvSkills :skills="cv.skills" />
          <CvLangs  :langs="cv.languages" />
          <CvEdu    :items="cv.education" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useCVStore } from '@/stores/cv'
import CvAvatar  from './CvAvatar.vue'
import CvContact from './CvContact.vue'
import CvAbout   from './CvAbout.vue'
import CvExp     from './CvExp.vue'
import CvEdu     from './CvEdu.vue'
import CvSkills  from './CvSkills.vue'
import CvLangs   from './CvLangs.vue'

const store = useCVStore()
const { template: tpl, data: cv, fullName } = storeToRefs(store)
const p = computed(() => cv.value.personal)

// DOB formatted
const dobStr = computed(() => {
  const d = p.value.dateOfBirth
  if (!d) return ''
  return new Date(d + 'T00:00:00').toLocaleDateString('uz-UZ', {
    day: '2-digit', month: '2-digit', year: 'numeric'
  })
})

// Ensure URL has protocol prefix
function toUrl(val: string): string {
  if (!val) return ''
  return val.match(/^https?:\/\//) ? val : `https://${val}`
}

// ── Scale to fit wrapper ──────────────────────────────────
const wrapRef = ref<HTMLElement | null>(null)
const cvRef   = ref<HTMLElement | null>(null)
const scale   = ref(1)

const paperStyle = computed(() => ({
  width: '794px',
  minHeight: '1123px',
  transformOrigin: 'top center',
  transform: `scale(${scale.value})`,
  boxShadow: '0 4px 24px rgba(0,0,0,.15)',
  flexShrink: '0',
}))

function recalc() {
  if (!wrapRef.value) return
  const avail = wrapRef.value.clientWidth
  scale.value = Math.min(1, avail / 794)
  nextTick(() => {
    if (cvRef.value && wrapRef.value) {
      // Use offsetHeight for accurate rendered height after transforms
      const scaledH = cvRef.value.offsetHeight * scale.value
      wrapRef.value.style.height = scaledH + 'px'
    }
  })
}

onMounted(() => {
  recalc()
  const ro = new ResizeObserver(recalc)
  if (wrapRef.value) ro.observe(wrapRef.value)
})

watch(cv, () => nextTick(recalc), { deep: true })
watch(tpl, () => nextTick(recalc))
</script>
