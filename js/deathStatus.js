import { startNewGame, continueGame } from './main.js';

//death function
export function applyDeathStatus(type) {
    if(type === "both") {
        characterDeathEffect("player");
        characterDeathEffect("monster");
    } else {
        characterDeathEffect(type); //apply death status for character
    }
    
    controlsDeathEffect(true); //switch off controls buttons

    //add continue btn if player is alive
    if(type==="monster") extraGameControls("continue");

    extraGameControls("newGame"); //create button for new game
}

//html effect adjust
function characterDeathEffect(type) {
    //get DOM element or player or monster
    const typeBlock = document.querySelector(`.characters__player[data-type="${type}"]`);

    //cross-line for nick
    const nickBlock = typeBlock.querySelector('.characters__nick');
    if(nickBlock) nickBlock.style.textDecoration = "line-through";

    //modify pic due to death
    const picBlock = typeBlock.querySelector('.characters__pic');
    if(picBlock) picBlock.style.filter = "grayscale(100%)";

    //add pic of dead status
    const deadPic = document.createElement('img');
    deadPic.classList.add('characters__pic-dead');
    deadPic.src = "img/dead.png";
    deadPic.alt = "Picture of dead status";
    picBlock.appendChild(deadPic);

    //add visual effect of appear for dead status picture
    setTimeout(() => {
        deadPic.classList.add('show');
    }, 250);
}

//activate/deactivate btns for control and log clear
export function controlsDeathEffect(isActive) {
    //switch off all battle controls(buttons) and log clear
    const controlBtns = document.querySelectorAll('.controls button');
    const logClearBtn = document.querySelector('.logs__clear');

    //controls buttons
    controlBtns.forEach(btn => {
    //switch on only "new game" and "continue" btns
    if(btn.id !== 'continueGameBtn' && btn.id !== 'newGameBtn') btn.disabled = isActive;
    });
    
    //log clear btn
    logClearBtn.disabled = isActive;
}

//create extra game controls
function extraGameControls(type) {
    //get DOM to put "New Game" btn
    const controls = document.querySelector('.controls__extra');

    //base parameters for buttons
    const config = {
        continue: {
            id: 'continueGameBtn',
            text: "Continue",
            callFunction: continueGame
        },
        newGame: {
            id: 'newGameBtn',
            text: "New Game",
            callFunction: startNewGame
        }
    };

    //get object parameters
    const {id, text, callFunction} = config[type] || {};
    if(!id) return; //if no correct id

    //check for copy
    if(!document.querySelector(`#${id}`)) {
        //add html
        const btn = document.createElement('button');
        btn.id = id;
        btn.textContent = text;
        controls.appendChild(btn);

        //add click event
        btn.addEventListener('click', callFunction);
    }
}


