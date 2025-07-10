<template>
<<<<<<< HEAD
  <div class="flex flex-col h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-slate-100 relative">

    <!-- Left Sidebar: ClientPanel -->
    <ClientPanel
        :modelValue="showClientPanel"
        :client="selectedClient"
        @update:modelValue="showClientPanel = $event"
        @view-map="showIFSMap = true"
    />

    <!-- Top Header Bar -->
    <header class="flex items-center justify-between px-6 h-20 bg-slate-900/80 backdrop-blur border-b border-slate-700 z-20">
      <div class="flex items-center h-full">
        <img src="/images/logo2.png" alt="Helio Logo" class="h-48 object-contain" style="margin-top: 125px; margin-left: 664px;" />
      </div>
      <div class="flex items-center gap-4 text-xl text-slate-200">
        <button @click="openSettings" title="Settings" class="hover:text-indigo-300 transition">⚙️</button>
        <button @click="toggleMainMenu" title="Menu" class="hover:text-indigo-300 transition">☰</button>
      </div>
    </header>

    <!-- Main Flex Layout -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Canvas Area -->
      <div class="flex-1 px-10 py-8 flex items-center justify-center overflow-hidden relative z-10">
        <div class="w-full max-w-5xl h-full bg-slate-800/30 rounded-3xl shadow-2xl backdrop-blur-xl border border-slate-500/20 p-10 relative">

          <div v-if="showIFSMap" class="w-full h-full flex items-center justify-center">
            <img src="/images/ifs-map.png" alt="IFS Map" class="max-h-full max-w-full object-contain border border-slate-600 rounded-lg" />
            <button @click="showIFSMap = false" class="absolute top-4 right-4 bg-slate-800/80 hover:bg-slate-700 text-white px-3 py-1 text-sm rounded shadow">
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
                class="flex-1 bg-transparent text-white placeholder-slate-400 outline-none text-sm"
                @keyup.enter="sendMessage"
            />
            <button @click="sendMessage" class="text-indigo-400 hover:text-indigo-300 transition">
              <MicrophoneIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <aside class="w-80 flex flex-col bg-slate-900/40 backdrop-blur-md border-l border-slate-500/20 shadow-lg relative z-10">
        <div class="p-6 flex-1 overflow-y-auto custom-scrollbar space-y-6">
          <!-- Other panels (Zoom, Schedule, etc.)... -->
          <!-- 6. Messaging -->
          <div class="bg-slate-800/50 rounded-lg p-3 shadow border border-slate-600">
            <details open class="group">
              <summary class="cursor-pointer font-medium text-slate-200 hover:text-indigo-300">💬 Messages</summary>
              <div class="pt-2 text-sm text-slate-100">
                <TherapistMessaging />
              </div>
            </details>
          </div>
          <div class="mt-auto pt-4"></div>
        </div>
      </aside>
    </div>

    <!-- Footer, Notification, Prompt Boxes... (unchanged) -->

=======
  <div class="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-black text-white relative">

    <!-- Floating Right Toolbar -->
    <div class="absolute top-4 right-4 space-y-3 z-50">
      <button class="w-full px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700/90 text-sm shadow-lg border border-white/10 transition">
        Join Zoom Session
      </button>

      <select class="w-full px-4 py-2 rounded-xl bg-slate-800/80 text-sm text-white border border-white/10 focus:outline-none shadow-lg">
        <option disabled selected>Manage Schedule</option>
        <option>View Appointments</option>
        <option>Reschedule</option>
        <option>Cancel Session</option>
      </select>
    </div>

    <!-- Main Content Area -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left Sidebar -->
      <HeliosContextSidebar
          :isOpen="sidebarOpen"
          @toggle="toggleSidebar"
          @renderMap="showIFSMap = true"
      />

      <!-- Main Canvas -->
      <main class="flex-1 p-8 overflow-y-auto">
        <h2 class="text-3xl font-semibold text-white mb-6">Therapist View</h2>

        <div class="w-full h-[500px] bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl shadow-xl flex items-center justify-center transition-all duration-300">
          <template v-if="showIFSMap">
            <img src="/images/ifs-map.png" alt="IFS Map Full" class="h-full object-contain rounded-xl" />
          </template>
          <template v-else>
            <span class="text-white/50 text-lg">Main Canvas — Select a Client to Begin</span>
          </template>
        </div>
      </main>
    </div>

    <!-- Bottom Toolbar -->
    <footer class="h-16 flex items-center justify-end gap-4 px-8 bg-slate-900/80 border-t border-white/10 backdrop-blur-md">
      <!-- Lens Dropdown -->
      <select class="bg-slate-800/70 border border-white/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none shadow-md">
        <option selected>Clinical Reflective Supervision</option>
      </select>

      <!-- Mode Dropdown -->
      <select class="bg-slate-800/70 border border-white/20 rounded-xl px-4 py-2 text-sm text-white focus:outline-none shadow-md">
        <option disabled selected>Select Mode</option>
        <option>IFS</option>
        <option>CBT</option>
        <option>Somatic</option>
        <option>EMDR</option>
        <option>Eclectic</option>
      </select>
    </footer>
>>>>>>> 378c04c (Initial push of Helios sandbox)
  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref, watch, computed } from 'vue';
import { MicrophoneIcon } from '@heroicons/vue/24/solid';
import TherapistMessaging from '@/components/TherapistMessaging.vue';
import ClientPanel from '@/components/ClientPanel.vue';
import HeliosCanvas from '@/components/HeliosCanvas.vue';

const clientSearch = ref('');
const showClientPanel = ref(false);
const selectedClient = ref(null);
const selectedLens = ref('Eclectic');
const showIFSMap = ref(false);
const messageText = ref('');

const clients = ref([
  { id: '001', name: 'Aria Rose', nextSession: '2025-07-10 10:00', email: 'aria.rose@email.com', notes: 'Recent progress with anxiety management' },
  { id: '002', name: 'Jonas Elm', nextSession: '2025-07-08 14:00', email: 'jonas.elm@email.com', notes: 'Working on stress reduction techniques' },
]);

const filteredClients = computed(() => {
  const search = clientSearch.value.toLowerCase().trim();
  return !search ? [] : clients.value.filter(c => c.name.toLowerCase().includes(search));
});

const selectClient = (client) => {
  selectedClient.value = client;
  showClientPanel.value = true;
};

const sendMessage = () => {
  if (messageText.value.trim()) {
    console.log("Send message:", messageText.value);
    messageText.value = '';
  }
};
</script>

<style scoped>
.transition {
  transition: all 0.3s ease;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
=======
import { ref } from 'vue'
import HeliosContextSidebar from '../../components/HeliosContextSidebar.vue'

const sidebarOpen = ref(true)
const showIFSMap = ref(false)

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}
</script>


>>>>>>> 378c04c (Initial push of Helios sandbox)
