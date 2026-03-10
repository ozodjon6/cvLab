import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { CVData, TemplateId, StepId, ExperienceItem, EducationItem, LanguageItem, ProjectItem } from '@/types/cv'
import { emptyCV, newExp, newEdu, newLang, newProj, validateStep } from '@/types/cv'
import { exampleCVData } from '@/types/example'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from './auth'

export const useCVStore = defineStore('cv', () => {
  // ── State ──────────────────────────────────────────
  const data = ref<CVData>(emptyCV())
  const template = ref<TemplateId>('modern')
  const step = ref<StepId>(1)
  const maxStep = ref<StepId>(1)   // highest reached
  const open = ref(false)
  const showExample = ref(false)
  const isSaving = ref(false)
  const cloudId = ref<string | null>(null)
  watch(step, (s) => { if (s !== 1) showExample.value = false })

  // ── Computed ───────────────────────────────────────
  const currentData = computed(() => showExample.value ? exampleCVData : data.value)
  const fullName = computed(() =>
    `${currentData.value.personal.firstName} ${currentData.value.personal.lastName}`.trim()
  )
  const initials = computed(() => {
    const f = currentData.value.personal.firstName[0] || ''
    const l = currentData.value.personal.lastName[0] || ''
    return (f + l).toUpperCase() || 'CV'
  })

  const stepErrors = computed(() => validateStep(step.value, data.value))
  const isValid = computed(() => stepErrors.value.length === 0)

  // ── Builder open/close ─────────────────────────────
  function openBuilder() {
    open.value = true
    if (data.value.experience.length === 0) addExp()
    if (data.value.projects.length === 0) addProj()
    if (data.value.education.length === 0) addEdu()
    if (data.value.languages.length === 0) addLang()
  }
  function closeBuilder() { open.value = false }

  // ── Navigation ─────────────────────────────────────
  function setTemplate(t: TemplateId) { template.value = t }

  /** Returns false if current step validation fails */
  function next(): boolean {
    const errs = validateStep(step.value, data.value)
    if (errs.length) return false
    if (step.value < 6) {
      step.value = (step.value + 1) as StepId
      if (step.value > maxStep.value) maxStep.value = step.value as StepId
    }
    return true
  }
  function prev() {
    if (step.value > 1) step.value = (step.value - 1) as StepId
  }
  function goTo(s: StepId) {
    if (s <= maxStep.value) step.value = s
  }

  // ── Personal ───────────────────────────────────────
  function setPersonal(field: keyof CVData['personal'], val: string | null) {
    (data.value.personal as Record<string, unknown>)[field] = val
  }

  // ── Experience ─────────────────────────────────────
  function addExp() { data.value.experience.push(newExp()) }
  function rmExp(id: string) { data.value.experience = data.value.experience.filter(e => e.id !== id) }
  function setExp(id: string, field: keyof ExperienceItem, val: string | boolean) {
    const item = data.value.experience.find(e => e.id === id)
    if (item) (item as Record<string, unknown>)[field] = val
  }

  // ── Projects ───────────────────────────────────────
  function addProj() { data.value.projects.push(newProj()) }
  function rmProj(id: string) { data.value.projects = data.value.projects.filter(p => p.id !== id) }
  function setProj(id: string, field: keyof ProjectItem, val: string) {
    const item = data.value.projects.find(p => p.id === id)
    if (item) (item as Record<string, unknown>)[field] = val
  }

  // ── Education ──────────────────────────────────────
  function addEdu() { data.value.education.push(newEdu()) }
  function rmEdu(id: string) { data.value.education = data.value.education.filter(e => e.id !== id) }
  function setEdu(id: string, field: keyof EducationItem, val: string | boolean) {
    const item = data.value.education.find(e => e.id === id)
    if (item) (item as Record<string, unknown>)[field] = val
  }

  // ── Skills ─────────────────────────────────────────
  function addSkill(s: string) {
    const v = s.trim()
    if (v && !data.value.skills.includes(v)) data.value.skills.push(v)
  }
  function rmSkill(i: number) { data.value.skills.splice(i, 1) }

  // ── Languages ──────────────────────────────────────
  function addLang() { data.value.languages.push(newLang()) }
  function rmLang(id: string) { data.value.languages = data.value.languages.filter(l => l.id !== id) }
  function setLang(id: string, field: keyof LanguageItem, val: string) {
    const item = data.value.languages.find(l => l.id === id)
    if (item) (item as Record<string, unknown>)[field] = val
  }

  // ── Reset ──────────────────────────────────────────
  function reset() {
    data.value = emptyCV()
    template.value = 'modern'
    step.value = 1
    maxStep.value = 1
    cloudId.value = null
  }

  // ── Cloud ──────────────────────────────────────────
  async function saveToCloud(quiet = false) {
    const authStore = useAuthStore()
    if (!authStore.user) {
      if (!quiet) authStore.openAuthModal()
      return false
    }

    isSaving.value = true
    try {
      const payload = {
        user_id: authStore.user.id,
        title: fullName.value || 'My Resume',
        data: data.value,
        template: template.value,
        updated_at: new Date().toISOString()
      }

      if (cloudId.value) {
        const { error } = await supabase.from('resumes').update(payload).eq('id', cloudId.value)
        if (error) throw error
      } else {
        const { data: res, error } = await supabase.from('resumes').insert([payload]).select('id').single()
        if (error) throw error
        if (res) cloudId.value = res.id
      }
      return true
    } catch (e) {
      console.error(e)
      return false
    } finally {
      isSaving.value = false
    }
  }

  return {
    data, currentData, template, step, maxStep, open, showExample, isSaving, cloudId,
    fullName, initials, stepErrors, isValid,
    openBuilder, closeBuilder,
    setTemplate, next, prev, goTo,
    setPersonal,
    addExp, rmExp, setExp,
    addProj, rmProj, setProj,
    addEdu, rmEdu, setEdu,
    addSkill, rmSkill,
    addLang, rmLang, setLang,
    reset,
    saveToCloud
  }
})
