import type { CVData } from './cv'
import { genId } from './cv'

export const exampleCVData: CVData = {
    personal: {
        firstName: 'Olim',
        lastName: 'Karimov',
        jobTitle: 'Senior Frontend Dasturchi',
        email: 'olim.karimov@email.com',
        phone: '+998 90 123 45 67',
        city: 'Toshkent',
        telegram: '@olim_karimov',
        website: 'olimkarimov.uz',
        linkedin: 'linkedin.com/in/okarimov',
        github: 'github.com/okarimov',
        bio: 'Tajribali va motivatsiyaga ega Frontend dasturchi. Zamonaviy web texnologiyalar, asosan Vue.js va React bo\'yicha 5 yildan ortiq tajribaga ega. Jamoada ishlash va murakkab muammolarni hal qilishda kuchli ko\'nikmalarga ega.',
        photoUrl: null
    },
    experience: [
        {
            id: genId(),
            jobTitle: 'Frontend Dasturchi',
            company: 'Tech Solutions LLC',
            location: 'Toshkent',
            startDate: '2020-03',
            endDate: '2023-08',
            isCurrent: true,
            description: '<ul><li>Katta hajmdagi korporativ web ilovalarni Vue.js va TypeScript yordamida yaratish.</li><li>UI/UX dizayn jamoasi bilan hamkorlikda ishlash.</li><li>Ilova ishlash tezligi va SEO ko\'rsatkichlarini yaxshilash.</li></ul>'
        },
        {
            id: genId(),
            jobTitle: 'Junior Dasturchi',
            company: 'Web Studio',
            location: 'Samarqand',
            startDate: '2018-09',
            endDate: '2020-02',
            isCurrent: false,
            description: '<ul><li>Landing sahifalar va kichik korporativ saytlarni yaratish.</li><li>HTML, CSS va JavaScript yordamida interaktiv interfeyslar tayyorlash.</li></ul>'
        }
    ],
    education: [
        {
            id: genId(),
            institution: 'Toshkent Axborot Texnologiyalari Universiteti',
            degree: 'Bakalavr - Dasturiy injiniring',
            location: 'Toshkent',
            startDate: '2014-09',
            endDate: '2018-06',
            isCurrent: false,
            notes: 'O\'rtacha baho: 4.5/5.0. Bir nechta xalqaro dasturlash olimpiadalarida qatnashgan.'
        }
    ],
    projects: [
        {
            id: genId(),
            name: 'E-commerce platformasi',
            description: 'Onlayn do\'kon uchun to\'liq frontend qismini Vue 3 va Pinia yordamida ishlab chiqish. To\'lov tizimlari bilan integratsiya o\'rnatish.',
            link: 'github.com/okarimov/ecommerce',
            startDate: '2022-01',
            endDate: '2022-06'
        }
    ],
    skills: ['Vue.js', 'React', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Git', 'Figma'],
    languages: [
        { id: genId(), name: 'O\'zbek tili', level: 'Ona tili' },
        { id: genId(), name: 'Rus tili', level: 'C1' },
        { id: genId(), name: 'Ingliz tili', level: 'B2' }
    ]
}
