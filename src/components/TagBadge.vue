<template>
  <span
      class="inline-block text-xs text-white rounded-full px-2 py-0.5 mr-1 mb-1"
      :class="tag.color || 'bg-slate-600'"
  >
    {{ tag.name }}
  </span>
</template>

<script setup lang="ts">
import type { Tag } from '../../types/tags'
defineProps<{ tag: Tag }>()
</script>
