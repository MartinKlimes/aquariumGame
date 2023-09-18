<script setup>
import { useScoreStore } from "../stores/score";
import { computed } from "vue";
const emit = defineEmits(["resetGame"]);

const score = useScoreStore();

const finalScore = computed(() => {
  return score.score + score.capital*2 - score.numberOfDeaths * 1000;
});
</script>

<template>
  <div class="h-screen w-screen z-10 absolute flex items-center justify-center">
    <div class="bg-black opacity-50 w-full h-full absolute"></div>
    <div class="w-[250px] border rounded-md p-4 z-20 space-y-1">
      <h1 class="text-4xl text-center font-bold">Game Over</h1>
      <h4 class="font-bold">Your results</h4>
        <div class=" w-max">
      <p class="">🪙{{ score.capital }}$</p>
      <div class="flex items-center justify-between">
        <span>XP</span>
        <span>{{ score.score }}</span>
      </div>
      <div class="flex items-center justify-between">
        <img src="/dead.png" alt="dead.png" class="w-[30px]" />
        <span class="text-red-500 ">{{ score.numberOfDeaths }}</span>
      </div>
    </div>
    <h1 class="text-2xl text-center font-bold" title="XP + 🪙 - deathFishes">Your score is: {{ finalScore }}</h1>
    <button @click="emit('resetGame')" class="btn  btn-primary mt-8 w-full">New Game</button>

    </div>
  </div>
</template>
