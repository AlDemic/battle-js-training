import { battleLogText } from './battleLog.js';
import { savedStorage } from './saveStorage.js';

//lvl up stats
const lvlUpAtk = 10,
      lvlUpDef = 5,
      lvlUpExpNeed = 20; //how much need exp for lvl up

//lvl up function
export function lvlUp(playerLvlUp, monsterInBattle, battleLog) {
    let isLeveledUp = false; //is user got lvl up?

    if(playerLvlUp.exp >= lvlUpExpNeed) {
        playerLvlUp.exp -= lvlUpExpNeed;
        playerLvlUp.level++; //increase lvl
        playerLvlUp.atk += lvlUpAtk; //increase atk
        playerLvlUp.def += lvlUpDef; //increase def
        playerLvlUp.hp = 100; //refresh hp
        isLeveledUp = true;

        //write log
        battleLog.push(battleLogText(playerLvlUp, monsterInBattle, "lvlUp"));
        savedStorage("battleLog", battleLog);
    }
    
    return { playerLvlUp, isLeveledUp };
}