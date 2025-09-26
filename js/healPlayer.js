import { battleLogText } from './battleLog.js';
import { savedStorage } from './saveStorage.js';

//healing power parameter
export const healPower = 20;

//heal function
export function healPlayer(player, monster, battleLog) {

    if(!player) return player; 

    //heal logic
    player.hp = Math.min(player.hp + healPower, 100);

    //write log
    battleLog.push(battleLogText(player, monster, "heal"));
    savedStorage("battleLog", battleLog);

    return player; 
} 