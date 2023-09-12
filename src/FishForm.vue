<script setup>
import { ref } from "vue";
import AquariumAction from "./AquariumAction.vue";

const props = defineProps({
  fishes: Array,
});

const emit = defineEmits(["createFish"]);

const selectedFishId = ref("");
const hungerTime = ref(250);

function addFish() {
  if (selectedFishId.value) {
    emit("createFish", [selectedFishId.value, hungerTime.value]);
    selectedFishId.value = "";
    hungerTime.value = 250;
  }
}
</script>
<template>
  <div class=" flex p-5 bg-gray-900 gap-4 ">
    <!-- <h1 class="text-white font-bold text-2xl">Fish Type</h1> -->
    <div class="grid grid-cols-2 w-[200px] ">
      <button
        class="p-1 rounded-md"
        v-for="fish in fishes"
        :key="`${fish.url}-${fish.id}`"
        @click="selectedFishId = fish.id"
        :class="{ 'shadow-inner shadow-black bg-white': selectedFishId === fish.id }"
      >
        <img :src="fish.url" :alt="fish.url" />
      </button>
    </div>

    <form @submit.prevent="addFish" class="text-white rounded-md  shadow-md shadow-black">

        <button type="submit" class="btn btn-outline btn-accent w-full h-[120px] text-2xl">Add Fish</button>
  
        <div class=" p-2">
          <label class="text-sm text-gray-400" for="hungry-speed">Hungry speed</label>
  
          <input v-model="hungerTime" type="range" id="hungry-speed" step="50"  min="0" max="500" class="range range-accent" />
        </div>

    </form>
    <AquariumAction />
  </div>
</template>
<style scoped></style>
