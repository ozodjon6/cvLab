<template>
  <div class="flex items-center font-display font-bold tracking-tight" :class="sizeClass">
    <span class="text-navy-800 relative pr-[9px]
                 after:content-[''] after:absolute after:right-0 after:top-[18%] after:bottom-[18%]
                 after:w-[1.5px] after:bg-blue-brand after:opacity-30">cv</span>
    <span class="text-blue-brand font-light pl-[9px] tracking-wide">Lab</span>
    <span class="bg-blue-brand rounded-full ml-0.5 mb-3 flex-shrink-0 inline-block"
          :class="dotClass" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{ size?: 'sm' | 'md' | 'lg' }>(), { size: 'md' })
const sizeClass = computed(() => ({ sm: 'text-[17px]', md: 'text-[20px]', lg: 'text-[24px]' }[props.size]))
const dotClass  = computed(() => ({ sm: 'w-[3px] h-[3px]', md: 'w-1 h-1', lg: 'w-1.5 h-1.5' }[props.size]))
</script>
