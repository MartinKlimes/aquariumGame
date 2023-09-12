<script setup>
import Aquarium from './Aquarium.vue';
import FishForm from './FishForm.vue'
import {ref} from "vue";

const fishes = [
  { id: 1, url: "golden-purple-fish.png", hungerTime: 500, name: ''},
  { id: 2, url: "goldfish.png", hungerTime: 800, name: '' },
  { id: 3, url: "guppie.png", hungerTime: 11, name: '' },
  { id: 4, url: "tropical-fish.png", hungerTime: 14, name: '' },
  { id: 5, url: "tuna.png", hungerTime: 17,name: ''},
];

const selectedFishes = ref([])

function addFish(e) {
    const fish = fishes.find(fish => fish.id === e[0])
    fish.name = e[1]
    selectedFishes.value.push(fish)
}

</script>
<template>

<div class="relative flex w-full h-full overflow-hidden">
    <FishForm :fishes="fishes" @create-fish="addFish"/>

    <Aquarium :fishes="selectedFishes"/>


</div>


</template>
