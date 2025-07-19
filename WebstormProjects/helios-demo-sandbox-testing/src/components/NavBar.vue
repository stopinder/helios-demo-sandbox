<template>
  <nav class="bg-white shadow px-6 py-4 flex items-center justify-between">
    <h1 class="text-xl font-semibold text-purple-600">Heliosandbox</h1>

    <div class="space-x-4">
      <router-link to="/" class="text-gray-700 hover:text-purple-600">Home</router-link>
      <router-link to="/client-view" class="text-gray-700 hover:text-purple-600">Client View</router-link>
      <router-link to="/clinician-view" class="text-gray-700 hover:text-purple-600">Clinician View</router-link>
      <router-link to="/reflective-chat" class="text-gray-700 hover:text-purple-600">Chat</router-link>
      <router-link to="/ifs-map" class="text-gray-700 hover:text-purple-600">IFS Map</router-link>
      <router-link to="/cbt-map" class="text-gray-700 hover:text-purple-600">CBT Map</router-link>
      <router-link to="/emdr-map" class="text-gray-700 hover:text-purple-600">EMDR Map</router-link>
    </div>
  </nav>
</template>

<script setup>
// No logic needed yet
</script>



