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