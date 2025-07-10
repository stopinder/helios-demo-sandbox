<template>
  <div class="relative h-screen font-sans bg-midnight text-white overflow-hidden">

    <!-- Top Bar -->
    <div class="fixed top-0 left-0 right-0 h-14 bg-slate flex items-center justify-between px-6 shadow z-40">
      <div class="text-lg font-semibold">Heliosynthesis</div>
      <div class="flex items-center gap-3">
        <img src="/images/therapist-profile.jpg" alt="Therapist" class="h-8 w-8 rounded-full object-cover" />
      </div>
    </div>

    <!-- Main Body -->
    <div class="pt-14 pb-16 h-full flex overflow-hidden">

      <!-- Left Sidebar -->
      <div class="w-64 bg-slate/90 border-r border-slate-700 px-4 py-6 overflow-y-auto space-y-6">
        <div>
          <h2 class="text-xs uppercase text-faded mb-2">Clients</h2>
          <ul class="space-y-2 text-sm">
            <li @click="togglePanel" class="cursor-pointer hover:text-accent">Annie Wilson</li>
            <li class="text-faded">Ben Carter</li>
            <li class="text-faded">Clara Lee</li>
          </ul>
        </div>
        <div>
          <h2 class="text-xs uppercase text-faded mb-2">Sessions</h2>
          <ul class="space-y-1 text-sm text-faded">
            <li>July 9 - Check-in</li>
            <li>July 2 - Processing</li>
            <li>June 24 - Assessment</li>
          </ul>
        </div>
      </div>

      <!-- Main Canvas -->
      <div class="flex-1 relative px-10 py-6 overflow-y-auto">
        <!-- Whisper Prompt -->
        <p class="italic text-faded mb-6">Is this a protector emerging?</p>

        <!-- Message Input -->
        <div
            class="absolute bottom-6 transition-all duration-200"
            :class="showPanel ? 'left-10 right-[350px]' : 'left-10 right-10'"
        >

        <div class="flex items-center gap-3 bg-midnight/70 border border-slate-700 rounded-full px-4 py-2 shadow backdrop-blur-md">
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

    <!-- Bottom Bar -->
    <div class="fixed bottom-0 left-0 right-0 h-16 bg-slate flex items-center justify-between px-6 shadow-inner z-40">
      <div class="flex gap-4">
        <select class="bg-midnight text-white px-3 py-1 rounded text-sm">
          <option>IFS</option>
          <option>CBT</option>
          <option>EMDR</option>
          <option>Somatic</option>
          <option>Eclectic</option>
        </select>
        <select class="bg-midnight text-white px-3 py-1 rounded text-sm">
          <option>Reflective</option>
          <option>Clinical</option>
          <option>Supervision</option>
        </select>
      </div>
      <div class="flex items-center gap-3">
        <p class="italic text-faded text-sm">Invite Heliosynthesis</p>
        <span class="material-icons cursor-pointer">settings</span>
      </div>
    </div>

  </div>
</template>

<script setup>
import { MicrophoneIcon } from '@heroicons/vue/24/outline'

import { ref } from 'vue'
const drawerWidth = 320 // width in pixels, used for spacing input when drawer is open

const showPanel = ref(false)
const togglePanel = () => showPanel.value = !showPanel.value
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.2s ease;
}
.slide-fade-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-fade-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
