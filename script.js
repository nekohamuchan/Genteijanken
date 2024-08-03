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

//audio
let audioOpened = true;
const audio = [
    {
        name: 'bgm',
        src: new Audio('./sounds/Espoir.mp3'),
        vol: 0.2,
        loop: true
    },
    {
        name: 'txtSFX',
        src: new Audio('./sounds/text-scroll.mp3'),
        loop: true
    },
    {
        name: 'cardChooseSFX',
        src: new Audio('./sounds/card-choose.mp3'),
        vol: 0.7
    },
    {
        name: 'cardOpenSFX',
        src: new Audio('./sounds/card-open.mp3'),
        vol: 0.7
    },
    {
        name: 'removeStarSFX',
        src: new Audio('./sounds/swish1_1.mp3'),
        vol: 0.4
    },
    {
        name: 'addStarSFX',
        src: new Audio('./sounds/swish1_1.mp3'),
        vol: 0.4
    },
    {
        name: 'clapSFX',
        src: new Audio('./sounds/short_clap2.mp3'),
        vol: 0.5
    },
    {
        name: 'selectSFX',
        src: new Audio('./sounds/select.mp3'),
        vol: 0.8
    },
    {
        name: 'hoverSFX',
        src: new Audio('./sounds/hover.mp3'),
        vol: 0.8
    },
    {
        name: 'boatSFX',
        src: new Audio('./sounds/boat_whistle.mp3'),
        vol: 0.9
    }
];

const playAudio = (name) => {
    if (!audioOpened) {
        return;
    };
    const song = audio.find(song => song.name === name);
    song.src.volume = song.vol ? song.vol : 1;
    song.src.loop = song.loop ? song.loop : false;
    song.src.play().catch(error => {
        console.log('Chrome cannot play sound without user interaction first');
    });
};
const stopAudio = (name) => {
    if (!audioOpened) {
        return;
    };
    const song = audio.find(song => song.name === name);
    song.src.pause();
    song.src.currentTime = 0;
};

const allBtn = document.querySelectorAll('.link, button');
allBtn.forEach(btn => {
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

const startTransition = (type) => {
    transition.classList.toggle('hidden');
    transition.classList.toggle(type);
};

const endTransition = (type) => {
    transition.classList.toggle('hidden');
    transition.classList.toggle(type);
};

setTimeout(() => {
    endTransition('load');
}, 2000);

startBtn.addEventListener('click', () => {
    playAudio('boatSFX');
    startTransition('start-ease');
    setTimeout(() => {
        startMenu.classList.toggle('hidden');
        mainGame.classList.toggle('hidden');
        resizeElHeight();
    }, 2000);
    setTimeout(() => {
        endTransition('start-ease');
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

const winRound = () => {
    setTimeout(() => {
        removeStar(kaijiStar);
    }, 500)
    setTimeout(() => {
        addStar(playerStar);
        kaijiLive--;
        playerLive++;
    }, 1300);
    setTimeout(() => {
        setEvent = false;
    }, 1700);
};

const loseRound = () => {
    setTimeout(() => {
        removeStar(playerStar);
    }, 500)
    setTimeout(() => {
        addStar(kaijiStar);
        playerLive--;
        kaijiLive++;
    }, 1300);
    setTimeout(() => {
        setEvent = false;
    }, 1700);
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
    startTransition('darken');

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

        cardChoicesSection.classList.toggle('hidden');
        endTransition('darken');
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

let revealed = false;
const showReveal = () => {
    revealed = true;
    applyCardChoices();
    revealChoices.classList.toggle('hidden');
    setTimeout(() => {
        setEvent = false;
    }, 2000);
};

const closeReveal = () => {
    revealed = false;
    revealChoices.classList.toggle('hidden');
};

const showRoundResult = () => {
    txtContents[8].content = "It's a tie! Both are same!";
    txtContents[9].content = "You lose! Kaiji beats Player!";
    txtContents[10].content = "You win! Player beats Kaiji!";
    if (kaijiChoice === playerChoice) {
        //tie
        txtContents[8].content = txtContents[8].content.replace("same", kaijiChoice);
        line = 7;

    } else if ((kaijiChoice === 'rock' && playerChoice === 'scissors') || 
    (kaijiChoice === 'paper' && playerChoice === 'rock') || 
    (kaijiChoice === 'scissors' && playerChoice === 'paper')) {
        //lose
        txtContents[9].content = txtContents[9].content.replace("Kaiji", capFirst(kaijiChoice));
        txtContents[9].content = txtContents[9].content.replace("Player", playerChoice);
        line = 8;

    } else if ((playerChoice === 'rock' && kaijiChoice === 'scissors') || 
    (playerChoice === 'paper' && kaijiChoice === 'rock') || 
    (playerChoice === 'scissors' && kaijiChoice === 'paper')) {
        //win
        txtContents[10].content = txtContents[10].content.replace("Kaiji", kaijiChoice);
        txtContents[10].content = txtContents[10].content.replace("Player", capFirst(playerChoice));
        line = 9;
    };
};

//text
const txtEng = [
    {
        line: 0,
        content: "Welcome. Click or press enter to continue."
    },
    {
        line: 1,
        content: "This is Genteijanken. It's basically rock, paper, scissors but with lives and limit cards."
    },
    {
        line: 2,
        content: "There are 4 cards of each type, which are consumed every time a card is played. The right-bottom stars is your lives. Game over if you lose all of your stars or cards."
    },
    {
        line: 3,
        content: "Try to compete Kaiji and win the game!"
    },
    {
        line: 4,
        content: "Game start!"
    },
    {
        line: 5,
        content: "Choose your card."
    },
    {
        line: 6,
        content: "Set."
    },
    {
        line: 7,
        content: "Open!"
    },
    {
        line: 8,
        content: "It's a tie! Both are same!"
    },
    {
        line: 9,
        content: "You lose! Kaiji beats Player!"
    },
    {
        line: 10,
        content: "You win! Player beats Kaiji!"
    },
    {
        line: 11,
        content: "Current status. Prepare for next round."
    },
    {
        line: 12,
        content: "Congratulations! You win the game!"
    },
    {
        line: 13,
        content: "You lose! You've lose all of your lives!"
    },
    {
        line: 14,
        content: "You lose! You've run out all of your cards!"
    },
    {
        line: 15,
        content: "Wanna try again?"
    },
];
let txtContents = txtEng;
let [{line}] = txtContents;
const textBox = document.getElementById('text-box');
const text = document.getElementById('text');
const txtEnd = document.querySelector('.sparkle');
let allTyped = true;
let delayed = false;
let setEvent = false;
let txtSpeed = 30;
let typeTxtInterval;

const capFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
};

const typeTxt = (msg) => {
    allTyped = false;
    text.textContent = '';
    txtEnd.style.display = 'none';
    let i = 0;
    playAudio('txtSFX');
    typeTxtInterval = setInterval(msg => {
        if (i === msg.length) {
            cancelType();
            return;
        };
        text.textContent += msg[i++];
    }, txtSpeed, msg);
};

const cancelType = () => {
    txtEnd.style.display = 'inline-block';
    stopAudio('txtSFX');
    allTyped = true;
    delayed = true;
    setTimeout(() => {
        delayed = false;
    }, 400);
    clearInterval(typeTxtInterval);
};

const nextTxt = (contents) => {
    if (delayed || line >= contents.length - 1) {
        return;
    };

    if (allTyped && !setEvent) {
        typeTxt(contents[++line].content);
    } else {
        cancelType();
        text.textContent = '';
        text.textContent = contents[line].content;
    };
};

const changeLine = () => {
    if (!allTyped || delayed || setEvent) {
        return;
    };

    if (line === 7) {
        showRoundResult();
        return;
    };

    if (line === 8 || line === 9 || line === 10) {
        //check game over
        if (kaijiLive <= 0 || playerLive <= 0 || 
            (rockNum === 0 && paperNum === 0 && scissorsNum === 0)) {
            gameOver();
            return;
        };
        //return to current status
        line = 10;
        return;
    };

    if (line === 11) {
        //return to choose card
        line = 4;
        return;
    };

    if (setGameOver) {
        checkReplay();
    };
};

const checkEvent = () => {
    //prevent firing again
    if (delayed || setEvent) {
        return;
    }

    if (line === 5) {
        showChoices();
    };

    if (line === 7) {
        setEvent = true;
        showReveal();
    };

    if (line !== 7 && revealed) {
        closeReveal();
    };

    if (line === 9) {
        setEvent = true;
        loseRound();
    };

    if (line === 10) {
        setEvent = true;
        winRound();
    };
};

const game = () => {
    changeLine();
    nextTxt(txtContents);
    checkEvent();
};

let setGameOver = false;
const gameOver = () => {
    setGameOver = true;
    stopAudio('bgm');
    //player win
    if (kaijiLive <= 0) {
        line = 11;
        playAudio('clapSFX');
        return;
    };
    //player lose
    if (playerLive <= 0) {
        line = 12;
        return;
    } else if (rockNum === 0 && paperNum === 0 && scissorsNum === 0) {
        line = 13;
        return;
    };
};

//end screens
const endScreen = document.querySelector('.end');
const replayScreen = document.querySelector('.replay-div');
const replayBtn = document.querySelectorAll('.replay-div > button');

const checkReplay = () => {
    line = 14;
    textBox.style.pointerEvents = 'none';   
    endScreen.classList.toggle('hidden');
    replayScreen.classList.toggle('hidden');
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
    setGameOver = false;
    line = 0;
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
    game();
});

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'Enter':
            game();
            break;
    };
});

//header
const headerBar = document.querySelector('.fa-bars');
const headerMenu = document.querySelector('header > ul');
let windowOpened = false;
const windowOn = () => {
    setTimeout(() => {
        windowOpened = true;
    }, 10);
};

headerBar.addEventListener('click', () => {
    if (!windowOpened) {
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
    if (audioOpened) {
        stopAudio('bgm');
        audioOpened = false;
        volIcon.classList.remove('fa-volume-high');
        volIcon.classList.add('fa-volume-xmark');
    } else if (!audioOpened) {
        audioOpened = true;
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

window.onclick = (e) => {
    //close when click outside
    if (windowOpened) {
        if (headerBar.contains(e.target) || !headerMenu.contains(e.target) 
            && !about.contains(e.target) && !toStartMenu.contains(e.target)) {
            headerMenu.classList.toggle('hidden');
            textBox.style.pointerEvents = 'auto';
            windowOpened = false;
        };
    };
};