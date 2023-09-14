
export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let randomValue = Math.random();
    if (randomValue === 0) {
      randomValue += 1;
    }
    return Math.floor(Math.random() * (max - min) + min);
  }


  