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

//cards
const cardChoicesSection = document.getElementById('player-choices');
const cardChoices = document.querySelectorAll('#player-choices > *');
const rockNumTxt = document.getElementById('rockNum');
const paperNumTxt = document.getElementById('paperNum');
const scissorsNumTxt = document.getElementById('scissorsNum');
let rockNum = 4;
let paperNum = 4;
let scissorsNum = 4;

let isCardsShowing = false;
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
    isCardsShowing = true;
};

let playerChoice = '';
cardChoices.forEach(choice => {
    //player choose card
    choice.addEventListener('click', () => {
        switch (choice.id) {
            case 'rock':
                rockNumTxt.textContent = --rockNum;
                break;
            case 'paper':
                paperNumTxt.textContent = --paperNum;
                break;
            case 'scissors':
                scissorsNumTxt.textContent = --scissorsNum;
                break;
        };
        playAudio(cardSFX1);
        playerChoice = choice.id;
        cardChoicesSection.classList.toggle('hidden');
        darkenScreen.classList.toggle('hidden');
        isCardsShowing = false;
        nextText(textContents);
        textLine++;
    })
});

const kaijiCard = document.getElementById('kaiji-card');
const playerCard = document.getElementById('player-card');

let kaijiChoice = '';
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
    }
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
    return;
};

let isRevealShowing = false;
const revealChoices = document.getElementById('reveal-cards');
const showReveal = () => {
    isCardsShowing = true;
    isRevealShowing = true;
    applyCardChoices();
    revealChoices.classList.toggle('hidden');
    textBox.style.pointerEvents = "none";
    setTimeout(() => {
        textBox.style.pointerEvents = "auto";
        isCardsShowing = false;
    }, 2000)
};

const cardResult = () => {
    console.log(kaijiChoice, playerChoice);
    
    if (kaijiChoice === playerChoice) {
        textLine = 8;
    } else if ((kaijiChoice === 'rock' && playerChoice === 'scissors') || 
    (kaijiChoice === 'paper' && playerChoice === 'rock') || 
    (kaijiChoice === 'scissors' && playerChoice === 'paper')) {
        textLine = 9; 
    } else if ((playerChoice === 'rock' && kaijiChoice === 'scissors') || 
    (playerChoice === 'paper' && kaijiChoice === 'rock') || 
    (playerChoice === 'scissors' && kaijiChoice === 'paper')) {
        textLine = 10;
    };
    typeText(textContents[textLine].content);
    return;
};

//lives
const kaijiStar = document.getElementById('kaiji-lp');
const playerStar = document.getElementById('player-lp');
let kaijiLive = 3;
let playerLive = 3;

const removeStar = (who, live) => {
    who.lastElementChild.classList.add('remove-star');
    setTimeout(() => {
        who.removeChild(who.lastElementChild);
    }, 1000);
    live--;
};

const addStar = (who, live) => {
    const liveP = document.createElement('div');
    liveP.classList.add('life-point');
    who.append(liveP);
    live++;
};

//text
const textBox = document.getElementById('text-box');
const text = document.getElementById('text');
const textEnd = document.querySelector('.sparkle');

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
    }
];
const txtJap = [
    {
        id: 0,
        content: "ようこそ。クリックするか、Enterを押して続行してください。"
    },
    {
        id: 1,
        content: "これは限定じゃんけんです。基本的にはじゃんけんですが、ライフと制限カードがあります。"
    },
    {
        id: 2,
        content: "各カードは4枚ずつあり、カードを使用するたびに消費されます。右下の星がライフです。星やカードを全て失うとゲームオーバーです。"
    },
    {
        id: 3,
        content: "カイジと競争してゲームに勝利しよう！"
    },
    {
        id: 4,
        content: "ゲーム開始！"
    },
    {
        id: 5,
        content: "カードを選択してください。"
    },
    {
        id: 6,
        content: "セット"
    },
    {
        id: 7,
        content: "オープン!"
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
    }
];

let textContents = txtEng;

let isAllTyped = true;
let typeSpeed = 30;
const typeText = (msg) => {
    text.textContent = '';
    textEnd.style.display = 'none';
    isAllTyped = false;
    let i = 0;
    playAudio(txtSFX);
    window.txtTyping = setInterval(msg => {
        if (i === msg.length) {
            clearInterval(window.txtTyping);
            textEnd.style.display = 'inline';
            stopAudio(txtSFX);
            isAllTyped = true;
            return;
        };
        text.textContent += msg[i++];
    }, typeSpeed, msg);
};

//textLine = textContents id
let textLine = 1;
const nextText = (contents) => {
    if (textLine >= contents.length) {
        return;
    } else {
        typeText(contents[textLine].content);
        return;
    }; 
};

//first msg
text.textContent = textContents[0].content;

const gameOver = () => {
    if (textLine < 8) {
        return;
    };

    if (rockNum === 0 && paperNum === 0 && scissorsNum === 0) {
        text.textContent = 'Game over. You lose all of your cards.'
    };
};

const game = () => {
    //play bgm
    if (textLine === 1) {
        playAudio(bgm); 
    };
    console.log(textLine)
    
    //card result
    if (textLine === 8) {
        cardResult();
        return;
    };
    //replay round
    if (textLine === 12) {
        textLine = 5;
        return;
    };

    //play txt
    if (isCardsShowing === false) {
        //close reveal
        if (textLine !== 7 && isRevealShowing) {
            revealChoices.classList.toggle('hidden');
            isRevealShowing = false;
        };

        if (isAllTyped) {
            nextText(textContents);
            isAllTyped = false;

            //show card choices
            if (textLine === 5) {
                showChoices();
            };
            if (textLine === 7) {
                showReveal();
            };
            textLine++;
            
        } else {
            clearInterval(window.txtTyping);
            text.textContent = textContents[textLine - 1].content;
            textEnd.style.display = 'inline';
            isAllTyped = true;
            stopAudio(txtSFX);
            
        };
    } else {
        return;
    };
    console.log(textLine)
};

//input function
textBox.addEventListener('click', game);

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'Enter':
            game();
            
            break;
        case ' ':
            
            break;
    }
});

//header buttons
const aboutBtn = document.getElementById('aboutBtn');
const restartBtn = document.getElementById('restartBtn');
const langBtn = document.getElementById('langBtn');
const bgmBtn = document.getElementById('bgmBtn');
const bgmIcon = document.getElementById('bgmIcon');

restartBtn.addEventListener('click', () => {
    location.reload();
});

langBtn.addEventListener('click', () => {
    clearInterval(window.txtTyping);
    text.textContent = '';

    if (langBtn.textContent === '日本語') {
        //change to Eng
        langBtn.textContent = 'English';
        restartBtn.textContent = 'リスタート';
        aboutBtn.textContent = '概要';
        document.querySelector('html').setAttribute('lang', 'ja');

        typeSpeed = 60;
        textContents = txtJap;
        textEnd.style.marginLeft = '-10px';
        typeText(textContents[textLine - 1].content);

    } else if (langBtn.textContent === 'English') {
        //change to Jap
        langBtn.textContent = '日本語';
        restartBtn.textContent = 'Restart';
        aboutBtn.textContent = 'About';
        document.querySelector('html').setAttribute('lang', 'en');

        typeSpeed = 30;
        textContents = txtEng;
        textEnd.style.marginLeft = '5px';
        typeText(textContents[textLine - 1].content);
    }

    //prevent font size change el height
    resizeElHeight();
});

bgmBtn.addEventListener('click', () => {
    if (isAudioOpen) {
        bgmIcon.classList.remove('fa-volume-high');
        bgmIcon.classList.add('fa-volume-xmark');
        
        stopAudio(bgm);
        stopAudio(txtSFX);
        isAudioOpen = false; //put last to prevent stopAudio return

    } else {
        bgmIcon.classList.remove('fa-volume-xmark');
        bgmIcon.classList.add('fa-volume-high');
        isAudioOpen = true;

        //replay audio
        if (textLine !== 0) {
            playAudio(bgm);
        };

        if (!isAllTyped) {
            playAudio(txtSFX);
        };
    }
})
