import { createPlayer } from './playerCreation.js';
import { createMonster } from './monsterCreation.js';
import { savedStorage } from './saveStorage.js';
import { lvlUp } from './lvlUp.js';
import { renderCharacters, renderBattleLog, renderStatistic } from './render.js';
import { battleLogText } from './battleLog.js';
import { healPlayer } from './healPlayer.js';
import { applyDeathStatus, controlsDeathEffect } from './deathStatus.js';
import { hitEffects, healingEffect, lvlUpEffect, plrBuffEffect, mobBuffEffect } from './battleEffect.js';
import { dmgRange } from './dmgRange.js';
import { addStatistic } from './battleStatistic.js';
import { initWeatherInfo } from './api.js';

//init weather info
const { isDay, precip } = await initWeatherInfo();

//take from localStorage Player and Monster OR create them
let player = JSON.parse(localStorage.getItem("player")) || createPlayer("AlDemic"),
    monster = JSON.parse(localStorage.getItem("monster")) || createMonster();

//battle log
let battleLog = JSON.parse(localStorage.getItem("battleLog")) || [];

//battle statistic log
let battleStatistic = JSON.parse(localStorage.getItem("battleStatistic")) || [];

//render function HTML
function renderHtml() {
    renderCharacters(player, monster);
    renderBattleLog(battleLog);
    renderStatistic(battleStatistic);
    plrBuffEffect(isDay, precip);
    mobBuffEffect(isDay, monster);
}

//first load or refresh
renderHtml();

if(player.hp <= 0 && monster.hp <= 0) {
    applyDeathStatus("both");
} else if(player && player.hp <= 0) {
     applyDeathStatus("player");
} else if(monster.hp <= 0) {
    applyDeathStatus("monster");
}

//game control block
const battleControls = document.querySelector('.controls');

battleControls.addEventListener('click', (e) => {
    e.preventDefault();
    switch(e.target.id) {
        case "controls__nextMob":
            monster = createMonster();
            renderHtml();
            break;
        case "controls__atk":
            battle(player, monster);
            break;
        case "controls__heal":
            healPlayer(player, monster, battleLog);
            renderHtml();
            healingEffect();
            break;
        default:
            return;
    }
})

//clear battle log
const battleLogClear = document.querySelector('.logs');

//general function of battle log clearing
function clearBattleLog() {
    //clear log massive
    battleLog = [];

    //clear local storage
    localStorage.removeItem("battleLog");
    renderHtml();
}

//clear battle log by btn click
battleLogClear.addEventListener('click', (e) => {
    if(e.target.classList.contains('logs__clear')) {
        clearBattleLog();
    }
})

//battle function
function battle(playerInBattle, monsterInBattle) {
    //safety. Prevent double clicking
    if(playerInBattle.hp <= 0 || monsterInBattle.hp <= 0) return;

    //dmg formulas(negative dmg makes "1" dmg)

    //****Player dmg****
    //if isDay = 0 -> dmgPlayer less 10%, if isDay = 0 && precip = 1 => dmgPlayer less 30%
    const basePlrDmg = Math.max(1, dmgRange(playerInBattle.atk) - monsterInBattle.def);

    //Base for debuff and boost
    let dmgMultiplier = 1;

    if(isDay === 1 && precip === 0) {
        dmgMultiplier = 2; //if good weather and day time => player dmg * 2
    } else {
        //if night or bad weather => make debuff
        const debuffPercent = (isDay === 0 ? 0.1 : 0) + (precip === 1 ? 0.2 : 0);
        dmgMultiplier = 1 - debuffPercent;
    }

    //Final player dmg
    const dmgPlayer = Math.max(1, Math.round(basePlrDmg * dmgMultiplier));

    //**** Monster damage****
    //if vampire and isDay = 0 => dmgMonster * 2;
    let mobPowerBoost = (monsterInBattle.nick === "Vampire" && isDay === 0) ? 2 : 1;
    const dmgMonster = Math.max(1, dmgRange(monsterInBattle.atk) - playerInBattle.def) * mobPowerBoost;

    //**deal damage**
    monsterInBattle.hp -= dmgPlayer;
    playerInBattle.hp -= dmgMonster;

    if(playerInBattle.hp <= 0 && monsterInBattle.hp <= 0) { //if Player and Monster die
        //write player's die log
        battleLog.push(battleLogText(playerInBattle, monsterInBattle, "bothDie", dmgPlayer, dmgMonster));

        //write rest info of mob in log
        monster = monsterInBattle;
        
        //write rest info of player in log
        player = playerInBattle;
        
        //rewrite storage
        savedStorage("battleLog", battleLog);
        savedStorage("player", player);
        savedStorage("monster", monster);

        //render again
        renderHtml();

        //atk effect
        hitEffects("player", dmgMonster);
        hitEffects("monster", dmgPlayer);

        //apply death effect for player and monster
        setTimeout(() => {
            applyDeathStatus("both");
        }, 350);

    } else if(monsterInBattle.hp <= 0) {  // if monster die
        playerInBattle.exp += monsterInBattle.atk;

        //write monster's die log
        battleLog.push(battleLogText(playerInBattle, monsterInBattle, "monsterDie", dmgPlayer, dmgMonster));

        //check lvl up and write global info of player
        const { playerLvlUp, isLeveledUp } = lvlUp(playerInBattle);
        player = playerLvlUp;

        //write log
        battleLog.push(battleLogText(playerLvlUp, monsterInBattle, "lvlUp"));

        //write global info for monster
        monster = monsterInBattle;
        
        //add killed mob to statistic and rewrite global
        battleStatistic = addStatistic(monsterInBattle, battleStatistic);

        //rewrite storage
        savedStorage("battleLog", battleLog);
        savedStorage("player", player);
        savedStorage("monster", monster);
        savedStorage("battleStatistic", battleStatistic);

        //render again
        renderHtml();

        //atk effect
        hitEffects("monster", dmgPlayer);

        //apply death effect for monster
        setTimeout(() => {
            applyDeathStatus("monster");
        }, 350);

        //lvl up effect
        if(isLeveledUp) lvlUpEffect();

    } else if(playerInBattle.hp <= 0) { //if Player die
        //write player's die log
        battleLog.push(battleLogText(playerInBattle, monsterInBattle, "playerDie", dmgPlayer, dmgMonster));
        
        //write rest info of mob in log
        monster = monsterInBattle;
        
        player = playerInBattle;
        
        //rewrite storage
        savedStorage("battleLog", battleLog);
        savedStorage("monster", monster);
        savedStorage("player", player);

        //render again
        renderHtml();

        //atk effect
        hitEffects("player", dmgMonster);

        //apply death effect for player
        setTimeout(() => {
            applyDeathStatus("player");
        }, 350);
        
    } else {
        //write log
        battleLog.push(battleLogText(playerInBattle, monsterInBattle, "battle", dmgPlayer, dmgMonster));
        
        //check lvl up and write global info of player
        const { playerLvlUp, isLeveledUp } = lvlUp(playerInBattle);
        player = playerLvlUp;
        
        //rewrite global info for monster
        monster = monsterInBattle;
       
        //rewrite storage
        savedStorage("battleLog", battleLog);
        savedStorage("player", player);
        savedStorage("monster", monster);

        //render again
        renderHtml();

        //attack effect
        hitEffects("monster", dmgPlayer);
        setTimeout(() => {
            hitEffects("player", dmgMonster);
        }, 250); 

        //lvl up effect
        if(isLeveledUp) lvlUpEffect();
    }
}

//"continue" game function
export function continueGame() {
    //clear local Storage for monster
    localStorage.removeItem("monster");

    //create new globals
    monster = createMonster();

    //save globals in local storage
    savedStorage("player", player);
    savedStorage("monster", monster);
    savedStorage("battleLog", battleLog);
    savedStorage("battleStatistic", battleStatistic);

    //render all
    renderHtml();

    //switch on controls
    controlsDeathEffect(false);

    //remove "New Game" and "Continue" btn
    clearControlBtns();
}

//start "new game" function
export function startNewGame() {
    //clear local Storage (info about player, monster, Battle Log)
    localStorage.clear();

    //create new globals
    player = createPlayer("AlDemic");
    monster = createMonster();
    battleLog = [];
    battleStatistic = [];

    //save globals in local storage
    savedStorage("player", player);
    savedStorage("monster", monster);
    savedStorage("battleLog", battleLog);
    savedStorage("battleStatistic", battleStatistic);

    //render all
    renderHtml();

    //switch on controls
    controlsDeathEffect(false);

    //remove "New Game" and "Continue" btn
    clearControlBtns();
}

//clear "Continue" and "New Game" btns function
function clearControlBtns() {
    document.querySelector('#newGameBtn')?.remove();
    document.querySelector('#continueGameBtn')?.remove();
}



