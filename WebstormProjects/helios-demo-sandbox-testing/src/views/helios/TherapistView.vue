<template>
  <div class="relative min-h-screen font-sans text-white overflow-x-hidden overflow-y-auto">

    <!-- Top Bar -->
    <div class="fixed top-0 left-0 right-0 h-14 bg-starlight flex items-center justify-between px-6 shadow z-40">

    <div class="flex items-center gap-3">
        <button @click="showLeftPanel = true" class="md:hidden p-2 rounded hover:bg-slate-800 text-white">
          ☰
        </button>
        <div class="text-lg font-semibold">Heliosynthesis</div>
      </div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-3 py-1.5 rounded-full shadow transition" title="Join Zoom">
          <VideoCameraIcon class="w-5 h-5" />
          <span>Zoom</span>
        </button>
        <button class="p-2 rounded-full hover:bg-slate-700 transition">
          <GlobeAltIcon class="w-5 h-5 text-slate-300" />
        </button>
        <img src="/images/therapist-profile.jpg" alt="Therapist" class="h-8 w-8 rounded-full object-cover" />
      </div>
    </div>

    <!-- Main Body -->
    <div class="pt-14 pb-16 flex flex-col md:flex-row min-h-screen">

      <!-- Left Sidebar (desktop) -->
      <div class="hidden md:block w-64 bg-starlight border-r border-slate-700 px-4 py-6 space-y-6 overflow-y-auto">



      <!-- Clients Dropdown -->
        <div>
          <div class="flex justify-between items-center mb-2">
            <button @click="showClients = !showClients" class="flex justify-between items-center text-xs uppercase text-faded w-full">
              <span>Clients</span>
              <span class="text-faded text-sm">{{ showClients ? '▲' : '▼' }}</span>
            </button>
            <button @click="showAddClientModal = true" class="text-faded text-lg hover:text-white ml-2 transition" title="Add Client">+</button>
          </div>
          <transition name="fade">
            <ul v-show="showClients" class="space-y-2 text-sm max-h-40 overflow-y-auto pr-1 text-slate-300 scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-transparent">
              <li v-for="(client, index) in clients" :key="index" @click="togglePanel" class="flex justify-between items-center cursor-pointer hover:text-accent group">
                <span>{{ client.name }}</span>
                <button @click.stop="removeClient(index)" class="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 text-xs transition-opacity" title="Remove Client">🗑</button>
              </li>
            </ul>
          </transition>
        </div>

        <!-- Sessions Dropdown -->
        <div>
          <button @click="showSessions = !showSessions" class="w-full flex justify-between items-center text-xs uppercase text-faded mb-2">
            Sessions
            <span class="text-faded text-sm">{{ showSessions ? '▲' : '▼' }}</span>
          </button>
          <transition name="fade">
            <ul v-show="showSessions" class="space-y-1 text-sm max-h-32 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-transparent">
              <li v-for="session in sessions" :key="session.date" class="cursor-pointer px-2 py-1 rounded hover:bg-indigo-600 hover:text-white transition text-slate-300">
                {{ session.label }}
              </li>
            </ul>
          </transition>
        </div>
      </div>

      <!-- Left Slide Panel (mobile) -->
      <transition name="slide-left">
        <div v-if="showLeftPanel" class="fixed top-14 bottom-16 left-0 w-64 bg-starlight border-r border-slate-700 p-4 z-50 shadow-lg">
top
        <button @click="showLeftPanel = false" class="text-sm text-faded mb-4">&larr; Back</button>
          <p class="text-lg font-semibold">Clients</p>
        </div>
      </transition>

      <!-- Main Canvas -->
      <div :class="['relative px-4 py-6 flex-1 overflow-y-auto transition-all bg-midnight', showPanel ? 'mr-80' : '']">
        <p class="italic text-faded mb-6">Is this a protector emerging?</p>

        <!-- Message Input -->
        <transition name="slide-fade">
          <div class="absolute bottom-6 left-4 transition-all duration-300 ease-in-out" :class="showPanel ? 'right-80' : 'right-4'">
            <div class="flex items-center gap-3 bg-midnight/70 border border-slate-700 rounded-full px-4 py-2 shadow backdrop-blur-md">
              <input v-model="message" type="text" placeholder="Speak or type here..." class="flex-1 bg-transparent text-white placeholder-faded focus:outline-none text-sm" />
              <button @click="sendMessage" class="p-2 rounded-full hover:bg-accent/20 transition">
                <MicrophoneIcon class="h-5 w-5 text-faded" />
              </button>
            </div>
          </div>
        </transition>

        <!-- Right Slide Panel -->
        <transition name="slide-fade">
          <div v-if="showPanel" class="fixed top-14 bottom-16 right-0 w-80 bg-slate border-l border-slate-700 p-6 z-50 shadow-lg">
            <button @click="togglePanel" class="text-sm text-faded mb-4">&larr; Close</button>
            <img src="/images/client-profile.jpg" class="h-16 w-16 rounded-full mb-2 object-cover" />
            <p class="text-lg font-semibold">Annie Wilson</p>
            <p class="text-sm text-faded">annie@example.com</p>
          </div>
        </transition>
      </div>
    </div>

    <!-- Bottom Bar -->
    <div class="fixed bottom-0 left-0 right-0 h-16 bg-slate flex items-center justify-between px-6 shadow-inner z-40">
      <div class="flex gap-4">
        <select class="bg-midnight text-white px-3 py-1 rounded text-sm">
          <option>IFS</option>
          <option>CBT</option>
          <option>EMDR</option>
          <option>Somatic</option>
          <option>Transactional Analysis</option>
        </select>
        <select class="bg-midnight text-white px-3 py-1 rounded text-sm">
          <option>Reflective</option>
          <option>Clinical</option>
          <option>Supervision</option>
        </select>
      </div>
      <div class="flex items-center gap-3">
        <span class="italic text-faded text-sm flex items-center gap-1">
          🪶 Whisper Mode
        </span>
        <span class="material-icons cursor-pointer">settings</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MicrophoneIcon } from '@heroicons/vue/24/outline'
import { VideoCameraIcon, GlobeAltIcon } from '@heroicons/vue/24/solid'

const showLeftPanel = ref(false)
const showClients = ref(false)
const showSessions = ref(false)
const showAddClientModal = ref(false)
const showPanel = ref(false)
const message = ref('')
const newClientName = ref('')

const clients = ref([
  { name: 'Annie Wilson' },
  { name: 'Ben Carter' },
  { name: 'Clara Lee' }
])

const sessions = ref([
  { label: 'July 9 - Check-in', date: '2025-07-09' },
  { label: 'July 2 - Processing', date: '2025-07-02' },
  { label: 'June 24 - Assessment', date: '2025-06-24' }
])

function togglePanel() {
  showPanel.value = !showPanel.value
}
function sendMessage() {
  if (message.value.trim()) {
    console.log("Message sent:", message.value)
    message.value = ''
  }
}
function removeClient(index) {
  if (confirm("Are you sure you want to remove this client?")) {
    clients.value.splice(index, 1)
  }
}
</script>

<style scoped>
.slide-left-enter-active,
.slide-left-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-left-enter-from,
.slide-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>



