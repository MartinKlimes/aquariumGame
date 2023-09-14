<script setup>
import { useScoreStore } from '../stores/score';
const score = useScoreStore();

const props = defineProps({
  fishes: Array,
  selectedFishes: Array,
});
function countFish(id) {
  return props.selectedFishes.filter((fish) => fish.id === id).length;
  
}
function scorePerSecond(id) {
  const fish = props.selectedFishes.find((fish) => fish.id === id);
  return fish ? fish.potencial * countFish(id) : 0;
}

setInterval(() => {
  props.fishes.forEach((fish) => {
    score.addScore(scorePerSecond(fish.id));
  });
}, 1000);
</script>

<template>
  <div
    class="bg-gray-900 h-[237px] rounded-md flex items-center w-[190px] p-2 shadow-md shadow-black"
  >

    <div class="w-[70px] space-y-2 p-2">
      <div
        class="relative flex items-center"
        v-for="fish in fishes"
        :key="fish.id"
      >
        <span
          class="absolute right-0 translate-x-3 -translate-y-2 bg-red-700 px-1 text-xs rounded-full"
          >{{ countFish(fish.id)}}</span
        >
        <img :src="fish.url" :alt="fish.url" />

        <span class="badge badge-outline absolute left-20 w-[80px]">{{ scorePerSecond(fish.id) }}XP/s</span>
      </div>
    </div>
 
  </div>
</template>
