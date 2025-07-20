<template>
  <div class="flex flex-col h-screen w-full bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-800 text-slate-100 relative">

    <!-- Header -->
    <header class="flex items-center justify-between px-6 h-20 bg-slate-900/80 backdrop-blur border-b border-slate-700 z-20">
      <div class="text-lg font-semibold text-indigo-300">My Reflective Space</div>
    </header>

    <!-- Main Layout -->
    <div class="flex flex-1 overflow-hidden">

      <!-- Canvas Area -->
      <div class="flex-1 px-10 py-8 flex items-center justify-center overflow-hidden relative z-10">
        <div class="w-full max-w-5xl h-full bg-slate-800/30 rounded-3xl shadow-2xl backdrop-blur-xl border border-slate-500/20 p-10 relative">
          <HeliosCanvas />
          <button class="absolute bottom-6 right-6 bg-slate-700 hover:bg-slate-600 text-white rounded-full p-3 shadow-lg transition duration-300">
            <MicrophoneIcon class="h-6 w-6" />
          </button>
        </div>
      </div>

      <!-- Right Sidebar -->
      <aside class="w-80 flex flex-col bg-slate-900/40 backdrop-blur-md border-l border-slate-500/20 shadow-lg relative z-10">
        <div class="p-6 flex-1 overflow-y-auto space-y-6">
          <!-- Placeholder Tools -->
          <button class="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow-md">Export Reflection</button>
          <button class="w-full bg-slate-700 hover:bg-slate-600 text-white py-2 px-4 rounded-lg shadow-md">Share with Therapist</button>
          <div>
            <label class="block text-sm mb-1">Previous Sessions</label>
            <select class="w-full bg-slate-800 text-white border border-slate-600 rounded-md p-2">
              <option>Session 1</option>
              <option>Session 2</option>
              <option>Session 3</option>
            </select>
          </div>
        </div>
      </aside>

    </div>
  </div>
</template>

<script setup>
import HeliosCanvas from '../../components/HeliosCanvas.vue';
import { MicrophoneIcon } from '@heroicons/vue/24/outline';
</script>
