<script setup>
import Aquarium from "./Aquarium.vue";
import FishForm from "./FishForm.vue";
import ScoreStatus from "./ScoreStatus.vue";
import XPStatus from "./XPStatus.vue";
import AppModal from "./AppModal.vue";
import AppTime from "./AppTime.vue";
import { ref } from "vue";
import { useScoreStore } from "../stores/score";

const score = useScoreStore();
const showModal = ref(false);
const showTimer = ref(false);
const fishes = [
  {
    id: 1,
    url: "golden-purple-fish.png",
    hungerTime: "",
    name: "",
    price: 1,
    potencial: 10,
  },
  {
    id: 2,
    url: "goldfish.png",
    hungerTime: "",
    name: "",
    price: 2,
    potencial: 20,
  },
  {
    id: 3,
    url: "guppie.png",
    hungerTime: "",
    name: "",
    price: 3,
    potencial: 30,
  },
  {
    id: 4,
    url: "tropical-fish.png",
    hungerTime: "",
    name: "",
    price: 4,
    potencial: 40,
  },
  { id: 5, url: "tuna.png", hungerTime: "", name: "", price: 5, potencial: 50 },
];

const selectedFishes = ref([]);

function addFish(e) {
  const fish = fishes.find((fish) => fish.id === e[0]);
  fish.hungerTime = e[1];
  selectedFishes.value.push(fish);
}

function removeFish(id) {
  const index = selectedFishes.value.findIndex((fish) => fish.id === id);
  selectedFishes.value.splice(index, 1);
}

function endGame() {
  showTimer.value = false;
  showModal.value = true;
  selectedFishes.value = [];
}

function resetGame() {
  selectedFishes.value = [];
  score.newGame();
  showTimer.value = true;
  showModal.value = false;
}



</script>
<template>
  <div class="w-full h-full overflow-hidden bg-blue-200 relative">
    <button @click="resetGame" v-if="!showTimer" class="btn btn-primary absolute top-4 left-4">New Game</button>
    <AppTime v-else @endGame ="endGame"/>
    <AppModal v-if="showModal" @reset-game="resetGame"/>
    <Aquarium :fishes="selectedFishes" @remove-fish="removeFish" />
    <FishForm
      :fishes="fishes"
      :selectedFishes="selectedFishes"
      @create-fish="addFish"
    />
    <ScoreStatus />
    <XPStatus />
  </div>
</template>
