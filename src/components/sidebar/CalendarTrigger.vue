<template>
  <div @click="showCalendar" class="px-4 py-2 cursor-pointer hover:bg-slate-700 rounded">
    📅 Calendar
  </div>
</template>

<script setup>
const emit = defineEmits(['openCalendar'])

function showCalendar() {
  emit('openCalendar')
}
</script>
