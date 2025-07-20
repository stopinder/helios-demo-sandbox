<template>
  <div class="p-4 h-full">
    <vue-cal
        style="height: 100%;"
        :disable-views="['years', 'year', 'month']"
        default-view="week"
        :time-from="8 * 60"
        :time-to="18 * 60"
        :events="events"
        @cell-click="addEvent"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import VueCal from 'vue-cal'

const events = ref([])

function addEvent({ start }) {
  const title = prompt('Session title:')
  if (!title) return

  const end = new Date(start)
  end.setMinutes(end.getMinutes() + 50)

  events.value.push({
    start,
    end,
    title,
    content: 'Session with client'
  })
}
</script>

<style scoped>
/* Optional tweaks to match your theme */
.vuecal__event {
  background-color: #334155;
  color: white;
}
</style>
