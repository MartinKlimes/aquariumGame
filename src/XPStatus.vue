<script setup>
import { computed, ref } from "vue";
import { useScoreStore } from "../stores/score";

const store = useScoreStore();
const dynamicValue = ref(0);


let interval;
function startInterval() {
  interval = setInterval(() => {
    if (dynamicValue.value < 100) {
      dynamicValue.value += .1;
    } else {
      clearInterval(interval);
    }
  }, 10);
}

const isLoaded = computed(() => {
  return dynamicValue.value >= 100;
});

function resetFoodStatus() {
  if (isLoaded.value) {
    dynamicValue.value = 0;
    store.resetFoodStatus();
    startInterval(); // Spuštění intervalu znovu po resetu
  }
}
startInterval()
</script>

<template>
  <div class="absolute bottom-4 right-4 bg-gray-600 p-4 rounded-full" :class="[{'shadow-md bg-indigo-900 hover:shadow-black cursor-pointer' : isLoaded  }]" @click="resetFoodStatus">
    <div class="radial-progress" :style="'--value:' + dynamicValue + ';'">
      {{ dynamicValue.toFixed(0) }}%
    </div>
    <Transition name="bounce">
        <div v-if="isLoaded"  class="badge badge-outline absolute top-0 left-0 -translate-y-6 bg-gray-900 p-2 ">Feed them all!</div>

    </Transition>

  </div>
</template>
<style scoped>

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>