//heal function
export function healPlayer(player) {
    //healing power parameter
    const healPower = 20;

    //heal logic
    player.hp = Math.min(player.hp + healPower, 100);
    return player; 
} 