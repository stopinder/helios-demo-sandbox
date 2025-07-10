<template>
  <div class="flex h-screen w-full bg-slate-900 text-white">
    <!-- Left Sidebar -->
    <aside class="w-64 bg-slate-800 p-4 border-r border-slate-700 hidden md:flex flex-col">
      <h2 class="text-lg font-semibold mb-4">Clients</h2>
      <input
          v-model="searchTerm"
          placeholder="Search..."
          class="mb-4 p-2 rounded bg-slate-700 text-white placeholder-slate-400"
      />
      <ul class="space-y-2 overflow-y-auto">
        <li
            v-for="client in filteredClients"
            :key="client.email"
            @click="selectClient(client)"
            class="p-2 rounded hover:bg-slate-600 cursor-pointer"
        >
          {{ client.name }}
        </li>
      </ul>
    </aside>

    <!-- Main Canvas -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <HeliosCanvas />
    </main>

    <!-- Right Sidebar -->
    <aside class="w-80 bg-slate-800 p-4 border-l border-slate-700 hidden lg:flex flex-col">
      <h2 class="text-lg font-semibold mb-4">Client Details</h2>
      <div v-if="selectedClient">
        <p class="mb-1"><strong>Name:</strong> {{ selectedClient.name }}</p>
        <p class="mb-1"><strong>Email:</strong> {{ selectedClient.email }}</p>
        <p class="mb-1"><strong>State:</strong> {{ selectedClient.state }}</p>

      </div>
      <div v-else class="text-slate-400">Select a client to view their details.</div>
    </aside>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import HeliosCanvas from '../../components/HeliosCanvas.vue'

const searchTerm = ref('')
const selectedClient = ref(null)

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
}
</script>
