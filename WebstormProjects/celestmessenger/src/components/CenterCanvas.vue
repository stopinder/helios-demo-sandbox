<template>
  <main class="center-canvas">
    <div v-for="msg in messages" :key="msg.id" class="message-bubble">
      {{ msg.content }}
    </div>

    <PortalButton />
  </main>
</template>

<script setup>
import PortalButton from './PortalButton.vue';

defineProps(['messages']);
</script>

<style scoped>
.center-canvas {
  flex-grow: 1;
  padding: 48px;
  overflow-y: auto;
}

.message-bubble {
  margin: 16px auto;
  padding: 24px;
  max-width: 700px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(8px);
  font-size: 18px;
  line-height: 1.6;
  color: var(--text-light);
}
</style>
