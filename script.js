//el height
let headerH = document.querySelector('header').offsetHeight;
const root = document.documentElement;
root.style.setProperty('--header-height', headerH + 'px');
const resizeElHeight = () => {
    headerH = document.querySelector('header').offsetHeight;
    root.style.setProperty('--header-height', headerH + 'px');
};

window.addEventListener('resize', () => {
    resizeElHeight();
})

//audios
let isAudioOpen = true;
const bgm = new Audio('./sounds/Espoir.mp3');
bgm.volume = 0.2;
bgm.loop = true;

const txtSFX = new Audio('./sounds/text-scroll-1.mp3');
txtSFX.loop = true;

const cardSFX1 = new Audio('./sounds/card-choose.mp3');
const cardSFX2 = new Audio('./sounds/card-open.mp3');
cardSFX1.volume = 0.7;
cardSFX2.volume = 0.7;

const starSFX1 = new Audio('./sounds/swish1_1.mp3');
const starSFX2 = new Audio('./sounds/poka01.mp3');
starSFX1.volume = 0.5;
starSFX2.volume = 0.5;

const playAudio = audio => {
    if (!isAudioOpen) {
        return;
    };
    audio.play();
};
const stopAudio = audio => {
    if (!isAudioOpen) {
        return;
    }
    audio.pause();
    audio.currentTime = 0;
};

//after page onload
const startScreen = document.querySelector('.start');
window.onload = () => {
    //start screen
    startScreen.style.animationName = 'start';
    setTimeout(() => {
        startScreen.style.display = 'none';
    }, 1700);

};

//text
const txtEng = [
    {
        id: 0,
        content: "Welcome. Click or press enter to continue."
    },
    {
        id: 1,
        content: "This is Genteijanken. It's basically rock, paper, scissors but with lives and limit cards."
    },
    {
        id: 2,
        content: "There are 4 cards of each type, which are consumed every time a card is played. The right-bottom stars is your lives. Game over if you lose all of your stars or cards."
    },
    {
        id: 3,
        content: "Try to compete Kaiji and win the game!"
    },
    {
        id: 4,
        content: "Game start!"
    },
    {
        id: 5,
        content: "Choose your card."
    },
    {
        id: 6,
        content: "Set."
    },
    {
        id: 7,
        content: "Open!"
    },
    {
        id: 8,
        content: `It's fair!`
    },
    {
        id: 9,
        content: `You lose!`
    },
    {
        id: 10,
        content: `You win!`
    },
    {
        id: 11,
        content: "Current status. Prepare for next round."
    },
    {
        id: 12,
        content: "Congratulations! You win!"
    }
];
let txtContents = txtEng;

const textBox = document.getElementById('text-box');
const text = document.getElementById('text');
const txtEnd = document.querySelector('.sparkle');
let isAllTyped = true;

let txtSpeed = 30;
const typeTxt = (msg) => {
    text.textContent = '';
    txtEnd.style.display = 'none';
    isAllTyped = false;
    let i = 0;
    playAudio(txtSFX);
    window.txtTyping = setInterval(msg => {
        if (i === msg.length) {
            delayNext(500);
            cancelType();
            return;
        };
        text.textContent += msg[i++];
    }, txtSpeed, msg);
};

const cancelType = () => {
    txtEnd.style.display = 'inline-block';
    isAllTyped = true;
    stopAudio(txtSFX);
    clearInterval(window.txtTyping);
};

let isDelay = false;
const delayNext = (time) => {
    isDelay = true;
    setTimeout(() => {
        isDelay = false;
    }, time);
};

let txtLine = 0;
const nextTxt = (contents) => {
    if (isDelay) {
        return;
    };

    if (isAllTyped) {
        if (isTxtOver) {
            return;
        };
        typeTxt(contents[++txtLine].content);
    } else {
        cancelType();
        text.textContent = '';
        text.textContent = contents[txtLine].content;
        delayNext(500);
    };

    txtOver(contents);
};

let isTxtOver = false;
const txtOver = (contents) => {
    if (txtLine >= contents.length - 1) {
        isTxtOver = true;
    } else {
        isTxtOver = false;
    };
};

//lives
const kaijiStar = document.getElementById('kaiji-lp');
const playerStar = document.getElementById('player-lp');
let kaijiLive = 3;
let playerLive = 3;

const removeStar = (who, live) => {
    who.lastElementChild.classList.add('remove-star');
    playAudio(starSFX1);
    setTimeout(() => {
        who.removeChild(who.lastElementChild);
    }, 1000);
    live--;
};

const addStar = (who, live) => {
    const liveP = document.createElement('div');
    liveP.classList.add('life-point');
    who.append(liveP);
    liveP.classList.add('add-star');
    playAudio(starSFX2);
    setTimeout(() => {
        liveP.classList.remove('add-star');
    }, 1000);
    live++;
};

//card
const cardChoicesSection = document.getElementById('player-choices');
const cardChoices = document.querySelectorAll('#player-choices > *');
const cardNum = document.querySelectorAll('.card-numbers > span');
const revealChoices = document.getElementById('reveal-cards');
const kaijiCard = document.getElementById('kaiji-card');
const playerCard = document.getElementById('player-card');
let rockNum = 4;
let paperNum = 4;
let scissorsNum = 4;
let playerChoice = '';
let kaijiChoice = '';

let isCardShowing = false;
const darkenScreen = document.querySelector('.darken');
const showChoices = () => {
    if (rockNum === 0) {
        cardChoices[0].style.display = 'none';
    };
    if (paperNum === 0) {
        cardChoices[1].style.display = 'none';
    };
    if (scissorsNum === 0) {
        cardChoices[2].style.display = 'none';
    };
    cardChoicesSection.classList.toggle('hidden');
    darkenScreen.classList.toggle('hidden');
    isCardShowing = true;
};

cardChoices.forEach(choice => {
    choice.style.pointerEvents = 'none';
    setTimeout(() => {
        choice.style.pointerEvents = 'auto';
    }, 1000);

    choice.addEventListener('click', () => {
        playAudio(cardSFX1);
        playerChoice = choice.id;
        switch (choice.id) {
            case 'rock':
                cardNum[0].textContent = --rockNum;
                break;
            case 'paper':
                cardNum[1].textContent = --paperNum;
                break;
            case 'scissors':
                cardNum[2].textContent = --scissorsNum;
                break;
        };
        nextTxt(txtContents);
        isCardShowing = false;
        cardChoicesSection.classList.toggle('hidden');
        darkenScreen.classList.toggle('hidden');
    });
});

const getKaijiChoice = () => {
    let i = Math.floor(Math.random() * 3);
    switch (i) {
        case 0:
            kaijiChoice = 'rock';
            break;
        case 1:
            kaijiChoice = 'paper';
            break;
        case 2:
            kaijiChoice = 'scissors';
            break;
    };
};

const applyCardChoices = () => {
    kaijiCard.className = 'card';
    playerCard.className = 'card';
    getKaijiChoice();
    setTimeout(() => {
        playAudio(cardSFX2);
        kaijiCard.classList.add(kaijiChoice);
        playerCard.classList.add(playerChoice);
    }, 1190);
};

let isReveal = false;
const showReveal = () => {
    applyCardChoices();
    revealChoices.classList.toggle('hidden');
    isReveal = true;
    isCardShowing = true;
    setTimeout(() => {
        isCardShowing = false;
    }, 2100);
};

const closeReveal = () => {
    revealChoices.classList.toggle('hidden');
};

const roundResult = () => {
    if (kaijiChoice === playerChoice) {
        txtLine = 7;
    } else if ((kaijiChoice === 'rock' && playerChoice === 'scissors') || 
    (kaijiChoice === 'paper' && playerChoice === 'rock') || 
    (kaijiChoice === 'scissors' && playerChoice === 'paper')) {
        txtLine = 8;
        setTimeout(() => {
            removeStar(playerStar, playerLive);
        }, 500)
        setTimeout(() => {
            addStar(kaijiStar, kaijiLive);
        }, 1300);
    } else if ((playerChoice === 'rock' && kaijiChoice === 'scissors') || 
    (playerChoice === 'paper' && kaijiChoice === 'rock') || 
    (playerChoice === 'scissors' && kaijiChoice === 'paper')) {
        txtLine = 9;
        setTimeout(() => {
            removeStar(kaijiStar, kaijiLive);
        }, 500)
        setTimeout(() => {
            addStar(playerStar, playerLive);
        }, 1300);
    };
    nextTxt(txtContents);
    delayNext(2000);
};

const replayRound = () => {
    if (txtLine === 8 || txtLine === 9 || txtLine === 10) {
        txtLine = 10;
        
    } else if (txtLine === 11) {
        txtLine = 4; 
    };
};

const game = () => {
    if (isCardShowing || isDelay) {
        return;
    };

    if (isReveal && txtLine === 7) {
        closeReveal();
        isReveal = false;
    };

    if (txtLine === 7 && isAllTyped) {
        roundResult();
        return;
    };

    if ((txtLine === 8 || txtLine === 9 || txtLine === 10) && isAllTyped) {
        replayRound();
    };
    
    nextTxt(txtContents);
    console.log(txtLine);
    
    if (txtLine === 11 && isAllTyped) {
        replayRound();
    };
    if (txtLine === 5) {
        showChoices();
    };
    if (txtLine === 7) {
        showReveal();
    };
    
};

text.textContent = txtContents[0].content
textBox.addEventListener('click', () => {
    game();
});

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'Enter':
            game();
            break;
    };
});

