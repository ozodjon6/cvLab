<template>
  <div ref="wrapRef" class="w-full flex justify-center overflow-x-hidden">
    <!-- Common wrapper for ALL templates -->
    <div
      id="cv-preview"
      ref="cvRef"
      class="cv-paper bg-white"
      :style="[paperStyle, { display: 'flex', flexDirection: 'column' }]"
    >
      <!-- ── MODERN ─────────────────────────────────────────── -->
      <template v-if="tpl === 'modern'">
        <!-- Header -->
        <div style="background:#0A2540;color:#fff;padding:18px 24px;overflow:hidden;">
          <div style="float:left;margin-right:16px;"><CvAvatar :photo="p.photoUrl" :initials="store.initials" :size="72" /></div>
          <div>
            <div class="font-display font-bold text-[21px]" style="line-height:1.25;word-break:break-word;">{{ fullName }}</div>
            <div class="text-[10px] uppercase tracking-[.1em] opacity-50 mt-0.5">{{ p.jobTitle || 'Kasb / Lavozim' }}</div>
            <div style="margin-top:8px;">
              <CvContact icon="email" :value="p.email" light />
              <CvContact icon="location" :value="p.city" light />
            </div>
          </div>
        </div>
        <!-- Two-column body -->
        <div style="display:flex;flex:1">
          <div style="width:220px;flex-shrink:0;background:#F7F9FC;border-right:1px solid #E2E8F0;padding:16px 14px">
            <div v-if="p.phone || p.telegram || p.website || p.linkedin || p.github" class="cv-sec mb-3">
              <div class="cv-sec-title">Kontaktlar</div>
              <div style="display:flex; flex-direction:column;">
                <CvContact icon="phone" :value="p.phone" />
                <CvContact icon="telegram" :value="p.telegram" :href="p.telegram ? 'https://t.me/' + p.telegram.replace('@', '') : ''" />
                <CvContact icon="website" :value="p.website" :href="toUrl(p.website)" label="Vebsayt" />
                <CvContact icon="linkedin" :value="p.linkedin" :href="toUrl(p.linkedin)" label="LinkedIn" />
                <CvContact icon="github" :value="p.github" :href="toUrl(p.github)" label="GitHub" />
              </div>
            </div>
            <CvSkills :skills="cv.skills" />
            <CvLangs  :langs="cv.languages" />
            <CvEdu    :items="cv.education" />
          </div>
          <div style="flex:1;padding:16px 18px;min-width:0">
            <CvAbout :bio="p.bio" />
            <CvExp   :items="cv.experience" />
          </div>
        </div>
      </template>

      <!-- ── CLEAN ──────────────────────────────────────────── -->
      <template v-else-if="tpl === 'clean'">
        <div class="px-7 pt-5 pb-3.5" style="border-bottom:2.5px solid #0A2540">
          <div class="font-display font-extrabold text-[22px] tracking-[-1px]" style="line-height:1.3;padding-bottom:2px;word-break:break-word;">{{ fullName }}</div>
          <div class="text-[12px] font-semibold mt-0.5" style="color:#1A56DB">{{ p.jobTitle }}</div>
          <div class="flex items-center mt-2 flex-wrap">
            <CvContact icon="email" :value="p.email" />
            <CvContact icon="phone" :value="p.phone" />
            <CvContact icon="location" :value="p.city"  />
            <CvContact icon="website" :value="p.website" :href="toUrl(p.website)" label="Vebsayt" />
            <CvContact icon="telegram" :value="p.telegram" :href="p.telegram ? 'https://t.me/' + p.telegram.replace('@', '') : ''" label="Telegram" />
            <CvContact icon="linkedin" :value="p.linkedin" :href="toUrl(p.linkedin)" label="LinkedIn" />
            <CvContact icon="github" :value="p.github" :href="toUrl(p.github)" label="GitHub" />
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
          <div class="font-display font-extrabold text-[22px] tracking-[-1px] mb-0.5" style="line-height:1.3;padding-bottom:2px;word-break:break-word;">{{ fullName }}</div>
          <div class="text-[10px] uppercase tracking-[.07em] opacity-65 mb-2.5">{{ p.jobTitle }}</div>
          <div class="flex items-center flex-wrap">
            <CvContact icon="email" :value="p.email" light />
            <CvContact icon="phone" :value="p.phone" light />
            <CvContact icon="location" :value="p.city"  light />
            <CvContact icon="website" :value="p.website" :href="toUrl(p.website)" light label="Vebsayt" />
            <CvContact icon="telegram" :value="p.telegram" :href="p.telegram ? 'https://t.me/' + p.telegram.replace('@', '') : ''" light label="Telegram" />
            <CvContact icon="linkedin" :value="p.linkedin" :href="toUrl(p.linkedin)" light label="LinkedIn" />
            <CvContact icon="github" :value="p.github" :href="toUrl(p.github)" light label="GitHub" />
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
            <div class="font-display font-bold text-[18px] tracking-[-0.5px]" style="line-height:1.3;padding-bottom:2px;word-break:break-word;">{{ fullName }}</div>
            <div class="text-[11px] font-medium mt-0.5" style="color:#1A56DB">{{ p.jobTitle }}</div>
            <div class="flex items-center mt-1 flex-wrap">
              <CvContact icon="email" :value="p.email" />
              <CvContact icon="phone" :value="p.phone" />
              <CvContact icon="location" :value="p.city"  />
              <CvContact icon="website" :value="p.website" :href="toUrl(p.website)" label="Vebsayt" />
              <CvContact icon="linkedin" :value="p.linkedin" :href="toUrl(p.linkedin)" label="LinkedIn" />
              <CvContact icon="github" :value="p.github" :href="toUrl(p.github)" label="GitHub" />
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

function toUrl(val: string): string {
  if (!val) return ''
  return val.match(/^https?:\/\//) ? val : `https://${val}`
}

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
