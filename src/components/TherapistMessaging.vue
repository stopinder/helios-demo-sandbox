<template>
  <div class="space-y-4 bg-slate-800/40 p-4 rounded-lg border border-slate-700 shadow-md">
    <h3 class="text-lg font-semibold text-indigo-300">🎥 Therapist Messaging</h3>

    <!-- Message History -->
    <div class="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
      <div
          v-for="(message, index) in messages"
          :key="index"
          class="bg-slate-700/70 p-3 rounded shadow text-sm text-slate-100"
      >
        {{ message }}
      </div>
    </div>

    <!-- New Message Input -->
    <textarea
        v-model="newMessage"
        placeholder="Type a message to your client..."
        class="w-full bg-slate-900/80 border border-slate-600 rounded-lg p-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner"
        rows="3"
    ></textarea>

    <div class="flex justify-between items-center">
      <button
          @click="sendMessage"
          class="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded text-sm shadow"
      >
        Send Message
      </button>

      <button
          @click="recordVideo"
          class="text-sm text-indigo-300 hover:text-indigo-200 underline decoration-dotted"
      >
        🎤 Record Video Message1
      </button>
    </div>

    <!-- Video Placeholder -->
    <div
        v-if="showVideo"
        class="border border-slate-600 rounded-lg overflow-hidden shadow"
    >
      <img
          src="https://placehold.co/600x400?text=Video+Message"
          alt="Video Thumbnail"
          class="w-full"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const messages = ref([
  'Hi Aria, just checking in after our last session.',
  'Remember to try the breathing exercise before bed.',
]);

const newMessage = ref('');
const showVideo = ref(false);

const sendMessage = () => {
  if (newMessage.value.trim() !== '') {
    messages.value.push(newMessage.value.trim());
    newMessage.value = '';
  }
};

const recordVideo = () => {
  showVideo.value = true;
};
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
