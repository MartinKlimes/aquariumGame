<script setup>
import Fish from './Fish.vue';
const props = defineProps({
  fishes: Array,
});
</script>

<template>
  <div class="aquarium w-full">
    <Fish
      v-for="fish in fishes"
      :key="fish.url"
      :fish-obj="fish"
    />
  </div>
</template>

<style scoped>
.aquarium {
  background-image: url("bg.jpg");
  background-size: cover;
  overflow: hidden;
}
</style>
