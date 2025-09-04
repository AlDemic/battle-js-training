import { createPlayer } from './playerCreation.js';
import { createMonster } from './monsterCreation.js';
import { savedStorage } from './saveStorage.js';
import { lvlUp } from './lvlUp.js';
import { renderCharacters } from './render.js';
import { renderBattleLog } from './render.js';
import { battleLogText } from './battleLog.js';

//take from localStorage Player and Monster OR create them
let player = JSON.parse(localStorage.getItem("player")) || createPlayer("AlDemic"),
    monster = JSON.parse(localStorage.getItem("monster")) || createMonster();

//battle log
let battleLog = JSON.parse(localStorage.getItem("battleLog")) || [];

//render function HTML
function renderHtml() {
    renderCharacters(player, monster);
    renderBattleLog(battleLog);
}

//first loading of page
renderHtml();

//game control block
const battleControls = document.querySelector('.controls');

battleControls.addEventListener('click', (e) => {
    switch(e.target.id) {
        case "controls__nextMob":
            monster = createMonster();
            renderHtml();
            break;
        case "controls__atk":
            battle(player, monster);
            break;
        case "controls__heal":
            healPlayer();
            renderHtml();
            break;
        default:
            return;
    }
})

//heal function
function healPlayer() {
    //heal parameter
    const healPower = 20;

    //heal logic
    player.hp = Math.min(player.hp + healPower, 100); 
} 

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
    const playerExp = player.exp + monster.atk;

    //player and monster atk
    if(monsterInBattle.hp > 0 && playerInBattle.hp > 0) {
        //formulas
        const dmgPlayer = Math.max(1, player.atk - monster.def),
              dmgMonster = Math.max(1, monster.atk - player.def);

        monsterInBattle.hp -= dmgPlayer;
        playerInBattle.hp -= dmgMonster;

        //write log
        battleLog.push(battleLogText(playerInBattle, monsterInBattle, "battle"));
        savedStorage("battleLog", battleLog);

        //check lvl up and write global info for mob and player
        player = lvlUp(playerInBattle);
        savedStorage("player", player)
        monster = monsterInBattle;
        savedStorage("monster", monster);

        //render again
        renderHtml();
    } else if(monsterInBattle.hp <= 0) { //if monster die
        playerInBattle.exp += playerExp;

        //write monster's die log
        battleLog.push(battleLogText(playerInBattle, monsterInBattle, "monsterDie"));
        savedStorage("battleLog", battleLog);

        //check lvl up and write global info of player
        player = lvlUp(playerInBattle);
        savedStorage("player", player);

        //create a new monster
        monster = createMonster();

        //render again
        renderHtml();
    } else { //if Player die
        //write player's die log
        battleLog.push(battleLogText(playerInBattle, monsterInBattle, "playerDie"));
        savedStorage("battleLog", battleLog);

        //write rest info of mob in log
        monster = monsterInBattle;
        savedStorage("monster", monster);

        //create a new player
        player = createPlayer("Other");

        //render again
        renderHtml();
    }

}