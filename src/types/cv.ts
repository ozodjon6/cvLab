// ── Core types ────────────────────────────────────────────

export type TemplateId = 'modern' | 'clean' | 'bold' | 'minimal'
export type StepId = 1 | 2 | 3 | 4 | 5
export type LanguageLevel = 'Ona tili' | 'C2' | 'C1' | 'B2' | 'B1' | 'A2' | 'A1'

export interface PersonalInfo {
  firstName: string
  lastName: string
  jobTitle: string
  email: string
  phone: string
  city: string
  dateOfBirth: string
  website: string
  linkedin: string
  github: string
  bio: string
  photoUrl: string | null
}

export interface ExperienceItem {
  id: string
  jobTitle: string
  company: string
  location: string
  startDate: string
  endDate: string
  isCurrent: boolean
  description: string
}

export interface EducationItem {
  id: string
  institution: string
  degree: string
  years: string
  notes: string
}

export interface LanguageItem {
  id: string
  name: string
  level: LanguageLevel
}

export interface CVData {
  personal: PersonalInfo
  experience: ExperienceItem[]
  education: EducationItem[]
  skills: string[]
  languages: LanguageItem[]
}

// ── Step config ───────────────────────────────────────────

export interface BuilderStep {
  id: StepId
  label: string
  description: string
}

export const BUILDER_STEPS: BuilderStep[] = [
  { id: 1, label: 'Shablon', description: 'Shablon tanlang' },
  { id: 2, label: 'Shaxsiy', description: "Shaxsiy ma'lumotlar" },
  { id: 3, label: 'Tajriba', description: 'Ish tajribasi' },
  { id: 4, label: "Ta'lim", description: "Ta'lim" },
  { id: 5, label: "Ko'nikmalar", description: "Ko'nikmalar & Tillar" },
]

export const LANGUAGE_LEVELS: LanguageLevel[] = [
  'Ona tili', 'C2', 'C1', 'B2', 'B1', 'A2', 'A1',
]

// ── Validation ────────────────────────────────────────────

export interface ValidationError { field: string; message: string }

export function validateStep(step: StepId, data: CVData): ValidationError[] {
  const errors: ValidationError[] = []
  if (step === 2) {
    if (!data.personal.firstName.trim()) errors.push({ field: 'firstName', message: 'Ism kiritilishi shart' })
    if (!data.personal.lastName.trim()) errors.push({ field: 'lastName', message: 'Familiya kiritilishi shart' })
    if (!data.personal.jobTitle.trim()) errors.push({ field: 'jobTitle', message: 'Kasb kiritilishi shart' })
    if (!data.personal.email.trim()) errors.push({ field: 'email', message: 'Email kiritilishi shart' })
  }
  if (step === 3) {
    if (data.experience.length === 0)
      errors.push({ field: 'experience', message: "Kamida bitta ish tajribasini qo'shing" })
    else {
      if (!data.experience[0].jobTitle.trim()) errors.push({ field: 'exp-0-jobTitle', message: 'Lavozim kiritilishi shart' })
      if (!data.experience[0].company.trim()) errors.push({ field: 'exp-0-company', message: 'Kompaniya kiritilishi shart' })
    }
  }
  if (step === 4) {
    if (data.education.length === 0)
      errors.push({ field: 'education', message: "Kamida bitta ta'lim ma'lumotini qo'shing" })
    else if (!data.education[0].institution.trim())
      errors.push({ field: 'edu-0-institution', message: "O'quv yurti kiritilishi shart" })
  }
  return errors
}

// ── Factories ─────────────────────────────────────────────

export function genId(): string {
  return Math.random().toString(36).slice(2, 9)
}

export function emptyCV(): CVData {
  return {
    personal: {
      firstName: '', lastName: '', jobTitle: '',
      email: '', phone: '', city: '', dateOfBirth: '',
      website: '', linkedin: '', github: '', bio: '',
      photoUrl: null,
    },
    experience: [],
    education: [],
    skills: [],
    languages: [],
  }
}

export function newExp(): ExperienceItem {
  return {
    id: genId(), jobTitle: '', company: '', location: '',
    startDate: '', endDate: '', isCurrent: false, description: ''
  }
}

export function newEdu(): EducationItem {
  return { id: genId(), institution: '', degree: '', years: '', notes: '' }
}

export function newLang(): LanguageItem {
  return { id: genId(), name: '', level: 'B2' }
}

// ── Date helper ───────────────────────────────────────────

export function fmtDate(val: string): string {
  if (!val) return ''
  const d = new Date(val + 'T00:00:00')
  const M = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek']
  return `${M[d.getMonth()]} ${d.getFullYear()}`
}

export function fmtDob(val: string): string {
  if (!val) return ''
  const d = new Date(val)
  return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`
}
