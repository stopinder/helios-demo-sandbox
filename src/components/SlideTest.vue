<template>
  <div>
    <button @click="show = !show" class="bg-blue-600 text-white p-2 m-4">
      Toggle Panel
    </button>

    <div
        class="fixed top-0 left-0 h-full w-64 bg-black text-white transition-transform duration-500 z-50"
        :class="show ? 'translate-x-0' : '-translate-x-full'"
    >
      <p class="p-4">Sliding Panel Content</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
const show = ref(false);
</script>
