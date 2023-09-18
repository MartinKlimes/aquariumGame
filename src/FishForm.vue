<script setup>
import { ref, computed } from "vue";
import FishStatus from "./FishStatus.vue";  
import { useScoreStore } from "../stores/score";

const score = useScoreStore();  
const props = defineProps({
  fishes: Array,
  selectedFishes: Array,
});

const emit = defineEmits(["createFish"]);

const selectedFish = ref(null);
const hungerTime = ref(900);

function addFish(price) {
  if (selectedFish.value && score.capital >= price) {
    emit("createFish", [selectedFish.value.id, hungerTime.value]);
    score.reduceCapital(price);
  }
}

const price = computed(() => {
  const fish = props.fishes.find((fish) => fish.id === selectedFish.value?.id);
  let price = fish ? fish.price : 0;
  price = price + (hungerTime.value / 100) * price;
  return price;
});
</script>
<template>
  <div class="flex space-x-4 items-center absolute bottom-4 left-4">
    <!-- <h1 class="text-white font-bold text-2xl">Fish Type</h1> -->
    <div class="grid grid-cols-5 w-[500px] bg-gray-900 p-4 rounded-md">
      <div
        v-for="fish in fishes"
        :key="`${fish.url}-${fish.id}`"
        class="flex flex-col items-center"
      >
        <span class="text-xs p-0 mb-1">{{ "🪙".repeat(fish.price) }}</span>
        <button
          class="p-1 rounded-md min-h-[80px]"
          @click="selectedFish = fish"
          :class="{
            'shadow-inner shadow-black bg-white': selectedFish?.id === fish.id,
          }"
        >
          <img :src="fish.url" :alt="fish.url" />
        </button>
      </div>
    </div>

    <form
      @submit.prevent="addFish(price)"
      class="text-white rounded-md relative shadow-md shadow-black bg-gray-900 p-4"
    >
      <button
        type="submit"
        class="btn btn-outline btn-accent w-full h-[120px] text-2xl"
      >
        Add Fish
      </button>

      <div class=" text-sm text-gray-400 mt-2">
        <label for="hungry-speed">Food capacity</label>

        <input
          v-model="hungerTime"
          type="range"
          id="hungry-speed"
          step="200"
          min="200"
          max="2000"
          class="range range-accent"
        />
        <div class="flex justify-between mt-2 ">
          <span class="">Price: {{ price }}$</span>
          <span>Potencial: {{ selectedFish?.potencial }}XP</span>
        </div>
      </div>
    </form>

    <FishStatus :fishes="fishes" :selectedFishes="selectedFishes"/>

    
  </div>
</template>
<style scoped></style>
