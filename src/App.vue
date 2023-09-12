<script setup>
import Aquarium from './Aquarium.vue';
import FishForm from './FishForm.vue'
import {ref} from "vue";

const fishes = [
  { id: 1, url: "golden-purple-fish.png", hungerTime: '', name: ''},
  { id: 2, url: "goldfish.png", hungerTime: '', name: '' },
  { id: 3, url: "guppie.png", hungerTime: '', name: '' },
  { id: 4, url: "tropical-fish.png", hungerTime: '', name: '' },
  { id: 5, url: "tuna.png", hungerTime: '',name: ''},
];

const selectedFishes = ref([])

function addFish(e) {
    const fish = fishes.find(fish => fish.id === e[0])
    fish.hungerTime = e[1]
    selectedFishes.value.push(fish)
}

</script>
<template>

<div class=" w-full h-full overflow-hidden bg-blue-200">
    
    <Aquarium :fishes="selectedFishes"/>
    <FishForm :fishes="fishes" @create-fish="addFish"/>


</div>


</template>
