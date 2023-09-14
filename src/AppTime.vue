<script setup>
import { onUnmounted, ref } from "vue";
const emit = defineEmits(["endGame"]);

const time = ref(60);

const interval = setInterval(() => {
  if(time.value <= 4) {
    document.querySelector('.countdown')?.classList.add('text-red-500')
  } 
  if(time.value <= 0) {
    document.querySelector('.countdown')?.classList.remove('text-red-500')
    emit('endGame')
    time.value = 60;
  }
  time.value--;
}, 1000);

onUnmounted(() => {
  clearInterval(interval);
});
</script>


<template>
<div class="text-6xl absolute top-2 left-2 text-gray-900">
      <span v-if="time >= 0" class="countdown">
        <span :style="'--value:' + time + ';'"></span>
      </span>
      <!-- <button @click="" v-else class="btn btn-primary ml-8">New newGame</button> -->
    </div>
</template>
