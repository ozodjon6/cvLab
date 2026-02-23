<template>
  <Teleport to="body">
    <div class="fixed bottom-6 right-6 z-[9999] flex flex-col gap-2 pointer-events-none">
      <TransitionGroup name="toast">
        <div
          v-for="t in toasts" :key="t.id"
          class="flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-white text-[13px] font-semibold
                 shadow-[0_6px_20px_rgba(0,0,0,.18)] max-w-xs pointer-events-auto cursor-pointer"
          :class="{
            'bg-emerald-500': t.type === 'success',
            'bg-red-500':     t.type === 'error',
            'bg-blue-brand':  t.type === 'info',
          }"
          @click="dismiss(t.id)"
        >
          <span>{{ { success: '✓', error: '✕', info: '⏳' }[t.type] }}</span>
          <span>{{ t.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { useToast } from '@/composables/useToast'
const { toasts, dismiss } = useToast()
</script>
