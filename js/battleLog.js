import { healPower } from './healPlayer.js';

//generate log depends on battle situation
export function battleLogText(playerInfo, monsterInfo, type, dmgPlayer = null, dmgMonster = null) {
    let logText;

    switch(type) {
        case "battle":
            logText = `Player ${playerInfo.nick} caused ${dmgPlayer} dmg and got from enemy ${monsterInfo.nick} similar atk with ${dmgMonster} power!`;
            break;
        case "monsterDie":
            logText = `Player ${playerInfo.nick} caused lethal damage with ${dmgPlayer} 
                        power and killed enemy - ${monsterInfo.nick}. Congratulations! He has got ${monsterInfo.atk} exp.`;
            break;
        case "playerDie":
            logText = `Unfortunately, player ${playerInfo.nick} got lethal hit with ${dmgMonster} power and passed away..`;
            break;
        case "lvlUp":
            logText = `Player ${playerInfo.nick} successfully raised level and became more stronger. Good luck!`;
            break;
        case "bothDie":
            logText = `Unbelievable! Player ${playerInfo.nick} and his enemy - ${monsterInfo.nick}, caused lethal damage for each one!`;
            break;
        case "heal":
            logText = `Player ${playerInfo.nick} successfully restored hp for ${healPower} points.`;
            break;
        default:
            return "System msg";
    }

    return { type, text: logText };
}
