<template>
  <div class="flex flex-col h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 relative">
    <!-- Left Sidebar: ClientPanel -->
    <ClientPanel
        v-model="showClientPanel"
        :client="selectedClient"
        @view-map="showIFSMap = true"
    />

    <!-- Top Header Bar -->
    <header class="flex items-center justify-between px-6 h-20 bg-slate-900/80 backdrop-blur border-b border-slate-700 z-20">
      <div class="flex items-center h-full">
        <img
            src="/images/logo2.png"
            alt="Helio Logo"
            class="h-16 object-contain"
        />
      </div>
      <div class="flex items-center gap-4 text-xl text-slate-200">
        <button
            @click="openSettings"
            title="Settings"
            class="hover:text-indigo-300 transition"
        >⚙️</button>
        <button
            @click="toggleMainMenu"
            title="Menu"
            class="hover:text-indigo-300 transition"
        >☰</button>
      </div>
    </header>

    <!-- Main Flex Layout -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Canvas Area -->
      <div class="flex-1 px-10 py-8 flex items-center justify-center overflow-hidden relative z-10">
        <div class="w-full max-w-5xl h-full bg-slate-800/30 rounded-3xl shadow-2xl backdrop-blur-xl border border-slate-500/20 p-10 relative">
          <div v-if="showIFSMap" class="w-full h-full flex items-center justify-center">
            <img
                src="/images/ifs-map.png"
                alt="IFS Map"
                class="max-h-full max-w-full object-contain border border-slate-600 rounded-lg"
            />
            <button
                @click="showIFSMap = false"
                class="absolute top-4 right-4 bg-slate-800/80 hover:bg-slate-700 text-white px-3 py-1 text-sm rounded shadow"
            >
              ✕ Close Map
            </button>
          </div>

          <HeliosCanvas v-else />

          <!-- Floating Message Input -->
          <div class="absolute bottom-6 left-6 right-6 flex items-center gap-3 bg-slate-900/80 backdrop-blur border border-slate-700 rounded-full px-4 py-2 shadow-lg z-40">
            <input
                v-model="messageText"
                type="text"
                placeholder="Type or speak..."
                class="flex-1 bg-slate-800 text-white placeholder-slate-400 rounded-full px-4 py-2 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <!-- Right Sidebar: Messaging or Tools -->
      <TherapistMessaging
          :messages="messages"
          @send="handleSend"
          class="w-80 bg-slate-900/80 border-l border-slate-700 p-4 overflow-y-auto"
      />
    </div>
  </div>
</template>

<script setup>
import ClientPanel from '@/components/ClientPanel.vue'
import HeliosCanvas from '@/components/HeliosCanvas.vue'
import TherapistMessaging from '@/components/TherapistMessaging.vue'

import { ref } from 'vue'

const showClientPanel = ref(true)
const selectedClient = ref(null)
const showIFSMap = ref(false)
const messageText = ref('')
const messages = ref([])

function handleSend(msg) {
  if (msg) {
    messages.value.push({ text: msg, sender: 'therapist' })
    messageText.value = ''
  }
}

function toggleMainMenu() {
  console.log("Toggle main menu clicked")
}

function openSettings() {
  console.log("Open settings clicked")
}
</script>

<style scoped>
/* Optional: Add scoped styling here if needed */
</style>
