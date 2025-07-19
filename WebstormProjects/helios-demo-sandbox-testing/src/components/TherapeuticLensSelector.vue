<template>
  <div class="bg-slate-800 rounded-xl p-4 shadow border border-slate-600 space-y-4">
    <div>
      <label for="lens-selector" class="text-slate-300 text-sm font-medium block mb-1">Lens</label>
      <select
        id="lens-selector"
        v-model="selectedLens"
        class="w-full bg-slate-900 border border-slate-600 text-slate-100 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
        aria-label="Select therapeutic lens"
      >
        <option value="IFS">IFS</option>
        <option value="EMDR">EMDR</option>
        <option value="CBT">CBT</option>
        <option value="Somatic">Somatic</option>
        <option value="Eclectic">Eclectic</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Props definition - allows parent component to provide initial value
const props = defineProps({
  initialLens: {
    type: String,
    default: 'IFS'
  }
});

// State management with initial value from props
const selectedLens = ref(props.initialLens);

// Emit changes to parent component
const emit = defineEmits(['update:lens']);

// Watch for changes and emit to parent
watch(selectedLens, (newValue) => {
  emit('update:lens', newValue);
});
</script>
