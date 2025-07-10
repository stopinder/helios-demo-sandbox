<template>
  <div class="flex flex-col h-full w-full overflow-hidden">
    <!-- Chat Display Area -->
    <div class="flex-1 overflow-y-auto px-6 py-4 space-y-4 custom-scrollbar">
      <div class="text-slate-300 text-base">Begin your reflection.</div>
      <!-- Future messages will go here -->
    </div>

    <!-- Message Input Area -->
    <div class="border-t border-slate-700 px-6 py-4 bg-slate-800/70 backdrop-blur-md rounded-b-2xl shadow-inner">
      <div class="flex items-center gap-3">
        <input
            v-model="message"
            @keyup.enter="sendMessage"
            type="text"
            placeholder="Speak or type here..."
            class="flex-1 bg-slate-900 text-slate-100 rounded-full px-4 py-3 focus:outline-none placeholder-slate-400 shadow"
        />
        <button
            @click="sendMessage"
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
  console.log('Sent message:', message.value)
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

