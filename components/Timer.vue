<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  minutes: {
    type: Number,
    default: 5
  },
  autoStart: {
    type: Boolean,
    default: false
  }
})

const totalSeconds = ref(props.minutes * 60)
const isRunning = ref(false)
let intervalId: number | null = null

const displayMinutes = computed(() => Math.floor(totalSeconds.value / 60))
const displaySeconds = computed(() => totalSeconds.value % 60)
const displayTime = computed(() =>
  `${displayMinutes.value.toString().padStart(2, '0')}:${displaySeconds.value.toString().padStart(2, '0')}`
)

const start = () => {
  if (isRunning.value) return
  isRunning.value = true
  intervalId = setInterval(() => {
    if (totalSeconds.value > 0) {
      totalSeconds.value--
    } else {
      pause()
    }
  }, 1000)
}

const pause = () => {
  isRunning.value = false
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const reset = () => {
  pause()
  totalSeconds.value = props.minutes * 60
}

onMounted(() => {
  if (props.autoStart) {
    start()
  }
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <div class="timer-container" flex="~" items="center" gap="4">
    <div
      class="timer-display"
      text="4xl"
      font="mono bold"
      p="4"
      border="2 rounded-lg"
      :class="{ 'text-red-500': totalSeconds <= 60 && totalSeconds > 0 }"
    >
      {{ displayTime }}
    </div>
    <div flex="~ col" gap="2">
      <button
        v-if="!isRunning"
        @click="start"
        p="2 4"
        bg="green-500 hover:green-600"
        text="white"
        rounded="md"
        transition="colors"
      >
        Start
      </button>
      <button
        v-else
        @click="pause"
        p="2 4"
        bg="yellow-500 hover:yellow-600"
        text="white"
        rounded="md"
        transition="colors"
      >
        Pause
      </button>
      <button
        @click="reset"
        p="2 4"
        bg="gray-500 hover:gray-600"
        text="white"
        rounded="md"
        transition="colors"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<style scoped>
.timer-container {
  user-select: none;
}
</style>
