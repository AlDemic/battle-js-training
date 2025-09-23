//render Player and Monster
export function renderCharacters(playerRender, monsterRender) {
    //get DOM element where put
    const characters = document.querySelector('.characters');

    //clean block
    characters.innerHTML = '';

    //add to DOM
    characters.appendChild(renderCharacter(playerRender, "player"));
    characters.appendChild(renderCharacter(monsterRender, "monster"));
}

export function renderCharacter(character, type) {
    //create div block for player
    const characterBlock = document.createElement('div');

    //add class name for player div block
    characterBlock.classList.add('characters__player');

    //add dataset to adjust effect for block
    characterBlock.dataset.type = type;

    //render Player
    characterBlock.innerHTML = (type === "player") 
    ? `
        <h2 class="characters__nick">${character.nick}</h2>
        <div class="characters__pic">
            <img class="characters__pic-avatar" src="img/player.png" alt="Player avatar" />
        </div>
        <div class="characters__hp"><div class="characters__hp-bar"></div></div>
        <div class="characters__hp-text">HP: ${Math.max(character.hp, 0)}%</div>
        <div class="characters__lvl">Level: ${character.level}</div>
        <div class="characters__atk">Atk: ${character.atk}</div>
        <div class="characters__def">Def: ${character.def}</div>
        <div class="characters__exp">Exp: ${character.exp}</div>
    `
    : `
        <h2 class="characters__nick">${character.nick}</h2>
        <div class="characters__pic">
            <img class="characters__pic-avatar" src="img/monster.png" alt="Monster avatar" />
        </div>
        <div class="characters__hp"><div class="characters__hp-bar"></div></div>
        <div class="characters__hp-text">HP: ${Math.max(character.hp, 0)}%</div>
        <div class="characters__atk">Atk: ${character.atk}</div>
        <div class="characters__def">Def: ${character.def}</div>
    `;

    //active hp status bar
    const hpBarActual = characterBlock.querySelector('.characters__hp-bar');
    hpBarActual.style.width = Math.max(character.hp, 0) + "%";

    return characterBlock;
}

export function renderBattleLog(logBattle) {
   //get DOM element for log
    const logBlock = document.querySelector('.logs__log');

    //render log battle text or "No logs" if massive is empty
    logBlock.innerHTML = (logBattle.length === 0)
     ? "<p>No logs</p>" 
     : logBattle
        .slice()
        .reverse()
        .map(log => `<p>${log}</p>`)
        .join("");
}

