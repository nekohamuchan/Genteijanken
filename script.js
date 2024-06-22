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
}

console.log();