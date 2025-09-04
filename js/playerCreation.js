import { savedStorage } from './saveStorage.js';

//local parameters
const hpBase = 100,
      lvlBase = 1,
      expBase = 0,
      atkBase = 10,
      defBase = 7

//create Player
export function createPlayer(nick) {
    const newPlayer = {
        nick: nick,
        hp: hpBase,
        level: lvlBase,
        exp: expBase,
        atk: atkBase,
        def: defBase
    };

    //add new player to localStorage
    savedStorage("player", newPlayer);

    return newPlayer;
}