<template>
  <div
      class="w-full absolute bottom-0 left-0 right-0 px-6 py-3 bg-helios-surface/90 border-t border-helios-background backdrop-blur-md flex items-center justify-between rounded-t-2xl shadow-2xl z-40">

    <!-- LEFT: Dropdowns -->
    <div class="flex items-center gap-4">
      <!-- Views -->
      <select v-model="selectedView"
              class="bg-helios-background text-helios-text text-sm px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-helios-accent1">
        <option disabled value="">Views</option>
        <option>CBT</option>
        <option>EMDR</option>
        <option>IFS</option>
        <option>Somatic</option>
        <option>Eclectic</option>
      </select>

      <!-- Mode -->
      <select v-model="selectedMode"
              class="bg-helios-background text-helios-text text-sm px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-helios-accent1">
        <option disabled value="">Mode</option>
        <option>Reflective</option>
        <option>Clinical</option>
        <option>Supervision</option>
      </select>
    </div>

    <!-- CENTER: Invite Heliosynthesis -->
    <div>
      <button @click="toggleHelios"
              class="text-helios-accent1 text-sm hover:text-helios-accent2 transition focus:outline-none font-medium">
        Invite Heliosynthesis
      </button>
    </div>

    <!-- RIGHT: Settings Icon -->
    <div class="cursor-pointer hover:text-helios-accent1 transition" @click="goToSettings">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0-6v2m0 16v2m10-10h-2M4 12H2m16.95 6.95l-1.414-1.414M6.464 6.464L5.05 5.05m0 13.9l1.414-1.414M18.364 5.636l1.414-1.414" />
      </svg>
    </div>

    <!-- AI Whisper -->
    <div class="absolute -top-8 left-6 text-helios-accent2 italic text-sm opacity-80 pointer-events-none">
      *Is this a protector emerging?*
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const selectedView = ref('')
const selectedMode = ref('')

const toggleHelios = () => {
  console.log('🌫 Helios invited')
  // In future: trigger AI whisper functionality
}

const goToSettings = () => {
  console.log('⚙️ Settings opened')
}
</script>
