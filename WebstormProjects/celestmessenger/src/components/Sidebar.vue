<template>
  <aside class="sidebar">
    <select v-model="selectedSession" @change="emitSessionChange">
      <option disabled value="">Select a Session</option>
      <option v-for="session in sessions" :key="session.id" :value="session.id">
        {{ session.title }}
      </option>
    </select>
  </aside>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '../services/supabase'; // We'll set this up soon

const emit = defineEmits(['sessionSelected']);

const sessions = ref([]);
const selectedSession = ref('');

async function emitSessionChange() {
  emit('sessionSelected', selectedSession.value);
}

onMounted(async () => {
  const { data } = await supabase.from('sessions').select('*');
  sessions.value = data;
});
</script>

<style scoped>
.sidebar {
  width: 20%;
  background-color: #1a1a2e;
  padding: 20px;
  height: 100vh;
  overflow-y: auto;
}
</style>
