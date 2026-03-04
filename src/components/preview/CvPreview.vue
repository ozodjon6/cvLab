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
          <div style="float:left;margin-right:16px;"><CvAvatar :photo="p.photoUrl" :initials="store.initials" :size="84" /></div>
          <div>
            <div class="font-display font-bold text-[21px]" style="line-height:1.25;word-break:break-word;">{{ fullName }}</div>
            <div class="text-[10px] uppercase tracking-[.1em] opacity-50 mt-0.5">{{ p.jobTitle || t.cv.jobTitlePlaceholder }}</div>
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
              <div class="cv-sec-title">{{ t.cv.contacts }}</div>
              <div>
                <div style="margin-bottom:6px;"><CvContact icon="phone" :value="p.phone" /></div>
                <div style="margin-bottom:6px;"><CvContact icon="telegram" :value="p.telegram" :href="p.telegram ? 'https://t.me/' + p.telegram.replace('@', '') : ''" /></div>
                <div style="margin-bottom:6px;"><CvContact icon="website" :value="p.website" :href="toUrl(p.website)" :label="t.cv.website" /></div>
                <div style="margin-bottom:6px;"><CvContact icon="linkedin" :value="p.linkedin" :href="toUrl(p.linkedin)" label="LinkedIn" /></div>
                <div style="margin-bottom:0;"><CvContact icon="github" :value="p.github" :href="toUrl(p.github)" label="GitHub" /></div>
              </div>
            </div>
            <CvSkills :skills="cv.skills" />
            <CvLangs  :langs="cv.languages" />
            <CvEdu    :items="cv.education" />
          </div>
          <div style="flex:1;padding:16px 18px;min-width:0">
            <CvAbout :bio="p.bio" />
            <CvExp   :items="cv.experience" />
            <CvProj  :items="cv.projects" />
          </div>
        </div>
      </template>

      <!-- ── CLEAN ──────────────────────────────────────────── -->
      <template v-else-if="tpl === 'clean'">
        <div class="px-7 pt-5 pb-3.5" style="border-bottom:2.5px solid #0A2540">
          <div class="font-display font-extrabold text-[22px] tracking-[-1px]" style="line-height:1.3;padding-bottom:2px;word-break:break-word;">{{ fullName }}</div>
          <div class="text-[12px] mt-0.5" style="color:#1A56DB">{{ p.jobTitle }}</div>
          <div class="flex items-center gap-4 mt-2 flex-wrap">
            <CvContact icon="email" :value="p.email" />
            <CvContact icon="phone" :value="p.phone" />
            <CvContact icon="location" :value="p.city"  />
            <CvContact icon="website" :value="p.website" :href="toUrl(p.website)" :label="t.cv.website" />
            <CvContact icon="telegram" :value="p.telegram" :href="p.telegram ? 'https://t.me/' + p.telegram.replace('@', '') : ''" label="Telegram" />
            <CvContact icon="linkedin" :value="p.linkedin" :href="toUrl(p.linkedin)" label="LinkedIn" />
            <CvContact icon="github" :value="p.github" :href="toUrl(p.github)" label="GitHub" />
          </div>
        </div>
        <div class="px-7 py-5">
          <CvAbout :bio="p.bio" />
          <CvExp   :items="cv.experience" />
          <CvProj  :items="cv.projects" />
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
          <div class="flex items-center gap-3 flex-wrap">
            <CvContact icon="email" :value="p.email" light />
            <CvContact icon="phone" :value="p.phone" light />
            <CvContact icon="location" :value="p.city"  light />
            <CvContact icon="website" :value="p.website" :href="toUrl(p.website)" light :label="t.cv.website" />
            <CvContact icon="telegram" :value="p.telegram" :href="p.telegram ? 'https://t.me/' + p.telegram.replace('@', '') : ''" light label="Telegram" />
            <CvContact icon="linkedin" :value="p.linkedin" :href="toUrl(p.linkedin)" light label="LinkedIn" />
            <CvContact icon="github" :value="p.github" :href="toUrl(p.github)" light label="GitHub" />
          </div>
        </div>
        <div class="px-7 py-5">
          <CvAbout :bio="p.bio" />
          <CvExp   :items="cv.experience" />
          <CvProj  :items="cv.projects" />
          <CvSkills :skills="cv.skills" />
          <CvLangs  :langs="cv.languages" />
          <CvEdu    :items="cv.education" />
        </div>
      </template>

      <!-- ── MINIMAL ─────────────────────────────────────────── -->
      <template v-else-if="tpl === 'minimal'">
        <div class="px-7 py-5 flex items-center gap-3.5" style="border-bottom:1px solid #E2E8F0">
          <CvAvatar :photo="p.photoUrl" :initials="store.initials" :size="84" light />
          <div class="min-w-0">
            <div class="font-display font-bold text-[18px] tracking-[-0.5px]" style="line-height:1.3;padding-bottom:2px;word-break:break-word;">{{ fullName }}</div>
            <div class="text-[11px] font-medium mt-0.5" style="color:#1A56DB">{{ p.jobTitle }}</div>
            <div class="flex items-center gap-3 mt-1 flex-wrap">
              <CvContact icon="email" :value="p.email" />
              <CvContact icon="phone" :value="p.phone" />
              <CvContact icon="location" :value="p.city"  />
              <CvContact icon="website" :value="p.website" :href="toUrl(p.website)" :label="t.cv.website" />
              <CvContact icon="telegram" :value="p.telegram" :href="p.telegram ? 'https://t.me/' + p.telegram.replace('@', '') : ''" label="Telegram" />
              <CvContact icon="linkedin" :value="p.linkedin" :href="toUrl(p.linkedin)" label="LinkedIn" />
              <CvContact icon="github" :value="p.github" :href="toUrl(p.github)" label="GitHub" />
            </div>
          </div>
        </div>
        <div class="px-7 py-4">
          <CvAbout :bio="p.bio" />
          <CvExp   :items="cv.experience" />
          <CvProj  :items="cv.projects" />
          <CvSkills :skills="cv.skills" />
          <CvLangs  :langs="cv.languages" />
          <CvEdu    :items="cv.education" />
        </div>
      </template>

      <!-- ── ACADEMIC ─────────────────────────────────────────── -->
      <template v-else>
        <div class="academic-layout px-10 py-8 font-eb-garamond text-black font-medium">
          <div class="text-center font-medium">
            <h1 class="uppercase tracking-[1px] mb-1 font-eb-garamond" style="font-size: 28px; line-height: 1.2; padding-bottom: 2px;">{{ fullName }}</h1>
            <div style="font-size: 14px; margin-bottom: 3px;" v-if="p.jobTitle || p.city">
              <span v-if="p.jobTitle">{{ p.jobTitle }}</span>
              <span v-if="p.jobTitle && p.city"> | </span>
              <span v-if="p.city">{{ p.city }}</span>
            </div>
            <div class="flex items-center justify-center font-eb-garamond gap-x-4 gap-y-1 flex-wrap mt-2" style="font-size: 12px;">
              <CvContact v-if="p.phone" icon="phone" :value="p.phone" />
              <CvContact v-if="p.email" icon="email" :value="p.email" />
              <CvContact v-if="p.linkedin" icon="linkedin" :value="p.linkedin" :href="toUrl(p.linkedin)" />
              <CvContact v-if="p.github" icon="github" :value="p.github" :href="toUrl(p.github)" />
              <CvContact v-if="p.website" icon="website" :value="p.website" :href="toUrl(p.website)" />
              <CvContact v-if="p.telegram" icon="telegram" :value="p.telegram" :href="p.telegram ? 'https://t.me/' + p.telegram.replace('@', '') : ''" />
            </div>
          </div>

          <!-- Profile -->
          <div v-if="p.bio" class="mt-4">
            <h2 class="font-eb-garamond font-bold text-[15px] mb-1 pb-0.5 border-b border-black">{{ t.cv.profile }}</h2>
            <div style="font-size: 12px; line-height: 1.5; margin-top: 4px;" class="rich-text" v-html="p.bio"></div>
          </div>

          <!-- Experience -->
          <div v-if="cv.experience.filter(e => e.company || e.jobTitle).length" class="mt-4">
            <h2 class="font-eb-garamond font-bold text-[15px] mb-1" style="border-bottom: 1px solid #000; padding-bottom: 2px;">{{ t.cv.experience }}</h2>
            <div v-for="e in cv.experience.filter(e => e.company || e.jobTitle)" :key="e.id" style="margin-top: 6px; margin-bottom: 8px;">
              <div class="flex justify-between items-baseline" style="font-size: 12.5px;">
                <span class="font-bold">{{ e.company }}</span>
                <span class="font-bold" style="font-size: 12px;">
                  {{ formatDate(e.startDate) }}{{ formatDate(e.startDate) && (e.isCurrent || e.endDate) ? ' – ' : '' }}{{ e.isCurrent ? t.cv.present : formatDate(e.endDate) }}
                </span>
              </div>
              <div class="flex justify-between items-baseline italic" style="font-size: 12px; margin-top: 1px;">
                <span>{{ e.jobTitle }}</span>
                <span>{{ e.location }}</span>
              </div>
              <div v-if="e.description" style="font-size: 12px; line-height: 1.4; margin-top: 3px;" class="rich-text" v-html="e.description"></div>
            </div>
          </div>

          <!-- Projects -->
          <div v-if="cv.projects.filter(p => p.name).length" class="mt-4">
            <h2 class="font-eb-garamond font-bold text-[15px] mb-1" style="border-bottom: 1px solid #000; padding-bottom: 2px;">{{ t.cv.projects }}</h2>
            <div v-for="proj in cv.projects.filter(p => p.name)" :key="proj.id" style="margin-top: 6px; margin-bottom: 8px;">
              <div class="flex justify-between items-baseline" style="font-size: 12.5px;">
                <span class="font-bold">{{ proj.name }} <a v-if="proj.link" :href="toUrl(proj.link)" target="_blank" style="text-decoration:none;font-weight:normal;color:#000;">[Link]</a></span>
                <span class="font-bold" style="font-size: 12px;">
                  {{ formatDate(proj.startDate) }}{{ formatDate(proj.startDate) && formatDate(proj.endDate) ? ' – ' : '' }}{{ formatDate(proj.endDate) }}
                </span>
              </div>
              <div v-if="proj.description" style="font-size: 12px; line-height: 1.4; margin-top: 3px;" class="rich-text" v-html="proj.description"></div>
            </div>
          </div>

          <!-- Technical Skills -->
          <div v-if="cv.skills.length > 0 || cv.languages.length > 0" class="mt-4">
            <h2 class="font-bold text-[15px] mb-1" style="border-bottom: 1px solid #000; padding-bottom: 2px;">{{ t.cv.technicalSkills }}</h2>
            <div style="font-size: 12px; line-height: 1.5; margin-top: 4px;">
              <div v-if="cv.languages.length" style="margin-bottom: 2px;">
                <span class="font-bold">{{ t.cv.languages }}:</span> {{ cv.languages.map(l => l.name).join(', ') }}
              </div>
              <div v-if="cv.skills.length" style="margin-bottom: 2px;">
                <span class="font-bold">{{ t.cv.technologiesFrameworks }}:</span> {{ cv.skills.join(', ') }}
              </div>
            </div>
          </div>

          <!-- Education -->
          <div v-if="cv.education.filter(e => e.institution).length" class="mt-4">
            <h2 class="font-eb-garamond font-bold text-[15px] mb-1" style="border-bottom: 1px solid #000; padding-bottom: 2px;">{{ t.cv.education }}</h2>
            <div v-for="e in cv.education.filter(e => e.institution)" :key="e.id" style="margin-top: 6px; margin-bottom: 8px;">
              <div class="flex justify-between items-baseline" style="font-size: 12.5px;">
                <span class="font-bold">{{ e.institution }}</span>
                <span class="font-bold" style="font-size: 12px;">
                  {{ formatDate(e.startDate) }}{{ formatDate(e.startDate) && (e.isCurrent || e.endDate) ? ' – ' : '' }}{{ e.isCurrent ? t.cv.present : formatDate(e.endDate) }}
                </span>
              </div>
              <div class="flex justify-between items-baseline italic" style="font-size: 12px; margin-top: 1px;">
                <span>{{ e.degree }}</span>
                <span>{{ e.location }}</span>
              </div>
              <div v-if="e.notes" style="font-size: 12px; line-height: 1.4; margin-top: 3px;" class="rich-text" v-html="e.notes"></div>
            </div>
          </div>
        </div>
      </template>

      <!-- Watermark -->
      <a href="https://cvlab.uz/" target="_blank"
         class="absolute bottom-1 right-1 flex items-center gap-1 text-[10px] text-gray-400 hover:text-blue-brand transition-colors no-underline z-50">
        <Logo size="xs" />
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from 'vue'
import { storeToRefs } from 'pinia'
import { useCVStore } from '@/stores/cv'
import { fmtDate } from '@/types/cv'
import { useLanguage } from '@/composables/useLanguage'
import CvAvatar  from './CvAvatar.vue'
import CvContact from './CvContact.vue'
import CvAbout   from './CvAbout.vue'
import CvExp     from './CvExp.vue'
import CvProj    from './CvProj.vue'
import CvEdu     from './CvEdu.vue'
import CvSkills  from './CvSkills.vue'
import CvLangs   from './CvLangs.vue'
import Logo from "@components/layout/Logo.vue"

const store = useCVStore()
const { t } = useLanguage()
const { template: tpl, data: cv, fullName } = storeToRefs(store)
const p = computed(() => cv.value.personal)

function toUrl(val: string): string {
  if (!val) return ''
  return val.match(/^https?:\/\//) ? val : `https://${val}`
}

function formatDate(val: string) {
  return fmtDate(val, t.value.months)
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
  const style = window.getComputedStyle(wrapRef.value)
  const pad = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
  const avail = wrapRef.value.clientWidth - (isNaN(pad) ? 0 : pad)

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

<style scoped>
:deep(.academic-layout .cv-contact-item) {
  color: #000 !important;
}
:deep(.academic-layout .cv-contact-icon) {
  color: #000 !important;
}
:deep(.rich-text ul) { list-style-type: disc; margin-left: 1.25rem; }
:deep(.rich-text ol) { list-style-type: decimal; margin-left: 1.25rem; }
:deep(.rich-text li) { margin-bottom: 0.125rem; }
:deep(.rich-text b) { font-weight: 700; }
:deep(.rich-text i) { font-style: italic; }
:deep(.rich-text u) { text-decoration: underline; }
</style>
