<template>
  <div class="relative h-screen font-sans bg-midnight text-white overflow-hidden">
    <!-- Top Bar -->
    <div class="fixed top-0 left-0 right-0 h-14 bg-slate flex items-center justify-between px-6 shadow z-40">
      <div class="text-lg font-semibold">Heliosynthesis</div>
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
    <div class="pt-14 pb-16 h-full flex overflow-hidden">
      <!-- Left Sidebar -->
      <div class="w-64 bg-slate/90 border-r border-slate-700 px-4 py-6 overflow-y-auto space-y-6">
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

      <!-- Main Canvas -->
      <div class="flex-1 relative px-10 py-6 overflow-y-auto">
        <p class="italic text-faded mb-6">Is this a protector emerging?</p>
        <div class="absolute bottom-6 transition-all duration-200" :class="showPanel ? 'left-10 right-[350px]' : 'left-10 right-10'">
          <div class="flex items-center gap-3 bg-midnight/70 border border-slate-700 rounded-full px-4 py-2 shadow backdrop-blur-md">
            <input v-model="message" type="text" placeholder="Speak or type here..." class="flex-1 bg-transparent text-white placeholder-faded focus:outline-none text-sm" />
            <button @click="sendMessage" class="p-2 rounded-full hover:bg-accent/20 transition">
              <MicrophoneIcon class="h-5 w-5 text-faded" />
            </button>
          </div>
        </div>
      </div>

      <!-- Right Slide Panel -->
      <transition name="slide-fade">
        <div v-if="showPanel" class="fixed top-14 bottom-16 right-0 w-80 bg-slate border-l border-slate-700 p-6 z-50 shadow-lg overflow-y-auto">
          <button @click="togglePanel" class="text-sm text-faded mb-4">&larr; Close</button>
          <img src="/images/ifs-map.png" class="w-48 h-auto mx-auto rounded-md cursor-pointer mb-5 object-contain" @click="showMap = true" />
          <div class="text-center mb-6">
            <p class="text-lg font-semibold">Annie Wilson</p>
            <p class="text-sm text-faded">annie@example.com</p>
          </div>
          <!-- Collapsible Past Sessions -->
          <div>
            <button @click="showPastSessions = !showPastSessions" class="w-full flex justify-between items-center text-xs uppercase text-faded tracking-wide mb-2">
              Past Sessions
              <span class="text-faded text-sm">{{ showPastSessions ? '▲' : '▼' }}</span>
            </button>
            <transition name="fade">
              <div v-show="showPastSessions">
                <input type="text" placeholder="Search..." class="w-full px-3 py-1.5 mb-3 rounded bg-slate-700 text-sm placeholder-faded text-white focus:outline-none" />
                <ul class="max-h-32 overflow-y-auto pr-1 space-y-1 text-sm scrollbar-thin scrollbar-thumb-slate-500 scrollbar-track-transparent">
                  <li v-for="(session, index) in pastSessions" :key="session.date" @click="selectedSessionIndex = index" class="cursor-pointer px-2 py-1 rounded hover:bg-indigo-600 hover:text-white transition text-slate-300">
                    {{ session.label }}
                  </li>
                </ul>
                <p v-if="selectedSessionIndex !== null" class="mt-4 text-sm italic text-faded leading-snug">
                  {{ pastSessions[selectedSessionIndex].summary }}
                </p>
              </div>
            </transition>
          </div>
        </div>
      </transition>
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
      <div class="flex items-center gap-8">
        <span class="flex items-center gap-1 cursor-pointer text-faded italic text-sm font-inter">
          <Bars3BottomLeftIcon class="h-4 w-4 text-faded" />
          Whisper Mode
        </span>
        <Cog6ToothIcon class="h-5 w-5 text-faded cursor-pointer" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VideoCameraIcon, GlobeAltIcon, Cog6ToothIcon } from '@heroicons/vue/24/solid'
import { MicrophoneIcon, Bars3BottomLeftIcon } from '@heroicons/vue/24/outline'

const showClients = ref(false)
const showSessions = ref(false)
const showAddClientModal = ref(false)
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

const pastSessions = ref([
  {
    date: '2025-07-09',
    label: 'July 9 – Check-in',
    summary: 'Annie shared ongoing difficulty with boundary-setting. Protector dynamics were gently acknowledged.'
  },
  {
    date: '2025-07-02',
    label: 'July 2 – Processing',
    summary: 'Explored burden carried since adolescence; moderate emotional intensity with grounding at end.'
  },
  {
    date: '2025-06-24',
    label: 'June 24 – Assessment',
    summary: 'Initial mapping of protectors and exiles. Identified resistance to inner attention.'
  }
])

const selectedSessionIndex = ref(null)
const showPanel = ref(false)
const showMap = ref(false)
const openDataModule = ref(false)
const showPastSessions = ref(false)
const message = ref('')

function togglePanel() {
  showPanel.value = !showPanel.value
}

function addClient() {
  const name = newClientName.value.trim()
  if (name) {
    clients.value.push({ name })
    newClientName.value = ''
    showAddClientModal.value = false
  }
}

function removeClient(index) {
  if (confirm("Are you sure you want to remove this client?")) {
    clients.value.splice(index, 1)
  }
}

function sendMessage() {
  if (message.value.trim()) {
    console.log("Message sent:", message.value)
    message.value = ''
  }
}
</script>
