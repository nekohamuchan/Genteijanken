//el height
let headerH = document.querySelector('header').offsetHeight;
const root = document.documentElement;
root.style.setProperty('--header-height', headerH + 'px');

window.addEventListener('resize', () => {
    headerH = document.querySelector('header').offsetHeight;
    root.style.setProperty('--header-height', headerH + 'px');
})

//audios
const bgm = new Audio('./sounds/Espoir.mp3');
let isBgmPlaying = false;
bgm.volume = 0.2;
bgm.loop = true;
const txtSFX = new Audio('./sounds/text-scroll-1.mp3');
txtSFX.loop = true;

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

let isCardsShowing = false;
const darkenScreen = document.querySelector('.darken');
const showChoices = () => {
    cardChoicesSection.classList.toggle('hidden');
    darkenScreen.classList.toggle('hidden');
    isCardsShowing = true;
};

let playerChoice = '';
cardChoices.forEach(choice => {
    //player choose card
    choice.addEventListener('click', () => {
        playerChoice = choice.id;
        cardChoicesSection.classList.toggle('hidden');
        darkenScreen.classList.toggle('hidden');
        isCardsShowing = false;
        nextText(textContents);
    })
});

const kaijiCard = document.getElementById('kaiji-card');
const playerCard = document.getElementById('player-card');

const getKaijiChoice = () => {
    let kaijiChoice = '';
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
    return kaijiChoice;
};

const applyCardChoices = () => {
    kaijiCard.classList.add(getKaijiChoice());
    playerCard.classList.add(playerChoice);
    return;
};

let isRevealShowing = false;
const revealChoices = document.getElementById('reveal-cards');
const showReveal = () => {
    applyCardChoices();
    revealChoices.classList.toggle('hidden');
    textBox.style.pointerEvents = "none";
    isCardsShowing = true;
    isRevealShowing = true;
    setTimeout(() => {
        textBox.style.pointerEvents = "auto";
        isCardsShowing = false;
    }, 2300)
};

//text
const textBox = document.getElementById('text-box');
const text = document.getElementById('text');
const textEnd = document.querySelector('.sparkle');

const txtEng = [
    {
        id: 1,
        content: "Welcome. Click or press enter to continue."
    },
    {
        id: 2,
        content: "This is Genteijanken. It's basically rock, paper, scissors but with lives and limit cards."
    },
    {
        id: 3,
        content: "There are 4 cards of each type, which are consumed every time a card is played. The right-bottom stars is your lives. Game over if you lose all of your stars."
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
    {
        id: 7,
        content: "Set."
    },
    {
        id: 8,
        content: "Open!"
    },
    {
        id: 9,
        content: "Cards should dissapear"
    },
];
const txtJap = [
    {
        id: 1,
        content: "ようこそ。クリックするか、Enterを押して続行してください。"
    },
    {
        id: 2,
        content: "これは限定じゃんけんです。基本的にはじゃんけんですが、ライフと制限カードがあります。"
    },
    {
        id: 3,
        content: "各カードは4枚ずつあり、カードを使用するたびに消費されます。右下の星がライフです。星を全て失うとゲームオーバーです。"
    },
    {
        id: 4,
        content: "カイジと競争してゲームに勝利しよう！"
    },
    {
        id: 5,
        content: "ゲーム開始！"
    },
    {
        id: 6,
        content: "カードを選択してください。"
    },
    {
        id: 7,
        content: "セット"
    },
    {
        id: 8,
        content: "オープン!"
    },
    {
        id: 9,
        content: "カードは消えるはずだ"
    },
];

let textContents = txtEng;

let isAllTyped = true;
let typeSpeed = 30;
const typeText = (msg) => {
    textEnd.style.display = 'none';
    isAllTyped = false;
    let i = 0;
    txtSFX.play();
    window.txtTyping = setInterval(msg => {
        if (i === msg.length) {
            clearInterval(window.txtTyping);
            textEnd.style.display = 'inline';
            txtSFX.pause();
            txtSFX.currentTime = 0;
            isAllTyped = true;
            return;
        };
        text.textContent += msg[i++];
    }, typeSpeed, msg);
};

//textLine + 1 = textContents id
let textLine = 0;
const nextText = (contents) => {
    if (textLine === contents.length - 1) {
        return;
    } else {
        text.textContent = '';
        typeText(contents[++textLine].content);
        return;
    }; 
};

//first msg
text.textContent = textContents[0].content;

const game = () => {
    //play bgm
    if (textLine === 0) {
        bgm.play();
        isBgmPlaying = true;
    };

    //play txt
    if (!isCardsShowing) {
        if (text.textContent === textContents[textLine].content && isAllTyped) {
            nextText(textContents);
        } else {
            clearInterval(window.txtTyping);
            text.textContent = textContents[textLine].content;
            textEnd.style.display = 'inline';
            isAllTyped = true;
            txtSFX.pause();
            txtSFX.currentTime = 0;
            return;
        };
    } else {
        return;
    };

    //show card choices
    if (textLine === 5) {
        showChoices();
        return;
    };

    if (textLine === 7) {
        showReveal();
        return;
    };

    if (isRevealShowing) {
        revealChoices.classList.toggle('hidden');
        isRevealShowing = false;
    };
};

//input function
textBox.addEventListener('click', game);

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'Enter':
            game();
            getKaijiChoice();
            break;
        case ' ':
            console.log('test', document.querySelector('html').getAttribute('lang'));
            
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
        typeText(textContents[textLine].content);

    } else if (langBtn.textContent === 'English') {
        //change to Jap
        langBtn.textContent = '日本語';
        restartBtn.textContent = 'Restart';
        aboutBtn.textContent = 'About';
        document.querySelector('html').setAttribute('lang', 'en');

        typeSpeed = 30;
        textContents = txtEng;
        typeText(textContents[textLine].content);
    }
});

bgmBtn.addEventListener('click', () => {
    if (isBgmPlaying) {
        bgm.pause();
        bgm.currentTime = 0;
        bgmIcon.classList.remove('fa-volume-high');
        bgmIcon.classList.add('fa-volume-xmark');
        isBgmPlaying = false;

    } else {
        bgm.play();
        bgmIcon.classList.remove('fa-volume-xmark');
        bgmIcon.classList.add('fa-volume-high');
        isBgmPlaying = true;

    }
})
