//el height
const root = document.documentElement;
let headerH = document.querySelector('header').offsetHeight;
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
const audios = [
    {
        name: 'bgm',
        src: new Audio('./sounds/Espoir.mp3'),
        vol: 0.2,
        loop: true,
    },
    {
        name: 'txtSFX',
        src: new Audio('./sounds/text-scroll-1.mp3'),
        loop: true,
    },
    {
        name: 'cardChooseSFX',
        src: new Audio('./sounds/card-choose.mp3'),
        vol: 0.7,
    },
    {
        name: 'cardOpenSFX',
        src: new Audio('./sounds/card-open.mp3'),
        vol: 0.7,
    },
    {
        name: 'removeStarSFX',
        src: new Audio('./sounds/swish1_1.mp3'),
        vol: 0.4,
    },
    {
        name: 'addStarSFX',
        src: new Audio('./sounds/swish1_1.mp3'),
        vol: 0.4,
    },
    {
        name: 'clapSFX',
        src: new Audio('./sounds/short_clap2.mp3'),
        vol: 0.5,
    },
    {
        name: 'selectSFX',
        src: new Audio('./sounds/select.mp3'),
        vol: 0.8,
    },
    {
        name: 'hoverSFX',
        src: new Audio('./sounds/hover.mp3'),
        vol: 0.8,
    },
    {
        name: 'boatSFX',
        src: new Audio('./sounds/boat_whistle.mp3'),
        vol: 0.9,
    }
];

const playAudio = (name) => {
    if (!isAudioOpen) {
        return;
    };
    const song = audios.find(song => song.name === name);
    song.src.volume = song.vol ? song.vol : 1;
    song.src.loop = song.loop ? song.loop : false;
    song.src.play();
};
const stopAudio = (name) => {
    if (!isAudioOpen) {
        return;
    };
    const song = audios.find(song => song.name === name);
    song.src.pause();
    song.src.currentTime = 0;
};

const allBtn = document.querySelectorAll('.link, button');
allBtn.forEach(btn => {
    //btn sounds
    btn.addEventListener('mouseenter', () => {
        playAudio('hoverSFX');
        setTimeout(() => {
            stopAudio('hoverSFX');
        }, 150);
    });

    btn.addEventListener('click', () => {
        playAudio('selectSFX');
        setTimeout(() => {
            stopAudio('selectSFX');
        }, 400);
    });
});

//start menu
const mainGame = document.querySelector('main');
const startMenu = document.querySelector('.start-menu');
const transition = document.getElementById('transition');
const startBtn = document.getElementById('start-button');
const enBtn = document.getElementById('en-button');
const enIcon = document.querySelector('#en-button > i');
const jpBtn = document.getElementById('jp-button');
const jpIcon = document.querySelector('#jp-button > i');
startMenu.classList.toggle('hidden');
transition.classList.toggle('hidden');
transition.classList.toggle('start-ease');
transition.classList.toggle('darken');

setTimeout(() => {
    transition.classList.toggle('hidden');
    transition.classList.toggle('load');
}, 2000);

startBtn.addEventListener('click', () => {
    playAudio('boatSFX');
    transition.classList.toggle('hidden');
    transition.classList.toggle('start-ease');
    setTimeout(() => {
        startMenu.classList.toggle('hidden');
        mainGame.classList.toggle('hidden');
        resizeElHeight();
    }, 2000);
    setTimeout(() => {
        transition.classList.toggle('hidden');
        transition.classList.toggle('start-ease');
        playAudio('bgm');
    }, 3300);
});

enBtn.addEventListener('click', () => {
    enIcon.classList.add('fa-square-check');
    enIcon.classList.remove('fa-square');
    jpIcon.classList.remove('fa-square-check');
    jpIcon.classList.add('fa-square');
});

/*jpBtn.addEventListener('click', () => {
    jpIcon.classList.add('fa-square-check');
    jpIcon.classList.remove('fa-square');
    enIcon.classList.remove('fa-square-check');
    enIcon.classList.add('fa-square');
});*/

//lives
const kaijiStar = document.getElementById('kaiji-lp');
const playerStar = document.getElementById('player-lp');
let kaijiLive = 3;
let playerLive = 3;

const removeStar = (who) => {
    who.lastElementChild.classList.add('remove-star');
    playAudio('removeStarSFX');
    setTimeout(() => {
        who.removeChild(who.lastElementChild);
    }, 1000);
};

const addStar = (who) => {
    const liveP = document.createElement('div');
    liveP.classList.add('life-point');
    who.append(liveP);
    liveP.classList.add('add-star');
    playAudio('addStarSFX');
    setTimeout(() => {
        liveP.classList.remove('add-star');
    }, 1000);
};

const addLife = () => {
    kaijiLive--;
    playerLive++;
};

const loseLife = () => {
    playerLive--;
    kaijiLive++;
}

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

let isShowing = false;
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
    transition.classList.toggle('hidden');
    transition.classList.toggle('darken');
    isShowing = true;
    cardChoices[0].style.pointerEvents = 'none';
    cardChoices[1].style.pointerEvents = 'none';
    cardChoices[2].style.pointerEvents = 'none';
    setTimeout(() => {
        cardChoices[0].style.pointerEvents = 'auto';
        cardChoices[1].style.pointerEvents = 'auto';
        cardChoices[2].style.pointerEvents = 'auto';
    }, 1200);
};

cardChoices.forEach(choice => {
    choice.addEventListener('mouseenter', () => {
        playAudio('hoverSFX');
        setTimeout(() => {
            stopAudio('hoverSFX');
        }, 150);
    });
    choice.addEventListener('click', () => {
        playAudio('cardChooseSFX');
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
        isShowing = false;
        cardChoicesSection.classList.toggle('hidden');
        transition.classList.toggle('hidden');
        transition.classList.toggle('darken');
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
        playAudio('cardOpenSFX');
        kaijiCard.classList.add(kaijiChoice);
        playerCard.classList.add(playerChoice);
    }, 1190);
};

let isReveal = false;
const showReveal = () => {
    applyCardChoices();
    revealChoices.classList.toggle('hidden');
    isReveal = true;
    isShowing = true;
    setTimeout(() => {
        isShowing = false;
    }, 2100);
};

const closeReveal = () => {
    revealChoices.classList.toggle('hidden');
};

const roundResult = () => {
    if (kaijiChoice === playerChoice) {
        //tie
        txtContents[8].content = txtContents[8].content.replace("x", kaijiChoice);
        txtLine = 7;
    } else if ((kaijiChoice === 'rock' && playerChoice === 'scissors') || 
    (kaijiChoice === 'paper' && playerChoice === 'rock') || 
    (kaijiChoice === 'scissors' && playerChoice === 'paper')) {
        //lose
        txtContents[9].content = txtContents[9].content.replace("x", capFirst(kaijiChoice));
        txtContents[9].content = txtContents[9].content.replace("y", playerChoice);
        txtLine = 8;
        setTimeout(() => {
            removeStar(playerStar, playerLive);
        }, 500)
        setTimeout(() => {
            addStar(kaijiStar, kaijiLive);
            loseLife();
        }, 1300);
    } else if ((playerChoice === 'rock' && kaijiChoice === 'scissors') || 
    (playerChoice === 'paper' && kaijiChoice === 'rock') || 
    (playerChoice === 'scissors' && kaijiChoice === 'paper')) {
        //win
        txtContents[10].content = txtContents[10].content.replace("x", kaijiChoice);
        txtContents[10].content = txtContents[10].content.replace("y", capFirst(playerChoice));
        txtLine = 9;
        setTimeout(() => {
            removeStar(kaijiStar, kaijiLive);
        }, 500)
        setTimeout(() => {
            addStar(playerStar, playerLive);
            addLife();
        }, 1300);
    };
    nextTxt(txtContents);
};

const replayRound = () => {
    if (txtLine === 8 || txtLine === 9 || txtLine === 10) {
        //round end
        txtLine = 10;
    } else if (txtLine === 11) {
        //back to choose card
        txtLine = 4; 
    };
    txtContents[8].content = "It's a tie! Both are x!";
    txtContents[9].content = "You lose! x beats y!";
    txtContents[10].content = "You win! y beats x!";
};

//text
const capFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

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
        content: "It's a tie! Both are x!"
    },
    {
        id: 9,
        content: "You lose! x beats y!"
    },
    {
        id: 10,
        content: "You win! y beats x!"
    },
    {
        id: 11,
        content: "Current status. Prepare for next round."
    },
    {
        id: 12,
        content: "Congratulations! You win the game!"
    },
    {
        id: 13,
        content: "You lose! You've lose all of your lives!"
    },
    {
        id: 14,
        content: "You lose! You've run out all of your cards!"
    },
    {
        id: 15,
        content: "Wanna try again?"
    },
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
    playAudio('txtSFX');
    window.txtTyping = setInterval(msg => {
        if (i === msg.length) {
            delayNext(700);
            cancelType();
            return;
        };
        text.textContent += msg[i++];
    }, txtSpeed, msg);
};

const cancelType = () => {
    txtEnd.style.display = 'inline-block';
    isAllTyped = true;
    stopAudio('txtSFX');
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
        if (isTxtOver || isGameOver) {
            return;
        };
        typeTxt(contents[++txtLine].content);

        //end dialogue
        if (txtLine >= 8 &&
            (kaijiLive <= 0 || playerLive <= 0 || 
            (rockNum === 0 && paperNum === 0 && scissorsNum === 0))) {
            isGameOver = true;
        };
    } else {
        cancelType();
        text.textContent = '';
        text.textContent = contents[txtLine].content;
        delayNext(700);
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

let isGameOver = false;
const gameOver = () => {
    if (!isAllTyped || isDelay || isGameOver || txtLine <= 8) {
        return;
    };
    
    //player win
    if (kaijiLive <= 0) {
        txtLine = 11;
        stopAudio('bgm');
        playAudio('clapSFX');
    };
    //player lose
    if (playerLive <= 0 || (rockNum === 0 && paperNum === 0 && scissorsNum === 0)) {
        stopAudio('bgm');
        if (playerLive <= 0) {
            txtLine = 12;
        } else if (rockNum === 0 && paperNum === 0 && scissorsNum === 0) {
            txtLine = 13;
        };
    };
};

const game = () => {
    if (isShowing || isDelay) {
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

//end screens
const endScreen = document.querySelector('.end');
const replayScreen = document.querySelector('.replay-div');
const replayBtn = document.querySelectorAll('.replay-div > button');

const replayCheck = () => {
    if (isDelay || !isGameOver) {
        return;
    };

    if (isGameOver && isAllTyped && txtLine >= 12) {
        isGameOver = false;
        txtLine = 14;
        textBox.style.pointerEvents = 'none';
        
        endScreen.classList.toggle('hidden');
        replayScreen.classList.toggle('hidden');
    };
};

const resetAll = () => {
    //live
    kaijiLive = 3;
    playerLive = 3;
    kaijiStar.innerHTML = `
    <div class="life-point"></div>
    <div class="life-point"></div>
    <div class="life-point"></div>
    `;
    playerStar.innerHTML = `
    <div class="life-point"></div>
    <div class="life-point"></div>
    <div class="life-point"></div>
    `;
    //card
    rockNum = 4;
    paperNum = 4;
    scissorsNum = 4;
    cardNum[0].textContent = rockNum;
    cardNum[1].textContent = paperNum;
    cardNum[2].textContent = scissorsNum;
    cardChoices[0].style.display = 'block';
    cardChoices[1].style.display = 'block';
    cardChoices[2].style.display = 'block';
    //txt
    isTxtOver = false;
    isGameOver = false;
    txtLine = 0;
    text.textContent = txtContents[0].content;
    textBox.style.pointerEvents = 'auto';
};

replayBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        transition.classList.toggle('hidden');
        transition.classList.toggle('start-ease');

        setTimeout(() => {
            endScreen.classList.toggle('hidden');
            replayScreen.classList.toggle('hidden');
            resetAll();
            if (btn.id === 'replay-yes') {
                playAudio('bgm');
            }
            if (btn.id === 'replay-no') {
                startMenu.classList.toggle('hidden');
                mainGame.classList.toggle('hidden');
            };
        }, 2000);

        setTimeout(() => {
            transition.classList.toggle('hidden');
            transition.classList.toggle('start-ease');
        }, 3000);
    });
});

text.textContent = txtContents[0].content;
textBox.addEventListener('click', () => {
    gameOver();
    replayCheck();
    game();
});

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'Enter':
            gameOver();
            replayCheck();
            game();
            break;
    };
});

//header
const headerBar = document.querySelector('.fa-bars');
const headerMenu = document.querySelector('header > ul');
let isWindowOn = false;
const windowOn = () => {
    setTimeout(() => {
        isWindowOn = true;
    }, 10);
};

headerBar.addEventListener('click', () => {
    if (!isWindowOn) {
        headerMenu.classList.toggle('hidden');
        textBox.style.pointerEvents = 'none';
        windowOn();
    };
});

const volBtn = document.getElementById('volBtn');
const volIcon = document.getElementById('volIcon');
const aboutBtn = document.getElementById('aboutBtn');
const about = document.querySelector('.about');
const toStartMenuBtn = document.getElementById('startMenuBtn');
const toStartMenu = document.querySelector('.to-start-menu');
const restartBtn = document.getElementById('restart');
const xMark = document.querySelectorAll('.fa-xmark');

volBtn.addEventListener('click', () => {
    if (isAudioOpen) {
        stopAudio('bgm');
        isAudioOpen = false;
        volIcon.classList.remove('fa-volume-high');
        volIcon.classList.add('fa-volume-xmark');
    } else if (!isAudioOpen) {
        isAudioOpen = true;
        playAudio('bgm');
        volIcon.classList.remove('fa-volume-xmark');
        volIcon.classList.add('fa-volume-high');
    }
});

aboutBtn.addEventListener('click', () => {
    about.classList.toggle('hidden');
});

toStartMenuBtn.addEventListener('click', () => {
    toStartMenu.classList.toggle('hidden');
});

restartBtn.addEventListener('click', () => {
    transition.classList.toggle('hidden');
    transition.classList.toggle('start-ease');
    stopAudio('bgm');

    setTimeout(() => {
        toStartMenu.classList.toggle('hidden');
        resetAll();
        startMenu.classList.toggle('hidden');
        mainGame.classList.toggle('hidden');
    }, 2000);

    setTimeout(() => {
        transition.classList.toggle('hidden');
        transition.classList.toggle('start-ease');
    }, 3000);
});

xMark.forEach(mark => {
    mark.addEventListener('click', () => {
        if (mark.id === 'aboutX') {
            about.classList.toggle('hidden');
        } else if (mark.id === 'to-start-menuX') {
            toStartMenu.classList.toggle('hidden');
        };
    });
})

//close when click outside
window.onclick = (e) => {
    if (isWindowOn) {
        if (headerBar.contains(e.target) || !headerMenu.contains(e.target) 
            && !about.contains(e.target) && !toStartMenu.contains(e.target)) {
            headerMenu.classList.toggle('hidden');
            textBox.style.pointerEvents = 'auto';
            isWindowOn = false;
        };
    };
};