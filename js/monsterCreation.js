import { savedStorage } from './saveStorage.js';

const monstersArray = [
  {
    name: "Goblin",
    img: "img/monsters/goblin.png"
  },
  {
    name: "Orc",
    img: "img/monsters/orc.png"
  },
  {
    name: "Vampire",
    img: "img/monsters/vamp.png"
  },
  {
    name: "Zombie",
    img: "img/monsters/zombie.png"
  }
]

//local parameters
const hpBase = 100;
      
//create monster
export function createMonster() {
    //get index of random monster
    const index = getRandom(0, monstersArray.length - 1);

    const { name, img } = monstersArray[index];

    const newMonster = {
        nick: name, 
        img: img, 
        hp: hpBase,
        atk: getRandom(2, 20),
        def: getRandom(2, 7)
    };

    //add new monster to localStorage
    savedStorage("monster", newMonster);

    return newMonster;
}

//Random function for monster's parameters
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}