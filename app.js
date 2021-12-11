// import functions and grab DOM elements
import { goblinArray } from './goblins.js';

const goblinContainer = document.getElementById('goblin-container');

const playerHpEl = document.getElementById('player-hp');

const newGoblinBtn = document.getElementById('new-goblin-button');

const deathToll = document.getElementById('death-toll');

const combatReportEl = document.getElementById('combat-report');


// let state
let currentGoblins = [];

let deadGoblins = 0;

let playerHp = 10;

newGoblinBtn.addEventListener('click', () => {
    const nextGoblin = makeNewGoblin();
    const newGoblinEl = renderGoblin(nextGoblin);
    goblinContainer.append(newGoblinEl);
});

const pageLoad = () => {
    for (let i = 0; i < 2; i++) {
        const nextGoblin = makeNewGoblin();
        const newGoblinEl = renderGoblin(nextGoblin);
        goblinContainer.append(newGoblinEl);
    }
};

const renderStateChange = () => {
    goblinContainer.textContent = '';
    for (const goblin of currentGoblins) {
        const newGoblinEl = renderGoblin(goblin);
        goblinContainer.append(newGoblinEl);
        if (goblin.hp === 0 && goblin.alive) {
            killGoblin(goblin);
        }
    }
    deathToll.textContent = deadGoblins;
};

const listenerGenerator = (holder, newGoblin) => {
    holder.style.cursor = 'pointer';
    
    holder.addEventListener('click', () => {
        const hitCheck = Math.random();
        if (hitCheck >= .5) {
            newGoblin.hp--;
            combatReport(true, newGoblin);
            renderStateChange();
        } else {
            playerTakeDamage();
            combatReport(false, newGoblin);
        }
        renderStateChange();
    });
};

const renderGoblin = (newGoblin) => {
    const holder = document.createElement('div');

    if (!newGoblin.alive) {
        holder.style.pointerEvents = 'none';
        holder.style.opacity = '.2';
    }

    const nameEl = document.createElement('p');
    const hpEl = document.createElement('p');

    holder.classList.add('goblin-pane');
    holder.setAttribute('id', `${newGoblin.id}`);

    nameEl.classList.add('goblin-stats');
    nameEl.classList.add('goblin-name');
    nameEl.setAttribute('id', `${newGoblin.id}-name`);

    hpEl.classList.add('goblin-stats');
    hpEl.classList.add('goblin-hp');
    hpEl.setAttribute('id', `${newGoblin.id}-hp`);

    nameEl.textContent = newGoblin.name;
    hpEl.textContent = `HP: ${newGoblin.hp}`;
    holder.append(nameEl, hpEl);
    holder.style.backgroundImage = `url(${newGoblin.image})`;

    listenerGenerator(holder, newGoblin);

    return holder;

};

const makeNewGoblin = () => {
    const newGoblin = goblinArray[Math.ceil(Math.random() * 9)];

    let goblinTracker = currentGoblins.length + 1;
    // console.log(goblinTracker);

    const goblinCopy = {
        ...newGoblin,
    };

    goblinCopy.id = `goblin-${goblinTracker}`;
    
    const hpNum = Math.ceil(Math.random() * 4);

    goblinCopy.hp = hpNum;

    currentGoblins.push(goblinCopy);

    return goblinCopy;
};

const killGoblin = (goblin) => {
    goblin.alive = false,
    deadGoblins++;
    const deathReport = `<p>You have KILLED ${goblin.name}</p>`
    combatReportEl.insertAdjacentHTML('afterbegin', deathReport);
};

const playerTakeDamage = () => {
    playerHp--;
    playerHpEl.textContent = playerHp;
    if (playerHp === 0) {
        if (confirm('Game Over! Play Again?')) {
            location.reload();
        } else {
            location.href = 'https://github.com/CadillacJack42/goblin-attack';
        }
    }
};

const combatReport = (bool, goblin) => {
    const playerSuccessResult = `<p>You successfully attacked ${goblin.name}!</p>`;
    const playerFailResult = `<p>Your attack against ${goblin.name} Failed!</p>`;
    const goblinSuccessResult = `<p>${goblin.name} successfully attacked you!</p>`;
    const goblinFailResult = `<p>${goblin.name}s attack against you Failed!</p>`;

    if (bool) {
        combatReportEl.insertAdjacentHTML('afterbegin', goblinFailResult);
        combatReportEl.insertAdjacentHTML('afterbegin', playerSuccessResult);
    } else {
        combatReportEl.insertAdjacentHTML('afterbegin', playerFailResult);
        combatReportEl.insertAdjacentHTML('afterbegin', goblinSuccessResult);
    }
};


pageLoad();