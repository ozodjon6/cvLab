<template>
  <div class="flex items-center flex-1 min-w-0">
    <template v-for="(s, i) in BUILDER_STEPS" :key="s.id">
      <button
        class="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold
               transition-all duration-300 whitespace-nowrap shrink-0 cursor-default"
        :class="{
          'bg-blue-light text-blue-brand cursor-pointer': current === s.id,
          'text-emerald-500': isDone(s.id),
          'text-gray-400':   !isDone(s.id) && current !== s.id,
        }"
        :disabled="s.id > maxReached"
        @click="s.id <= maxReached && emit('goto', s.id)"
      >
        <span
          class="w-[18px] h-[18px] rounded-full flex items-center justify-center text-[10px] font-bold
                 transition-all duration-300 shrink-0"
          :class="{
            'bg-blue-brand text-white':   current === s.id,
            'bg-emerald-500 text-white':  isDone(s.id),
            'bg-gray-200 text-gray-400':  !isDone(s.id) && current !== s.id,
          }"
        >{{ isDone(s.id) ? '✓' : s.id }}</span>
        <span class="hidden sm:inline">{{ s.label }}</span>
      </button>

      <div v-if="i < BUILDER_STEPS.length - 1"
           class="flex-1 h-px bg-gray-200 mx-0.5 min-w-[4px]" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { BUILDER_STEPS } from '@/types/cv'
import type { StepId } from '@/types/cv'

const props = defineProps<{ current: StepId; maxReached: StepId }>()
const emit  = defineEmits<{ goto: [s: StepId] }>()
const isDone = (id: StepId) => id < props.current
</script>
