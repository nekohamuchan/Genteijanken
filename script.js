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
    window.txtTyping = setInterval(msg => {
        if (i === msg.length) {
            cancelType();
            delayNext(500);
            return;
        }
        text.textContent += msg[i++];
    }, txtSpeed, msg);
};

const cancelType = () => {
    txtEnd.style.display = 'inline-block';
    isAllTyped = true;
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
    if (isAllTyped && !isDelay) {
        if (isTxtOver) {
            return;
        };
        typeTxt(contents[txtLine++].content);
    } else {
        cancelType();
        text.textContent = '';
        text.textContent = contents[txtLine - 1].content;
        delayNext(700);
    };
    txtOver(contents);
};

let isTxtOver = false;
const txtOver = (contents) => {
    if (txtLine >= contents.length) {
        isTxtOver = true;
    };
};

textBox.addEventListener('click', () => {
    nextTxt(txtEng);
});


