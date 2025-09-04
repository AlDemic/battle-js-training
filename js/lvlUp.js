import { renderCharacters } from './render.js';

//lvl up stats
const lvlUpAtk = 10,
      lvlUpDef = 5,
      lvlUpExpNeed = 30; //how much need exp for lvl up

//lvl up function
export function lvlUp(playerLvlUp) {
    if(playerLvlUp.exp >= lvlUpExpNeed) {
        playerLvlUp.exp -= lvlUpExpNeed;
        playerLvlUp.level++; //increase lvl
        playerLvlUp.atk += lvlUpAtk; //increase atk
        playerLvlUp.def += lvlUpDef; //increase def
        playerLvlUp.hp = 100; //refresh hp
    }
    return playerLvlUp;
}