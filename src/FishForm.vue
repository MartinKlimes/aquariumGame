<script setup>
import { ref } from "vue";
import AquariumAction from "./AquariumAction.vue";


const props = defineProps({
  fishes: Array,
});

const emit = defineEmits(["createFish"]);

const selectedFishId = ref("");
const fishName = ref("");

function addFish() {
  if (selectedFishId.value && fishName.value) {
    emit("createFish", [selectedFishId.value, fishName.value]);
    selectedFishId.value = "";
    fishName.value = "";
  }
}
</script>
<template>
  <div class="w-1/4 p-8 min-w-[300px] absolute">
    <h1 class="text-white font-bold text-2xl">Fish Type</h1>
    <div class="grid grid-cols-2 gap-2 mt-4">
      <button
        class="hover:opacity-80 p-2 rounded-md"
        v-for="fish in fishes"
        :key="`${fish.url}-${fish.id}`"
        @click="selectedFishId = fish.id"
        :class="{ 'shadow-inner shadow-black': selectedFishId === fish.id }"
      >
        <img :src="fish.url" :alt="fish.url" />
      </button>
    </div>

    <form @submit.prevent="addFish" class="text-white space-y-4 mt-4">
      <label for="name">Name</label>
      <input
        v-model="fishName"
        type="text"
        id="name"
        class="p-2 rounded-md text-gray-800 font-bold w-full"
      />
      <button
        type="submit"
        class="w-full rounded bg-red-700 p-10 hover:bg-red-600 text-2xl"
      >
        Add Fish
      </button>
    </form>
    <AquariumAction />
  </div>


</template>
<style scoped></style>
