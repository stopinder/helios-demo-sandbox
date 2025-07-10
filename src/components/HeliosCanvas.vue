<template>
  <div class="flex flex-col h-full w-full overflow-hidden bg-slate-900">
    <!-- Chat Display Area -->
    <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
      <div class="text-slate-400 text-base">Begin your reflection.</div>

      <!-- Fake message history -->
      <div class="space-y-2">
        <div class="bg-slate-800 text-white px-4 py-3 rounded-2xl max-w-md">
          I've been noticing more anxiety when I'm alone lately.
        </div>
        <div class="bg-indigo-700 text-white px-4 py-3 rounded-2xl max-w-md self-end ml-auto">
          That makes sense given what we explored last week. What's it like right now?
        </div>
        <div class="bg-slate-800 text-white px-4 py-3 rounded-2xl max-w-md">
          It feels like a tightening in my chest. Hard to breathe sometimes.
        </div>
      </div>
    </div>

    <!-- Message Input Area -->
    <div class="border-t border-slate-800 px-6 py-4 bg-slate-900/90 backdrop-blur-md shadow-2xl rounded-t-2xl">
      <div class="flex items-center gap-3">
        <input
            v-model="message"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Speak or type here..."
            aria-label="Message input"
            class="flex-1 bg-slate-800 text-slate-100 rounded-full px-4 py-3 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:bg-slate-700 shadow transition"
        />
        <button
            @click="sendMessage"
            aria-label="Send voice message"
            class="p-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-full shadow transition"
        >
          <MicrophoneIcon class="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { MicrophoneIcon } from '@heroicons/vue/24/solid'

const message = ref('')

const sendMessage = () => {
  if (!message.value.trim()) return
  console.log('📤 Sent message:', message.value)
  message.value = ''
}
</script>

<style scoped>
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
