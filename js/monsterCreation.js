import { savedStorage } from './saveStorage.js';

const monsterNames = ["Goblin", "Orc", "Troll", "Imp", "Skeleton", "Zombie", "Ogre", "Slime"];

//local parameters
const hpBase = 100;
      
//create monster
export function createMonster() {
    const newMonster = {
        nick: monsterNames[getRandom(0, monsterNames.length - 1)], //random name from list
        hp: hpBase,
        atk: getRandom(2, 30),
        def: getRandom(2, 15)
    };

    //add new monster to localStorage
    savedStorage("monster", newMonster);

    return newMonster;
}

//Random function for monster's parameters
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}