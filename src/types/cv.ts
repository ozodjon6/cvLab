// ── Core types ────────────────────────────────────────────

export type TemplateId = 'modern' | 'clean' | 'bold' | 'minimal' | 'academic'
export type StepId = 1 | 2 | 3 | 4 | 5 | 6 | 7
export type LanguageLevel = 'Ona tili' | 'C2' | 'C1' | 'B2' | 'B1' | 'A2' | 'A1'

export interface PersonalInfo {
  firstName: string
  lastName: string
  jobTitle: string
  email: string
  phone: string
  city: string
  telegram: string
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
  location: string
  startDate: string
  endDate: string
  isCurrent: boolean
  notes: string
}

export interface ProjectItem {
  id: string
  name: string
  description: string
  link: string
  startDate: string
  endDate: string
}

export interface LanguageItem {
  id: string
  name: string
  level: LanguageLevel
}

export interface CVSettings {
  themeColor: string
  fontFamily: string
  sectionOrder: string[]
  isPublic?: boolean
  publicSlug?: string
}

export interface CVData {
  personal: PersonalInfo
  experience: ExperienceItem[]
  education: EducationItem[]
  projects: ProjectItem[]
  skills: string[]
  languages: LanguageItem[]
  settings?: CVSettings
}

// ── Step config ───────────────────────────────────────────

export interface BuilderStep {
  id: StepId
  labelKey: string
  descKey: string
}

export const BUILDER_STEPS: BuilderStep[] = [
  { id: 1, labelKey: 's1label', descKey: 's1desc' },
  { id: 2, labelKey: 's2label', descKey: 's2desc' },
  { id: 3, labelKey: 's3label', descKey: 's3desc' },
  { id: 4, labelKey: 's4label', descKey: 's4desc' },
  { id: 5, labelKey: 's5label', descKey: 's5desc' },
  { id: 6, labelKey: 's6label', descKey: 's6desc' },
  { id: 7, labelKey: 's7label', descKey: 's7desc' },
]

export const LANGUAGE_LEVELS: LanguageLevel[] = [
  'Ona tili', 'C2', 'C1', 'B2', 'B1', 'A2', 'A1',
]

// ── Validation ────────────────────────────────────────────

export interface ValidationError { field: string; messageKey: string }

export function validateStep(step: StepId, data: CVData): ValidationError[] {
  const errors: ValidationError[] = []
  if (step === 2) {
    if (!data.personal.firstName.trim()) errors.push({ field: 'firstName', messageKey: 'firstNameRequired' })
    if (!data.personal.lastName.trim()) errors.push({ field: 'lastName', messageKey: 'lastNameRequired' })
    if (!data.personal.jobTitle.trim()) errors.push({ field: 'jobTitle', messageKey: 'jobTitleRequired' })
  }
  if (step === 3) {
    // Experience validation removed
  }
  if (step === 4) {
    // Education validation removed
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
      email: '', phone: '', city: '', telegram: '',
      website: '', linkedin: '', github: '', bio: '',
      photoUrl: null,
    },
    experience: [],
    education: [],
    projects: [],
    skills: [],
    languages: [],
    settings: {
      themeColor: '#1A56DB', // Default blue
      fontFamily: 'Inter',
      sectionOrder: ['experience', 'education', 'projects', 'skills'],
      isPublic: false,
      publicSlug: ''
    }
  }
}

export function newExp(): ExperienceItem {
  return {
    id: genId(), jobTitle: '', company: '', location: '',
    startDate: '', endDate: '', isCurrent: false, description: ''
  }
}

export function newEdu(): EducationItem {
  return { id: genId(), institution: '', degree: '', location: '', startDate: '', endDate: '', isCurrent: false, notes: '' }
}

export function newProj(): ProjectItem {
  return { id: genId(), name: '', description: '', link: '', startDate: '', endDate: '' }
}

export function newLang(): LanguageItem {
  return { id: genId(), name: '', level: 'B2' }
}

// ── Date helper ───────────────────────────────────────────

export function fmtDate(val: string, months?: string[]): string {
  if (!val) return ''
  const M = months || ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'Iyn', 'Iyl', 'Avg', 'Sen', 'Okt', 'Noy', 'Dek']
  // Support YYYY-MM
  if (val.length === 7) {
    const d = new Date(val + '-01T00:00:00')
    return `${M[d.getMonth()]} ${d.getFullYear()}`
  }
  const d = new Date(val + 'T00:00:00')
  return `${M[d.getMonth()]} ${d.getFullYear()}`
}

export function fmtDob(val: string): string {
  if (!val) return ''
  const d = new Date(val)
  return `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`
}
