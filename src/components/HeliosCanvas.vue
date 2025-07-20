<template>
  <div class="flex flex-col h-full w-full overflow-hidden bg-helios-gradient text-helios-text relative">

    <!-- Chat Display Area -->
    <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar pb-36">
      <div class="text-helios-text text-base opacity-80">Begin your reflection.</div>
      <div class="space-y-2">
        <div class="bg-helios-surface px-4 py-3 rounded-2xl max-w-md">
          I've been noticing more anxiety when I'm alone lately.
        </div>
        <div class="bg-helios-accent1 text-helios-background px-4 py-3 rounded-2xl max-w-md self-end ml-auto">
          That makes sense given what we explored last week. What's it like right now?
        </div>
        <div class="bg-helios-surface px-4 py-3 rounded-2xl max-w-md">
          It feels like a tightening in my chest. Hard to breathe sometimes.
        </div>
      </div>
    </div>

    <!-- Message Input -->
    <div class="absolute bottom-16 left-0 right-0 px-6 py-3">
      <div class="flex items-center gap-3 bg-helios-surface/80 backdrop-blur-md px-4 py-3 rounded-xl shadow">
        <input
            v-model="message"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Speak or type here..."
            aria-label="Message input"
            class="flex-1 bg-helios-background text-helios-text rounded-full px-4 py-3 placeholder-helios-accent2 focus:outline-none focus:ring-2 focus:ring-helios-accent1 hover:bg-opacity-90 shadow transition"
        />
        <button
            @click="sendMessage"
            aria-label="Send voice message"
            class="p-2 bg-helios-accent1 hover:bg-helios-accent2 text-helios-background rounded-full shadow transition"
        >
          <MicrophoneIcon class="h-5 w-5" />
        </button>
      </div>
    </div>

    <!-- Fixed Bottom Bar -->
    <div class="absolute bottom-0 left-0 right-0 px-6 py-2 bg-helios-surface/90 border-t border-helios-background backdrop-blur-md flex items-center justify-between shadow-inner">

      <!-- Dropdowns -->
      <div class="flex gap-4 items-center">
        <!-- Views -->
        <select v-model="selectedView" class="bg-helios-background text-helios-text px-3 py-2 rounded shadow focus:outline-none">
          <option disabled value="">Views</option>
          <option>CBT</option>
          <option>EMDR</option>
          <option>IFS</option>
          <option>Somatic</option>
          <option>Eclectic</option>
        </select>

        <!-- Mode -->
        <select v-model="selectedMode" class="bg-helios-background text-helios-text px-3 py-2 rounded shadow focus:outline-none">
          <option disabled value="">Mode</option>
          <option>Reflective</option>
          <option>Clinical</option>
          <option>Supervision</option>
        </select>
      </div>

      <!-- Settings -->
      <div class="cursor-pointer hover:text-helios-accent1 transition" @click="goToSettings">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0-6v2m0 16v2m10-10h-2M4 12H2m16.95 6.95l-1.414-1.414M6.464 6.464L5.05 5.05m0 13.9l1.414-1.414M18.364 5.636l1.414-1.414" />
        </svg>
      </div>

    </div>

  </div>
  <BottomBar />
</template>

<script setup>
import { ref } from 'vue'
import BottomBar from '../components/BottomBar.vue'

import { MicrophoneIcon } from '@heroicons/vue/24/solid'

const message = ref('')
const selectedView = ref('')
const selectedMode = ref('')

const sendMessage = () => {
  if (!message.value.trim()) return
  console.log('📤 Sent message:', message.value)
  message.value = ''
}

const goToSettings = () => {
  console.log('⚙️ Settings clicked')
}
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
</style>

