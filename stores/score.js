import { defineStore } from 'pinia'



export const useScoreStore = defineStore('score', {
    state: () => ({
        capital: 1000,
        score: 0,
        foodStatus: false,
        numberOfDeaths: 0,
    }),
    actions: {
        reduceCapital(price) {
            // console.log(price);
            this.capital -= price
        },
        addScore(score) {
            this.score += score
        },
       resetFoodStatus() {
        this.foodStatus =! this.foodStatus
        },
        addDeath() {
            this.numberOfDeaths += 1
        },
        newGame() {
            this.capital = 1000
            this.score = 0
            this.numberOfDeaths = 0
        }
    },
})
