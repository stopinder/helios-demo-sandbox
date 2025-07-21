<template>
  <div class="relative min-h-screen font-sans bg-midnight text-white overflow-x-hidden overflow-y-auto">
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
    <div class="pt-14 pb-16 h-full flex">
      <!-- Left Sidebar -->
      <div class="w-64 bg-midnight/80 border-r border-slate-700 px-4 py-6 overflow-y-auto space-y-6">
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
              <li
                  v-for="(client, index) in clients"
                  :key="index"
                  @click="openClientPanel(client)"
                  class="flex justify-between items-center cursor-pointer hover:text-accent group"
              >
                <span>{{ client.name }}</span>
                <button @click.stop="removeClient(index)" class="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-500 text-xs transition-opacity">🗑</button>
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
        <!-- Therapist Map Access -->
        <div>
          <button
              @click="currentView = 'map'"
              class="w-full flex items-center gap-2 text-xs uppercase text-faded hover:text-white transition"
          >
            🧭 My Map
          </button>
        </div>

        <!-- Therapist Tools / Resources -->
        <div>
          <button @click="showTools = !showTools" class="flex justify-between items-center text-xs uppercase text-faded w-full">
            <span>Resources</span>
            <span class="text-sm">{{ showTools ? '▲' : '▼' }}</span>
          </button>
          <transition name="fade">
            <ul v-show="showTools" class="mt-2 space-y-2 text-sm text-slate-300">
              <li class="cursor-pointer hover:text-white" @click="assignResource('video', 'Polyvagal Basics')">🎥 Polyvagal Basics</li>
              <li class="cursor-pointer hover:text-white" @click="assignResource('audio', 'Grounding Breath')">🎧 Grounding Breath</li>
              <li class="cursor-pointer hover:text-white" @click="assignResource('emdr', 'Bilateral Tones')">🔁 Bilateral Tones</li>
              <li class="cursor-pointer hover:text-white" @click="assignResource('prompt', 'Parts Mapping Guide')">🌀 Parts Mapping Guide</li>
              <li class="cursor-pointer hover:text-white" @click="assignResource('cbt', 'Thought Record Sheet')">🧠 CBT Thought Sheet</li>
            </ul>
          </transition>
        </div>

        <!-- Calendar Access -->
        <CalendarTrigger @openCalendar="handleOpenCalendar" />
      </div>

      <!-- Main Canvas -->
      <div class="flex-1 px-10 py-6 overflow-y-auto" :class="showPanel ? 'mr-[320px]' : ''">
        <div v-if="currentView === 'resource' && selectedResource">
          <div class="relative bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-4 max-w-[1024px] mx-auto">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold text-white">
                {{ selectedResource.label }}
              </h2>
              <button
                  @click="sendResourceToClient"
                  class="text-sm text-indigo-400 hover:text-white border border-indigo-500 px-3 py-1 rounded transition"
              >
                Send to Client →
              </button>
            </div>

            <div v-if="selectedResource.type === 'video'" class="aspect-w-16 aspect-h-9 mb-4">
              <iframe
                  :src="getYouTubeEmbedUrl(selectedResource.label)"
                  frameborder="0"
                  allowfullscreen
                  class="w-full h-[360px] rounded"
              ></iframe>
            </div>

            <p class="text-sm text-faded">
              (This is a demo preview. Clients will receive a link or embedded player.)
            </p>
          </div>
        </div>

        <!-- Tag Area -->
          <div class="bg-slate-800 rounded p-4 shadow mb-6">
            <p class="text-sm text-gray-300 mb-2">Session: "{{ session.summary }}"</p>
            <div class="flex flex-wrap">
              <TagBadge v-for="tag in session.tags" :key="tag.id" :tag="tag" />
            </div>
          </div>

          <!-- Message Bar -->
          <div class="fixed bottom-16 left-64" :class="showPanel ? 'right-[320px]' : 'right-0'">
            <div class="mx-10 flex items-center gap-3 bg-midnight/70 border border-slate-700 rounded-full px-4 py-2 shadow backdrop-blur-md">
              <input
                  v-model="message"
                  type="text"
                  placeholder="Speak or type here..."
                  class="flex-1 bg-transparent text-white placeholder-faded focus:outline-none text-sm"
              />
              <button @click="sendMessage" class="p-2 rounded-full hover:bg-accent/20 transition">
                <MicrophoneIcon class="h-5 w-5 text-faded" />
              </button>
            </div>
          </div>
        </div>
      </div>



      <!-- Right Sidebar -->
      <transition name="slide-fade">
        <div v-if="showPanel" class="fixed top-14 bottom-16 right-0 w-[320px] bg-slate border-l border-slate-700 p-6 z-50 shadow-lg overflow-y-auto">
          <button @click="togglePanel" class="text-sm text-faded mb-4">&larr; Close</button>

          <img src="/images/annie.jpg" class="w-12 h-12 rounded-full mx-auto object-cover mb-2" alt="Client face" />
          <div class="text-center mb-6">
            <p class="text-lg font-semibold">Annie Wilson</p>
            <p class="text-sm text-faded">annie@example.com</p>
          </div>

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


    <!-- Bottom Bar -->
    <div class="fixed bottom-0 left-0 right-0 h-16 bg-slate flex items-center justify-between px-6 shadow-inner z-40">
      <div class="flex gap-4">
        <select class="bg-midnight text-white px-3 py-1 rounded text-sm">
          <option>IFS</option>
          <option>CBT</option>
          <option>EMDR</option>
        </select>
        <select class="bg-midnight text-white px-3 py-1 rounded text-sm">
          <option>Reflective</option>
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
  </div> <!-- closes the main pt-14 pb-16 h-full flex wrapper -->


</template>

<script setup>
import { ref } from 'vue'
import CalendarTrigger from '../../components/sidebar/CalendarTrigger.vue'
import { VideoCameraIcon, GlobeAltIcon, Cog6ToothIcon } from '@heroicons/vue/24/solid'
import { MicrophoneIcon, Bars3BottomLeftIcon } from '@heroicons/vue/24/outline'
import TagBadge from '../../components/TagBadge.vue'
import { sampleTags } from '../../data/sampleTags'

// View and state controls
const currentView = ref(null) // 'calendar', 'map', 'resource', etc.
const selectedResource = ref(null)

// Dropdowns and UI toggles
const showClients = ref(false)
const showSessions = ref(false)
const showTools = ref(false)
const showAddClientModal = ref(false)
const showPanel = ref(false)

// Client and session data
const selectedClient = ref(null)
const selectedSessionIndex = ref(null)
const showPastSessions = ref(false)
const message = ref('')

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
    summary: 'Annie shared difficulty with boundaries. Protector noted.',
  },
  {
    date: '2025-07-02',
    label: 'July 2 – Processing',
    summary: 'Explored teenage burden; grounding effective.',
  }
])

// Sample session tags
const session = {
  id: 'demo1',
  summary: 'Worked with protector guarding exile. Solar themes active.',
  tags: [sampleTags[0], sampleTags[1], sampleTags[2]],
}

// Event handlers
function handleOpenCalendar() {
  currentView.value = 'calendar'
}

function assignResource(type, label) {
  selectedResource.value = { type, label }
  currentView.value = 'resource'
  console.log(`Assigned ${type}: ${label}`)
}

function getYouTubeEmbedUrl(label) {
  if (label === 'Polyvagal Basics') {
    return 'https://www.youtube.com/embed/BRcLtewujf8'
  }
  return ''
}

function openClientPanel(client) {
  selectedClient.value = client.name
  showPanel.value = true
}

function togglePanel() {
  showPanel.value = !showPanel.value
}

function removeClient(index) {
  if (confirm("Remove this client?")) {
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