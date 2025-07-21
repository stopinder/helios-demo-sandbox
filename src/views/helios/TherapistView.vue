<template>
  <div class="relative min-h-screen font-sans bg-midnight text-white overflow-x-hidden overflow-y-auto">
    <!-- Top Bar -->
    <div class="fixed top-0 left-0 right-0 h-14 bg-slate flex items-center justify-between px-6 shadow z-40">
      <div class="text-lg font-semibold">Heliosynthesis</div>
      <div class="flex items-center gap-3">
        <button class="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-3 py-1.5 rounded-full shadow transition" title="Join Zoom">
          <VideoCameraIcon class="w-5 h-5" />
          <span>Zoom</span>
          <button
              @click="currentView = 'calendar'"
              :class="['flex items-center gap-2 text-sm px-3 py-1.5 rounded-full transition', currentView === 'calendar' ? 'bg-indigo-700 text-white' : 'bg-slate-600 text-slate-200 hover:bg-slate-500']"
              title="Open Schedule"
          >
            📅 <span>Schedule</span>
          </button>

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
        <!-- [unchanged sidebar code] -->
        <!-- Calendar Access -->

      </div>

      <!-- Main Canvas -->
      <div class="flex-1 px-10 py-6 overflow-y-auto" :class="showPanel ? 'mr-[320px]' : ''">
        <!-- CALENDAR VIEW -->
        <div v-if="currentView === 'calendar'">
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-2xl font-semibold">Calendar</h2>
            <div class="space-x-2">
              <button class="bg-slate px-3 py-1 rounded" @click="goToToday">Today</button>
              <button class="bg-slate px-3 py-1 rounded" @click="toggleView">Week</button>
              <button class="bg-slate px-3 py-1 rounded" @click="currentView = 'resource'">Close</button>
            </div>
          </div>

          <div class="grid grid-cols-7 gap-2 border-t border-slate pt-2">
            <div v-for="day in days" :key="day" class="border-r pr-2">
              <h3 class="font-bold text-lg mb-2">{{ day }}</h3>
              <div
                  v-for="slot in timeSlots"
                  :key="slot"
                  class="hover:bg-midnight/50 p-2 rounded cursor-pointer"
                  @click="openAddDialog(day, slot)"
              >
                <div class="text-sm text-slate-400">{{ slot }}</div>
              </div>
            </div>
          </div>

          <!-- Appointment Dialog -->
          <div v-if="showAddDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-slate px-6 py-4 rounded-lg w-96 shadow-xl">
              <h3 class="text-xl font-semibold mb-4">{{ editingAppointment ? 'Edit' : 'New' }} Appointment</h3>
              <label class="block mb-2 text-sm">Client</label>
              <select class="w-full mb-3 p-2 rounded bg-midnight text-white">
                <option>Annie Smith</option>
                <option>Mark Evans</option>
              </select>
              <label class="block mb-2 text-sm">Time</label>
              <input type="datetime-local" class="w-full mb-3 p-2 rounded bg-midnight text-white" />
              <label class="block mb-2 text-sm">Notes</label>
              <textarea class="w-full p-2 rounded bg-midnight text-white mb-3"></textarea>
              <div class="flex justify-between">
                <button class="text-sm underline" @click="showAddDialog = false">Cancel</button>
                <button class="bg-white text-black px-4 py-1 rounded">Save</button>
              </div>
            </div>
          </div>
        </div>

        <!-- RESOURCE VIEW -->
        <div v-else-if="currentView === 'resource' && selectedResource">
          <div class="relative bg-slate-800 border border-slate-700 rounded-lg shadow-lg p-4 max-w-[1024px] mx-auto">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold text-white">{{ selectedResource.label }}</h2>
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

        <!-- TAGS -->
        <div class="bg-slate-800 rounded p-4 shadow mb-6">
          <p class="text-sm text-gray-300 mb-2">Session: "{{ session.summary }}"</p>
          <div class="flex flex-wrap">
            <TagBadge v-for="tag in session.tags" :key="tag.id" :tag="tag" />
          </div>
        </div>

        <!-- MESSAGE BAR -->
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

      <!-- Right Sidebar -->
      <!-- [unchanged right panel code] -->

    </div> <!-- End Main Body -->

    <!-- Bottom Bar -->
    <!-- [unchanged bottom bar code] -->
  </div>
</template>


<script setup>
import { ref } from 'vue'
import CalendarTrigger from '../../components/sidebar/CalendarTrigger.vue'
import { VideoCameraIcon, GlobeAltIcon, Cog6ToothIcon } from '@heroicons/vue/24/solid'
import { MicrophoneIcon, Bars3BottomLeftIcon } from '@heroicons/vue/24/outline'
import TagBadge from '../../components/TagBadge.vue'
import { sampleTags } from '../../data/sampleTags'

// 🔹 View and UI state
const currentView = ref('resource') // options: 'calendar', 'map', 'resource', etc.
const selectedResource = ref(null)

const showClients = ref(false)
const showSessions = ref(false)
const showTools = ref(false)
const showAddClientModal = ref(false)
const showPanel = ref(false)
const showExport = ref(false)
const selectedExportType = ref(null)

// 🔹 Message + Sidebar
const selectedClient = ref(null)
const selectedSessionIndex = ref(null)
const showPastSessions = ref(false)
const message = ref('')

// 🔹 Calendar Logic
const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const timeSlots = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00']

const showAddDialog = ref(false)
const editingAppointment = ref(false)

function openAddDialog(day, slot) {
  showAddDialog.value = true
  editingAppointment.value = false
}

function goToToday() {
  // TODO: Add logic to scroll to today's date
}

function toggleView() {
  // TODO: Add logic to switch between Week/Day view
}

// 🔹 Clients and Sessions
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

// 🔹 Sample session tags
const session = {
  id: 'demo1',
  summary: 'Worked with protector guarding exile. Solar themes active.',
  tags: [sampleTags[0], sampleTags[1], sampleTags[2]],
}

// 🔹 Event handlers
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
