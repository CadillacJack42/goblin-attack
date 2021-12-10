// import functions and grab DOM elements
import { goblinArray } from './goblins.js';

const goblinContainer = document.getElementById('goblin-container');

const newGoblinBtn = document.getElementById('new-goblin-button');


// let state
const currentGoblins = [];

const deadGoblins = 0;

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
        if (goblin.hp === 0) {
            killGoblin(goblin);
        }
    }
};

const listenerGenerator = (holder, newGoblin) => {
    holder.style.cursor = 'pointer';
    
    holder.addEventListener('click', () => {
        let hitCheck;
        newGoblin.hp > 0 ? hitCheck = Math.random() : hitCheck = 0;
        if (hitCheck >= .5) {
            newGoblin.hp--;
            renderStateChange();
        }
    });
};

const renderGoblin = (newGoblin) => {
    const holder = document.createElement('div');
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
    console.log(goblinTracker);

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
    const deadGoblin = document.getElementById(goblin.id);
    deadGoblin.style.pointerEvents = 'none';
    deadGoblin.style.opacity = '.2';
};


pageLoad();