<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { getRandomInt } from "../composables/randomNumber";
import { useScoreStore } from "../stores/score";
import ScoreStatus from "./ScoreStatus.vue";

const store = useScoreStore();
const props = defineProps({
  fishObj: Object,
});
const emit = defineEmits(["removeFish"]);


const top = ref(window.innerHeight / 2);
const left = ref(window.innerWidth / 2);
const fish = ref(null);
const imageDirection = ref(null);
const foodControler = ref(null);
const showStatus = ref(false);
const fishImage = ref(props.fishObj.url);
let randomTop = getRandomInt(0, 5);
let randomLeft = getRandomInt(0, 5);
let xDirection = -1;
let yDirection = -1;

function newDirection() {
  randomTop = getRandomInt(1, 3);
  randomLeft = getRandomInt(1, 3);
}
let bgAquarium = document.querySelector(".aquarium").getBoundingClientRect();

const moveFish = setInterval(() => {
  top.value += randomTop * yDirection;
  left.value += randomLeft * xDirection;
  const fishPosition = fish.value.getBoundingClientRect();

  if (fishPosition.top <= 0) {
    yDirection = 1;
    newDirection();
  }
  if (fishPosition.left <= bgAquarium.left) {
    xDirection = 1;
    newDirection();
  }
  if (fishPosition.bottom >= window.innerHeight - 220) {
    yDirection = -1;
    newDirection();
  }
  if (fishPosition.right >= bgAquarium.right - 10) {
    xDirection = -1;
    newDirection();
  }

  imageDirection.value = xDirection === -1 ? "left" : "right";
}, 20);

let animationInterval;
function animateHungerStatus() {
  let width = 0;
  const increment = 100 / props.fishObj.hungerTime;
  animationInterval = setInterval(() => {
    width += increment;
    foodControler.value.style.width = `${width}%`;
    if (width > 40) {
      foodControler.value.style.backgroundColor = "orange";
    } else {
      foodControler.value.style.backgroundColor = "green";
    }
    if (width > 60) {
      foodControler.value.style.backgroundColor = "red";
      showStatus.value = true;
    }
    if (width >= 100) {
      clearInterval(animationInterval);
      fishImage.value = "/dead.png";
      showStatus.value = false;
      setTimeout(() => {
        emit("removeFish", props.fishObj.id);
        store.addDeath()
      }, 2000);
    }
  }, 10);
}
function resetStatus() {
  clearInterval(animationInterval);

  showStatus.value = false;
  animateHungerStatus();
}

onMounted(() => {
  animateHungerStatus();
});
onUnmounted(() => {
  clearInterval(moveFish);
  clearInterval(animationInterval);
});

watch(() => store.foodStatus,() => {
  if (fishImage.value === "/dead.png") {
    return;
  }
  resetStatus();
})

</script>

<template>
  <div
    ref="fish"
    :style="{ top: `${top}px`, left: `${left}px` }"
    :class="{ 'animate-pulse': fishImage == '/dead.png' }"
    class="w-[120px] absolute flex flex-col justify-center items-center h-max"
  >
    <div
      v-show="showStatus"
      @click="resetStatus"
      class="absolute -top-14 flex p-4 cursor-pointer"
    >
      <div
        class="px-2 bg-white rounded-full w-max flex text-gray-500 font-bold items-center hover:border hover:border-2 hover:border-lime-200"
      >
        Feed me<span class="ml-1 text-red-600 font-bold text-2xl">!</span>
      </div>
    </div>

    <img
      :class="{ 'flip-horizontal': imageDirection == 'left' }"
      :src="fishImage"
      :alt="fishObj.name"
    />
    <div class="w-max min-w-[80px] rounded-md overflow-hidden">
      <div
        v-if="fishObj.name"
        class="text-sm items-center bg-black flex flex-col opacity-70"
      >
        <h3 class="text-white text-center py-0.5 px-2">{{ fishObj.name }}</h3>
      </div>
      <div ref="foodControler" id="loader" class="h-[7px] opacity-100"></div>
    </div>
  </div>
</template>

<style scoped>
.flip-horizontal {
  transform: scaleX(-1);
}
</style>
