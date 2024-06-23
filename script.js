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
    const playerChoice = prompt("Your choice?");
    return playerChoice;

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

console.log(playRound());