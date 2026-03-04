<template>
  <div class="rich-editor-container">
    <div class="editor-toolbar">
      <button type="button" @click="format('bold')" title="Bold (Qalin)"><b>B</b></button>
      <button type="button" @click="format('italic')" title="Italic (Qiya)"><i>I</i></button>
      <button type="button" @click="format('underline')" title="Underline (Tagi chizilgan)"><u>U</u></button>
      <div class="divider"></div>
      <button type="button" @click="format('insertUnorderedList')" title="Bullet List (Nuqtali ro'yxat)">• Ro'yxat</button>
      <button type="button" @click="format('insertOrderedList')" title="Numbered List (Raqamli ro'yxat)">1. Ro'yxat</button>
    </div>
    <div
      ref="editorRef"
      class="editor-content input-base"
      contenteditable="true"
      @input="onInput"
      @blur="onBlur"
      v-html="initialValue"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const editorRef = ref<HTMLElement | null>(null)
const initialValue = ref(props.modelValue)

watch(() => props.modelValue, (newVal) => {
  if (editorRef.value && newVal !== editorRef.value.innerHTML) {
    editorRef.value.innerHTML = newVal
  }
})

function format(command: string) {
  document.execCommand(command, false)
  editorRef.value?.focus()
  emitValue()
}

function onInput() {
  emitValue()
}

function onBlur() {
  emitValue()
}

function emitValue() {
  if (!editorRef.value) return
  let html = editorRef.value.innerHTML
  if (html === '<br>') html = ''
  emit('update:modelValue', html)
}
</script>

<style scoped>
.rich-editor-container {
  border: 1px solid #e5e7eb;
  border-radius: 6px;
  overflow: hidden;
  background: #fff;
}
.editor-toolbar {
  display: flex;
  gap: 4px;
  padding: 6px 8px;
  background: #f9fafb;
  border-bottom: 1px solid #e5e7eb;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}
.editor-toolbar::-webkit-scrollbar {
  height: 4px;
}
.editor-toolbar::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 4px;
}
.editor-toolbar button {
  padding: 4px 8px;
  font-size: 12px;
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  color: #374151;
  transition: all 0.2s;
}
.editor-toolbar button:hover {
  background: #e5e7eb;
}
.divider {
  width: 1px;
  background: #d1d5db;
  margin: 2px 4px;
}
.editor-content {
  min-height: 100px;
  max-height: 300px;
  overflow-y: auto;
  padding: 10px 12px;
  outline: none;
  font-size: 13px;
  border: none !important;
  color: #1f2937;
}
.editor-content:empty:before {
  content: attr(placeholder);
  color: #9ca3af;
  pointer-events: none;
}
/* Basic list styles for editor content */
:deep(.editor-content ul) {
  list-style-type: disc;
  margin-left: 1.5rem;
}
:deep(.editor-content ol) {
  list-style-type: decimal;
  margin-left: 1.5rem;
}
</style>
