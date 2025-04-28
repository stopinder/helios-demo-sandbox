<template>
  <div class="app-layout">
    <Sidebar @sessionSelected="handleSessionSelected" />
    <CenterCanvas :messages="messages" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Sidebar from './components/Sidebar.vue';
import CenterCanvas from './components/CenterCanvas.vue';
import { supabase } from './services/supabase';  // We'll create this file next

const messages = ref([]);

async function handleSessionSelected(sessionId) {
  const { data } = await supabase
      .from('messages')
      .select('*')
      .eq('session_id', sessionId)
      .order('timestamp', { ascending: true });

  messages.value = data;
}
</script>

<style scoped>
.app-layout {
  display: flex;
  height: 100vh;
}
</style>
