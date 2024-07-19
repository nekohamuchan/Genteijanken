//el height
let headerH = document.querySelector('header').offsetHeight;
const root = document.documentElement;
root.style.setProperty('--header-height', headerH + 'px');

window.addEventListener('resize', () => {
    headerH = document.querySelector('header').offsetHeight;
    root.style.setProperty('--header-height', headerH + 'px');
})

//text
const textBox = document.getElementById('text-box');
const text = document.getElementById('text');
const textEnd = document.querySelector('.sparkle');

const textContents = [
    {
        id: 1,
        content: "Welcome. Click to process."
    },
    {
        id: 2,
        content: "this is 2"
    },
    {
        id: 3,
        content: "this is 3"
    },
    {
        id: 4,
        content: "this is 4"
    },
    {
        id: 5,
        content: "this is 5"
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
    }, 50, msg);
}

let textLine = 0;
const nextText = (contents) => {
    if (textLine === contents.length - 1) {
        return;
    } else {
        text.textContent = '';
        textLine++;
        typeText(contents[textLine].content);
        return;
    }   
}

text.textContent = textContents[0].content;

textBox.addEventListener('click', () => {
    if (text.textContent === textContents[textLine].content) {
        nextText(textContents);
        return;
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