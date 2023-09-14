<script setup>
import Fish from './Fish.vue';
const props = defineProps({
  fishes: Array,
});

const emit = defineEmits(["removeFish"]);
</script>

<template>
  <div class="aquarium w-full h-full bg-green-100">
    
    <Fish
      v-for="fish in fishes"
      :key="fish.url"
      :fish-obj="fish"
      @remove-fish="$emit('remove-fish', fish.id)"
    />
  </div>
</template>

<style scoped>
.aquarium {
  background-image: url("/aquarium.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  overflow: hidden;
}
</style>
