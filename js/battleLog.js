//generate log depends on battle situation
export function battleLogText(playerInfo, monsterInfo, type) {
    //count dmg
    const dmgPlayer = Math.max(1, playerInfo.atk - monsterInfo.def),
          dmgMonster = Math.max(1, monsterInfo.atk - playerInfo.def);

    let logText;

    switch(type) {
        case "battle":
            logText = `Player ${playerInfo.nick} caused ${dmgPlayer} dmg and got from enemy ${monsterInfo.nick} similar atk with ${dmgMonster} power!`;
            return logText;
        case "monsterDie":
            logText = `Player ${playerInfo.nick} caused lethal damage with ${dmgPlayer} 
                        power and killed enemy - ${monsterInfo.nick}. Congratulations! He has got ${monsterInfo.atk} exp.`;
            return logText;
        case "playerDie":
            logText = `Unfortunately, player ${playerInfo.nick} got lethal hit with ${dmgMonster} power and passed away..`;
            return logText;
        case "lvlUp":
            logText = `Player ${playerInfo.nick} successfully raised level and became more stronger. Good luck!`;
            return logText;
        default:
            return "System msg";
    }
}
