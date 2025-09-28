//common function of hit effect
export function hitEffects(type, dmg) {
    shakingEffect(type); //avatar shaking
    slashEffect(type); //slash hit

    setTimeout(() => {
        dmgNumberEffect(type, dmg);
    }, 250);
}

//avatar shaking effect
function shakingEffect(type) {
    //get DOM elements
    const typeBlock = document.querySelector(`.characters__player[data-type="${type}"]`);

    //shake avatar
    if(typeBlock) {    
        const typePic = typeBlock.querySelector('.characters__pic');
        typePic.classList.add('shake');
    }
}

//slash effect
function slashEffect(type) {
    //get DOM elements for pic creation
    const typeBlock = document.querySelector(`.characters__player[data-type="${type}"]`);
    const picBlock = typeBlock.querySelector('.characters__pic');

    //create slash pic
    const slashPic = document.createElement('img');
    slashPic.classList.add('characters__pic-slashHit');
    slashPic.src = "img/slashEffect.png"; //pic url
    slashPic.alt = "Slash hit effect";
    slashPic.style.transform = `rotate(${Math.floor(Math.random() * 360)}deg)`; //degree of pic appear
    picBlock.appendChild(slashPic);

    //add visual effect of appear for slash picture
    setTimeout(() => {
        slashPic.classList.add('show');
    }, 50);
    setTimeout(() => slashPic.remove(), 400); //remove pic
}

//dmg number effect
export function dmgNumberEffect(type, dmg) {
    //get DOM elements
    const typeBlock = document.querySelector(`.characters__player[data-type="${type}"]`);
    const picBlock = typeBlock.querySelector('.characters__pic');

    //create dmg number effect
    const dmgNumber = document.createElement('div');
    dmgNumber.classList.add('characters__pic-dmgNumber');
    dmgNumber.textContent = (dmg === 1) ? 'miss' : `${dmg}`; //if dmg = '1' -> miss
    picBlock.appendChild(dmgNumber);

    //add visual effect of appear for dmg number
    setTimeout(() => {
        dmgNumber.classList.add('show');
    }, 50);
    setTimeout(() => dmgNumber.remove(), 400); //remove dmg number
}

//healing effect
export function healingEffect() {
    //get DOM elements
    const typeBlock = document.querySelector(`.characters__player[data-type="player"]`);
    const picBlock = typeBlock.querySelector('.characters__pic');

    //create healing effect pic
    const healPic = document.createElement('img');
    healPic.classList.add('characters__pic-heal');
    healPic.src = "img/healEffect.png";
    healPic.alt = "Healing effect picture";
    picBlock.appendChild(healPic);

    //add visual effect of appear for slash picture
    setTimeout(() => {
        healPic.classList.add('show');
    }, 50);
    setTimeout(() => healPic.remove(), 400); //remove pic
}

//level up effect
export function lvlUpEffect() {
    //get DOM elements
    const typeBlock = document.querySelector(`.characters__player[data-type="player"]`);
    const picBlock = typeBlock.querySelector('.characters__pic');

    //create healing effect pic
    const lvlUpPic = document.createElement('img');
    lvlUpPic.classList.add('characters__pic-lvlUp');
    lvlUpPic.src = "img/lvlUpEffect.png";
    lvlUpPic.alt = "Level up effect picture";
    picBlock.appendChild(lvlUpPic);

    //add visual effect of appear for slash picture
    setTimeout(() => {
        lvlUpPic.classList.add('show');
    }, 50);
    setTimeout(() => lvlUpPic.remove(), 400); //remove pic
}

//player's buff effect
export function plrBuffEffect(isDay, precip) {
    //safety
    if(isDay == null || precip == null) return;

    //grayscale pic adjustment (if good weather and day time -> 100%, otherwise => adjust pic grayscale)
    let grayScaleParam = 0; //global adjustment var

    if(isDay === 1 && precip === 0) {
        grayScaleParam = 0; //no gray adj
    } else {
        //percent debuff var as %
        const weatherDebuff = 20;
        const nightDebuff = 10;

        //debuff percent calculation
        const debuffPercent = (isDay === 1 ? 0 : nightDebuff) + (precip === 1 ? weatherDebuff : 0);

        //adjust grayscale
        grayScaleParam = debuffPercent;
    }

    //**Create visual**//

    //get DOM elements
    const typeBlock = document.querySelector('.characters__player[data-type="player"]');
    const picBlock = typeBlock.querySelector('.characters__pic');

    //create buff effect(sword icon)
    //if isDay = 1 and precip = 0 => Boost x2. If isDay = 0 => dmg -10%; If precip = 1 => dmg -20%
    const buffPic = document.createElement('img');
    buffPic.classList.add('characters__pic-buffEffect');
    buffPic.id = 'characters__pic-buffEffect';
    buffPic.src = 'img/sword-icon.png';
    buffPic.alt = 'Buff effect';
    buffPic.style.filter = `grayscale(${grayScaleParam}%)`;
    //add to DOM
    picBlock.appendChild(buffPic);
    //tooltip effect
    tippy('#characters__pic-buffEffect', {
        content: (isDay === 1 && precip === 0) 
        ? "☀️ Good weather! Damage x2"
        : `⚔️ Damage reduced at ${grayScaleParam}% due-to ${
            (isDay === 0 ? "night.." : "") +
            (precip === 1 ? "bad weather.." : "")
        }`
    });

}

//monster's buff effect
export function mobBuffEffect(isDay, monster) {
    //safety
    if(isDay == null || monster == null) return;


    //if night time and monster "Vampire" => dmg x2
    if(monster.nick === "Vampire" && isDay === 0) {
    let grayScaleParam = 0; //global adjustment var

    //**Create visual**//

    //get DOM elements
    const typeBlock = document.querySelector('.characters__player[data-type="monster"]');
    const picBlock = typeBlock.querySelector('.characters__pic');

    //create buff effect(sword icon)
    const buffPic = document.createElement('img');
    buffPic.classList.add('characters__pic-buffEffect');
    buffPic.id = 'characters__pic-buffEffect';
    buffPic.src = 'img/sword-icon.png';
    buffPic.alt = 'Buff effect';
    buffPic.style.filter = `grayscale(${grayScaleParam}%)`;
    //add to DOM
    picBlock.appendChild(buffPic);
    //tooltip effect
    tippy('.characters__player[data-type="monster"] #characters__pic-buffEffect', {
        content: () => {
            if(monster.nick === "Vampire" && isDay === 0) return "⚔️ Run! Monster damage x2!";
        }
    });
    } else {
        return;
    }
}