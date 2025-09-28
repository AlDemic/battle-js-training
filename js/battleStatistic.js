//function of record kill-counter of battle
export function addStatistic(killedMob, battleStatistic) {
     if (!killedMob || !killedMob.nick) return;

    //key as mob name
    const keyName = killedMob.nick;

    //check if exist mob in statistic
    const isExist = battleStatistic.find(key => key.name === keyName);

    //counter ++ for exist mob or create it
    if(isExist) {
        isExist.counter++;
    } else {
        //create new
        const mob = {
            name: keyName,
            counter: 1
        }
        //update array
        battleStatistic.push(mob);
    }

    //return updated array
    return battleStatistic;
}

