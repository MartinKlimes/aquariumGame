<script setup>
import { useScoreStore } from "../stores/score"

const score = useScoreStore()



</script>


<template>
    <div class="absolute top-4 right-4 flex flex-col space-y-2 bg-gray-900 p-6 rounded-full">
        <div class="info">
          <span>🪙</span>  
          <span>{{score.capital}}$</span>
        </div>
        <div class="info">
          <span>XP</span>  
          <span>{{score.score}}</span>
        </div>
        <div class="info">
          <span><img src="/dead.png" alt="dead.png" class="w-[30px]"/></span>  
          <span>{{score.numberOfDeaths }}</span>
        </div>
    </div>
</template>
<style scoped>

.info {
    @apply badge badge-outline text-2xl p-4 min-w-[150px] flex justify-between
}

</style>