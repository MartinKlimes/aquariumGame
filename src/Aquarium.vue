<script setup>
import Fish from './Fish.vue';
const props = defineProps({
  fishes: Array,
});
</script>

<template>
  <div class="aquarium w-full h-3/4 bg-green-100">
    <img src="bg.jpg" class="absolute w-screen h-screen opacity-25" alt="">
    <Fish
      v-for="fish in fishes"
      :key="fish.url"
      :fish-obj="fish"
    />
  </div>
</template>

<style scoped>
.aquarium {
  /* background-image: url("bg.jpg"); */
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}
</style>
