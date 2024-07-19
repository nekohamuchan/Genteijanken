//el height
let headerH = document.querySelector('header').offsetHeight;
const root = document.documentElement;
root.style.setProperty('--header-height', headerH + 'px');

window.addEventListener('resize', () => {
    headerH = document.querySelector('header').offsetHeight;
    root.style.setProperty('--header-height', headerH + 'px');
})

//show start screen after page onload
const startScreen = document.querySelector('.start-screen');
window.onload = () => {
    startScreen.style.animationName = 'start';
    setTimeout(() => {
        startScreen.style.display = 'none';
    }, 1800);
}

//text
const textBox = document.getElementById('text-box');
const text = document.getElementById('text');
const textEnd = document.querySelector('.sparkle');

let option;
const textContents = [
    {
        id: 1,
        content: "Welcome. Click to process."
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
        content: "Choose your card"
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

text.textContent = textContents[0].content;

//cards
const cardChoices = document.getElementById('player-choice');
const choiceReg = /Choose your card/;
text.addEventListener('change', () => {
    console.log('is changing');
})

//input function
textBox.addEventListener('click', () => {
    if (text.textContent === textContents[textLine].content) {
        nextText(textContents);
    } else {
        clearInterval(window.timeId1);
        text.textContent = textContents[textLine].content;
        textEnd.style.display = 'inline';
        return;
    };

});

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'Enter':
            
            break;
    }
})

//header button
const aboutBtn = document.getElementById('aboutBtn');
const restartBtn = document.getElementById('restartBtn');
const langBtn = document.getElementById('langBtn');



/*
//main
let computerScore = 0;
let playerScore = 0;

const getComputerChoice = () => {
    const randomInt = Math.floor(Math.random() * 3);
    let computerChoice = "";
    
    switch (randomInt) {
        case 0:
            computerChoice = "Rock";
            break;
        case 1:
            computerChoice = "Paper";
            break;
        case 2:
            computerChoice = "Scissors"
            break;
    }

    return computerChoice;
}

const getPlayerChoice = () => {
    //const playerChoice = prompt("Your choice?");
    //return playerChoice;

    //test code
    const randomInt = Math.floor(Math.random() * 3);
    let computerChoice = "";
    
    switch (randomInt) {
        case 0:
            computerChoice = "Rock";
            break;
        case 1:
            computerChoice = "Paper";
            break;
        case 2:
            computerChoice = "Scissors"
            break;
    }

    return computerChoice;
}

const playRound = (playerSelect = getPlayerChoice().toLowerCase(),
 computerSelect = getComputerChoice().toLowerCase()) => {

    console.log(playerSelect, computerSelect);
    if ((playerSelect === "rock" && computerSelect === "scissors") || 
    (playerSelect === "paper" && computerSelect === "rock") || 
    (playerSelect === "scissors" && computerSelect === "paper")) {
        playerScore++;
        return `You win!`;
    } else if ((playerSelect === "rock" && computerSelect === "paper") || 
    (playerSelect === "paper" && computerSelect === "scissors") || 
    (playerSelect === "scissors" && computerSelect === "rock")) {
        computerScore++;
        return `You lose!`;
    } else {
        return `It's a tie!`;
    }

}

const playGame = () => {
    
    for (let i = 0; i < 5; i++) {
        console.log(playRound());
    }
    
    if (playerScore > computerScore) {
        return `Congratulations! You are the winner! 
        Your score: ${playerScore}
        Computer's score: ${computerScore}`;
    } else if (playerScore < computerScore) {
        return `You lose! Better luck next time! 
        Your score: ${playerScore}
        Computer's score: ${computerScore}`;
    } else {
        return `It's a tie! Better luck next time! 
        Your score: ${playerScore}
        Computer's score: ${computerScore}`;
    }
}

console.log(playGame());
*/