<template>
  <div
      class="fixed left-0 top-0 h-full w-80 bg-slate-800 shadow-xl transform transition-transform duration-300 ease-in-out z-[9999]"
      :class="{ '-translate-x-full': !modelValue }"
  >

  <!-- Panel Header -->
    <div class="p-4 bg-slate-900 flex justify-between items-center border-b border-slate-700">
      <h2 class="text-xl font-semibold text-slate-100">Client Details</h2>
      <button
          @click="$emit('update:modelValue', false)"
          class="text-slate-400 hover:text-slate-100"
      >
        ✕
      </button>
    </div>

    <!-- Client Information -->
    <div v-if="client" class="p-4 space-y-4">
      <div>
        <h3 class="text-sm text-slate-400">Name</h3>
        <p class="text-slate-100">{{ client.name }}</p>
      </div>

      <div>
        <h3 class="text-sm text-slate-400">Next Session</h3>
        <p class="text-slate-100">{{ client.nextSession }}</p>
      </div>

      <div>
        <h3 class="text-sm text-slate-400">Email</h3>
        <p class="text-slate-100">{{ client.email }}</p>
      </div>

      <div>
        <h3 class="text-sm text-slate-400">Notes</h3>
        <p class="text-slate-100">{{ client.notes }}</p>
      </div>

      <p class="text-xs text-green-300">Client panel active</p>

      <!-- Map Preview -->
      <div
          class="bg-slate-700/50 rounded-md p-3 border border-slate-600 shadow hover:bg-slate-700 transition cursor-pointer"
          @click="$emit('view-map')"

      >
        <h3 class="text-sm text-slate-300 mb-2">🗺️ View IFS Map</h3>
        <img
            src="/images/ifs-map.png"
            alt="Map Preview"
            class="rounded border border-slate-600 max-h-40 w-full object-cover"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  client: {
    type: Object,
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>
