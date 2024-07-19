//el height
let headerH = document.querySelector('header').offsetHeight;
const root = document.documentElement;
root.style.setProperty('--header-height', headerH + 'px');

window.addEventListener('resize', () => {
    headerH = document.querySelector('header').offsetHeight;
    root.style.setProperty('--header-height', headerH + 'px');
})

//show start screen after page onload
const startScreen = document.querySelector('.start');
window.onload = () => {
    startScreen.style.animationName = 'start';
    setTimeout(() => {
        startScreen.style.display = 'none';
    }, 1700);
}

//cards
const cardChoicesSection = document.getElementById('player-choices');
const cardChoices = document.querySelectorAll('#player-choices > *');
const showChoicesReg = /Choose your card./;

let isCardsShowing = false;
const darkenScreen = document.querySelector('.darken');
const showChoices = () => {
    cardChoicesSection.classList.toggle('hidden');
    darkenScreen.classList.toggle('hidden');
    isCardsShowing = true;
};

let playerChoice = '';
cardChoices.forEach(choice => {
    choice.addEventListener('click', () => {
        let playerChoice = choice.id;
        console.log(playerChoice);
    })
})

//text
const textBox = document.getElementById('text-box');
const text = document.getElementById('text');
const textEnd = document.querySelector('.sparkle');

let option;
const textContents = [
    {
        id: 1,
        content: "Welcome. Click or press enter to progress."
    },
    {
        id: 2,
        content: "This is Genteijanken. It's basically rock, paper, scissors but with lives and limit cards."
    },
    {
        id: 3,
        content: "The right-bottom stars is your lives. Game over if you lose all of your stars."
    },
    {
        id: 4,
        content: "Try to compete Kaiji and win the game!"
    },
    {
        id: 5,
        content: "Game start!"
    },
    {
        id: 6,
        content: "Choose your card."
    },
];

const typeText = (msg) => {
    textEnd.style.display = 'none';
    let i = 0;
    window.timeId1 = setInterval(msg => {
        if (i === msg.length) {
            clearInterval(window.timeId1);
            textEnd.style.display = 'inline';
            return;
        }
        text.textContent += msg[i++];
    }, 30, msg);
}

let textLine = 0;
const nextText = (contents) => {
    if (textLine === contents.length - 1) {
        return;
    } else {
        text.textContent = '';

        typeText(contents[++textLine].content);
        return;
    }   
}

//first msg
text.textContent = textContents[0].content;

const game = () => {
    if (!isCardsShowing) {
        if (text.textContent === textContents[textLine].content) {
            nextText(textContents);
        } else {
            clearInterval(window.timeId1);
            text.textContent = textContents[textLine].content;
            textEnd.style.display = 'inline';
            return;
        };
    } else {
        return;
    }

    //show card choices
    if (showChoicesReg.test(textContents[textLine].content)) {
        showChoices();
    }
}

//input function
textBox.addEventListener('click', game);

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'Enter':
            game();
            break;
    }
})

//header button
const aboutBtn = document.getElementById('aboutBtn');
const restartBtn = document.getElementById('restartBtn');
const langBtn = document.getElementById('langBtn');

restartBtn.addEventListener('click', () => {
    location.reload();
})
