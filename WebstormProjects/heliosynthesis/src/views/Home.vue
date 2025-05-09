<template>
  <div class="flex flex-col min-h-screen relative bg-gradient-to-b from-indigo-900 via-purple-900 to-black text-white animate-fadein">

    <!-- Main Celestial Canvas -->
    <main class="flex-1 flex flex-col items-center justify-center text-center p-6 overflow-y-auto">
      <div class="space-y-6 max-w-xl w-full">

        <!-- Title -->
        <h1 class="text-4xl md:text-6xl font-light tracking-wide opacity-0 animate-fadein-delay-0">
          Heliosynthesis
        </h1>

        <!-- Subtitle -->
        <p class="text-lg md:text-xl text-purple-200 opacity-0 animate-fadein-delay-1">
          A poetic interface for inner alignment and celestial rhythm.
        </p>

        <!-- Typing message output -->
        <div v-if="typedMessage" class="text-purple-300 text-base md:text-lg mt-8 min-h-[2rem] transition-opacity duration-500 opacity-0 animate-fadein-delay-2">
          {{ typedMessage }}
        </div>

      </div>
    </main>

    <!-- Floating Message Input Bar -->
    <div class="fixed bottom-20 left-0 right-0 flex justify-center px-4 opacity-0 animate-fadein-delay-3">
      <div class="flex w-full max-w-2xl bg-black bg-opacity-50 backdrop-blur-md rounded-full items-center px-4 py-2 gap-2">
        <input
            v-model="userInput"
            ref="inputRef"
            @keyup.enter="submitMessage"
            type="text"
            placeholder="Speak or type your reflection..."
            class="flex-grow bg-purple-900/30 px-4 py-2 rounded-full text-white placeholder-purple-300 focus:outline-none text-base transition-colors duration-200 focus:bg-purple-800/40"
        />
        <button
            @click="toggleListening"
            class="h-8 w-8 flex items-center justify-center transition-colors duration-200"
        >
          🎤
        </button>
        <button
            @click="submitMessage"
            class="h-8 w-8 flex items-center justify-center text-purple-400 hover:text-purple-200 transition-colors duration-200"
        >
          ➤
        </button>
      </div>
    </div>

    <!-- Bottom Footer Tools Bar -->
    <footer class="fixed bottom-0 left-0 right-0 bg-black bg-opacity-30 backdrop-blur-md flex justify-center items-center space-x-8 py-2 text-purple-300 text-xs md:text-sm opacity-0 animate-fadein-delay-4">
      <button class="flex flex-col items-center hover:text-purple-100">
        <span>⚙</span>
        <span>Settings</span>
      </button>
      <button class="flex flex-col items-center hover:text-purple-100">
        <span>🛠</span>
        <span>Tools</span>
      </button>
      <button class="flex flex-col items-center hover:text-purple-100">
        <span>🛟</span>
        <span>Support</span>
      </button>
    </footer>

  </div>
</template>

<script setup>
import { ref } from 'vue'

const userInput = ref('')
const typedMessage = ref('')
const isListening = ref(false)
const inputRef = ref(null)

let recognition

if ('webkitSpeechRecognition' in window) {
  recognition = new window.webkitSpeechRecognition()
  recognition.continuous = false
  recognition.interimResults = false
  recognition.lang = 'en-US'

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript
    userInput.value = transcript
    isListening.value = false
    focusInput()
  }

  recognition.onerror = (event) => {
    console.error('Speech recognition error:', event.error)
    isListening.value = false
  }

  recognition.onend = () => {
    isListening.value = false
  }
} else {
  console.warn('Speech Recognition not supported in this browser.')
}

const toggleListening = () => {
  if (recognition) {
    if (!isListening.value) {
      recognition.start()
      isListening.value = true
    } else {
      recognition.stop()
      isListening.value = false
    }
  } else {
    alert('Speech Recognition not supported in this browser.')
  }
}

const submitMessage = () => {
  if (userInput.value.trim() !== '') {
    const message = userInput.value.trim()
    userInput.value = ''
    typedMessage.value = ''
    typeOutMessage(message)
    focusInput()
  }
}

const typeOutMessage = (text) => {
  let i = 0
  const speed = 30 // typing speed in ms
  const interval = setInterval(() => {
    typedMessage.value += text.charAt(i)
    i++
    if (i >= text.length) clearInterval(interval)
  }, speed)
}

const focusInput = () => {
  inputRef.value?.focus()
}
</script>

<style>
@keyframes fadein {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fadein {
  animation: fadein 1s ease-out forwards;
}
.animate-fadein-delay-0 {
  animation: fadein 1s ease-out 0s forwards;
}
.animate-fadein-delay-1 {
  animation: fadein 1s ease-out 0.3s forwards;
}
.animate-fadein-delay-2 {
  animation: fadein 1s ease-out 0.6s forwards;
}
.animate-fadein-delay-3 {
  animation: fadein 1s ease-out 0.8s forwards;
}
.animate-fadein-delay-4 {
  animation: fadein 1s ease-out 1.1s forwards;
}
</style>