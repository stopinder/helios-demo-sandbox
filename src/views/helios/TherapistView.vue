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
        <p class="text-lg mb-4 text-faded">Begin your reflection here.</p>
        <!-- Message input and whisper go here later -->
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
import { ref } from 'vue'
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
