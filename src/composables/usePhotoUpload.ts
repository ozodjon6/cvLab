import { ref } from 'vue'

export function usePhotoUpload() {
  const preview  = ref<string | null>(null)
  const loading  = ref(false)

  function read(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      if (!file.type.startsWith('image/'))
        return reject(new Error('Faqat rasm fayllari qabul qilinadi'))
      if (file.size > 5 * 1024 * 1024)
        return reject(new Error('Rasm 5MB dan kichik bo\'lishi kerak'))

      loading.value = true
      const reader = new FileReader()
      reader.onload = e => {
        const url = e.target?.result as string
        preview.value = url
        loading.value = false
        resolve(url)
      }
      reader.onerror = () => { loading.value = false; reject(new Error('O\'qishda xatolik')) }
      reader.readAsDataURL(file)
    })
  }

  function clear() { preview.value = null }

  return { preview, loading, read, clear }
}
