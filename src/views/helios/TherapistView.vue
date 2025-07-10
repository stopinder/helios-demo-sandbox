<template>
  <div class="flex flex-col h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900 text-white relative">

    <!-- Top Bar -->
    <header class="h-16 flex items-center justify-between px-6 bg-slate-900/80 border-b border-slate-700 backdrop-blur z-10">
      <h1 class="text-xl font-semibold text-indigo-300">Heliosynthesis</h1>
      <div class="text-sm opacity-70">Therapist View</div>
    </header>

    <div class="flex flex-1 overflow-hidden">

      <!-- Slide-in Left Sidebar -->
      <aside
          v-if="selectedClient"
          class="w-80 bg-slate-800/90 backdrop-blur border-r border-slate-600 p-4 transition-transform duration-300 z-20"
      >
        <h2 class="text-lg font-bold mb-2">{{ selectedClient.name }}</h2>
        <p class="text-sm text-slate-300">{{ selectedClient.email }}</p>
        <p class="text-sm text-green-400 mt-2">{{ selectedClient.state }}</p>

        <div class="mt-4">
          <p class="text-sm mb-1">IFS Map Preview</p>
          <img
              src="/images/ifs-map.png"
              alt="IFS Map"
              class="w-full rounded border border-slate-600 cursor-pointer"
              @click="showIFSMap = true"
          />
        </div>
      </aside>

      <!-- Main Canvas -->
      <main class="flex-1 flex items-center justify-center p-8 relative">
        <div class="w-full max-w-5xl h-full bg-slate-800/30 border border-slate-600 rounded-2xl shadow-xl p-8 backdrop-blur">
          <div v-if="showIFSMap" class="w-full h-full flex items-center justify-center">
            <img
                src="/images/ifs-map.png"
                alt="IFS Map Full"
                class="max-h-full max-w-full object-contain rounded border border-slate-600"
            />
            <button
                @click="showIFSMap = false"
                class="absolute top-4 right-4 bg-slate-900 hover:bg-slate-700 text-white px-3 py-1 text-sm rounded"
            >
              ✕ Close Map
            </button>
          </div>
          <div v-else class="text-center text-slate-400">
            <p class="text-xl">Main Canvas Placeholder</p>
            <p class="text-sm opacity-50">This area will show editable content like the IFS map</p>
          </div>
        </div>
      </main>

      <!-- Fixed Right Sidebar -->
      <aside class="w-80 bg-slate-900/80 border-l border-slate-700 p-4 backdrop-blur z-10">
        <h3 class="text-sm font-semibold text-slate-300 mb-2">Client Search</h3>
        <input
            type="text"
            v-model="searchTerm"
            placeholder="Search clients..."
            class="w-full mb-4 p-2 rounded bg-slate-800 border border-slate-700 text-white placeholder-slate-500"
        />

        <ul class="space-y-2">
          <li
              v-for="client in filteredClients"
              :key="client.email"
              @click="selectClient(client)"
              class="cursor-pointer p-2 rounded hover:bg-slate-700"
          >
            <p class="font-medium">{{ client.name }}</p>
            <p class="text-xs text-slate-400">{{ client.email }}</p>
          </li>
        </ul>
      </aside>

    </div>

    <!-- Bottom Bar -->
    <footer class="h-10 bg-slate-900/70 border-t border-slate-700 text-xs text-center text-slate-400 flex items-center justify-center">
      Heliosynthesis © 2025
    </footer>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const searchTerm = ref('')
const selectedClient = ref(null)
const showIFSMap = ref(false)

const clients = ref([
  {
    name: 'Annie Wilson',
    email: 'annie@example.com',
    state: 'Stable, mildly anxious',
  },
  {
    name: 'Ben Carter',
    email: 'ben@example.com',
    state: 'Depressed, avoidant',
  },
  {
    name: 'Clara Lee',
    email: 'clara@example.com',
    state: 'In high activation',
  }
])

const filteredClients = computed(() =>
    clients.value.filter(c =>
        c.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
)

function selectClient(client) {
  selectedClient.value = client
  showIFSMap.value = false
}
</script>
