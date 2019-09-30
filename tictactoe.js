// game variables

    let playerOneWeapon;
    let playerOneMoves = [];
    let PlayerTwoWeapon;
    let playerTwoMoves = [];
    let cpuWeapon;
    let cpuMoves = [];
    let playerOneTurn = true;
    let singlePlayerGame = false; 
    let cpuFails = 0;
    const winningCombos = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [1,4,7],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [7,5,3]
    ];

// query selectors

const menu = document.querySelector('.menu');
const startButtons = document.querySelectorAll('.start-buttons');
const choiceButtons = document.querySelectorAll('.button');
const playAgainButtons = document.querySelectorAll('.again-button');
const gameBoard = document.querySelector('.gameboard');
const playerSelect = document.querySelector('.player-select');
const message = document.querySelector('.message');
const gameSquare = document.querySelectorAll('.game-square');
const playAgain = document.querySelector('.play-again');

// functions

const getPlayerChoice = (e) => {
    if(e.target.innerHTML === "Single Player") {
        singlePlayerGame = true;
    }

    menu.classList = 'display-none';
    playerSelect.classList = 'player-select-active';
    message.innerHTML = '<h1>Choose your weapon!</h1>';
}

const startGame = (e) => {

    // set the symbol of each player
    if (singlePlayerGame === false) {
        playerOneWeapon = e.target.innerHTML
        if (playerOneWeapon === "X") {
            PlayerTwoWeapon = "O";
        } else {
            PlayerTwoWeapon = "X";
        };
    } else {
        playerOneWeapon = e.target.innerHTML
        if (playerOneWeapon === "X") {
            cpuWeapon = "O";
        } else {
            cpuWeapon = "X";
        };
    }
   
    // menu disappears and gameboard appears
    playerSelect.classList = 'player-select';
    playerSelect.classList = 'player-select';
    gameBoard.classList = 'gameboard-active';
    message.innerHTML = "<h1>Player One's Turn</h1>";
};

const playerAction = (e) => {
    // get the square the player clicks on
    const square = parseInt(e.target.attributes[2].value);
    
    // what happens on click
    if (playerOneTurn === true) {
        if (e.target.innerHTML === '') {
            e.target.innerHTML = playerOneWeapon;
            playerOneTurn = !playerOneTurn;
            playerOneMoves.push(square);

            // check if player one wins
            if (playerOneMoves.length >= 3) {
                if (checkWinner(playerOneMoves) === true) {
                    message.innerHTML = "<h1>Player One Wins</h1>";
                    playerOneTurn = !playerOneTurn;
                    playAgain.classList = 'play-again-active';
                };
            };

            // check for a draw
            if (playerOneMoves.length + playerTwoMoves.length >= 9 || playerOneMoves.length + cpuMoves.length >= 9) {
                if (checkWinner(playerOneMoves) !== true){
                    message.innerHTML = "<h1>It's a Draw!</h1>";
                }
                playAgain.classList = 'play-again-active';
            };
            
            if (message.innerHTML != "<h1>It's a Draw!</h1>") {
                if (message.innerHTML != "<h1>Player One Wins</h1>") {
                    if (singlePlayerGame === true) {
                        message.innerHTML = "<h1>Computer's Turn</h1>";
                    } else {
                        message.innerHTML = "<h1>Player Two's Turn</h1>";
                    }
                    
                };
            } else {
                return
            };
            
        } else {
            return
        }
        if (singlePlayerGame === true) {
            cpuTurn()
        }
    } else if (singlePlayerGame === false) { 
    
        if (e.target.innerHTML === '') {
            e.target.innerHTML = PlayerTwoWeapon;
            playerOneTurn = !playerOneTurn;
            playerTwoMoves.push(square);

            if (playerTwoMoves.length >= 3) {
                if (checkWinner(playerTwoMoves) === true) {
                    message.innerHTML = "<h1>Player Two Wins</h1>";
                    playAgain.classList = 'play-again-active';
                };
            };

            if (playerOneMoves.length + playerTwoMoves.length >= 9) {
                if (checkWinner(playerTwoMoves) !== true){
                    message.innerHTML = "<h1>It's a Draw!</h1>";
                }
                playAgain.classList = 'play-again-active';
            };

            if (message.innerHTML != "<h1>It's a Draw!</h1>") {
                if (message.innerHTML != "<h1>Player Two Wins</h1>") {
                    message.innerHTML = "<h1>Player One's Turn</h1>";
                };
            } else {
                return
            };
        } else {
            return;
        };
    };
};

const cpuTurn = () => {
    let cpuOptions;
    let chosenMove;
    let cpuChoice;
    // computers turn
    const playerLastMove = playerOneMoves[playerOneMoves.length - 1]
    if (playerOneTurn === false) {
        setTimeout(() => {
            if (cpuFails >= 2) {
                cpuOptions = optionsAvailable();
                console.log(cpuOptions);
                chosenMove = Math.floor((Math.random() * cpuOptions.length));
                cpuChoice = cpuOptions[chosenMove];
                gameSquare[cpuChoice].innerHTML = cpuWeapon;
                cpuMoves.push(parseInt(gameSquare[cpuChoice].attributes[2].value));
                playerOneTurn = !playerOneTurn;
                cpuFails = 0;
                computerChecker()
            } else {
                switch(playerLastMove) {
                    case 1:
                        cpuOptions = [4,8,6,1];
                        chosenMove = Math.floor((Math.random() * cpuOptions.length));
                        cpuChoice = cpuOptions[chosenMove];
                        if(gameSquare[cpuChoice].innerHTML === '') {
                            gameSquare[cpuChoice].innerHTML = cpuWeapon;
                            cpuMoves.push(parseInt(gameSquare[cpuChoice].attributes[2].value));
                            playerOneTurn = !playerOneTurn;
                            computerChecker();
                        break;
                        } else {
                            cpuFails += 1;
                            cpuTurn();
                            break;
                        }
                    case 2:
                        cpuOptions = [4,7,0,2];
                        chosenMove = Math.floor((Math.random() * cpuOptions.length));
                        cpuChoice = cpuOptions[chosenMove];
                        if(gameSquare[cpuChoice].innerHTML === '') {
                            gameSquare[cpuChoice].innerHTML = cpuWeapon;
                            cpuMoves.push(parseInt(gameSquare[cpuChoice].attributes[2].value));
                            playerOneTurn = !playerOneTurn;
                            computerChecker();
                        break;
                        } else {
                            cpuFails += 1;
                            cpuTurn();
                            break;
                        }
                    case 3: 
                        cpuOptions = [4,6,8,3];
                        chosenMove = Math.floor((Math.random() * cpuOptions.length));
                        cpuChoice = cpuOptions[chosenMove];
                        if(gameSquare[cpuChoice].innerHTML === '') {
                            gameSquare[cpuChoice].innerHTML = cpuWeapon;
                            cpuMoves.push(parseInt(gameSquare[cpuChoice].attributes[2].value));
                            playerOneTurn = !playerOneTurn;
                            computerChecker();
                        break;
                        } else {
                            cpuFails += 1;
                            cpuTurn();
                            break;
                        }
                    case 4:
                        cpuOptions = [4,5,2,3];
                        chosenMove = Math.floor((Math.random() * cpuOptions.length));
                        cpuChoice = cpuOptions[chosenMove];
                        if(gameSquare[cpuChoice].innerHTML === '') {
                            gameSquare[cpuChoice].innerHTML = cpuWeapon;
                            cpuMoves.push(parseInt(gameSquare[cpuChoice].attributes[2].value));
                            playerOneTurn = !playerOneTurn;
                            computerChecker();
                        break;
                        } else {
                            cpuFails += 1;
                            cpuTurn();
                            break;
                        }
                    case 5:
                        cpuOptions = [0,2,6,8];
                        chosenMove = Math.floor((Math.random() * cpuOptions.length));
                        cpuChoice = cpuOptions[chosenMove];
                        if(gameSquare[cpuChoice].innerHTML === '') {
                            gameSquare[cpuChoice].innerHTML = cpuWeapon;
                            cpuMoves.push(parseInt(gameSquare[cpuChoice].attributes[2].value));
                            playerOneTurn = !playerOneTurn;
                            computerChecker();
                        break;
                        } else {
                            cpuFails += 1;
                            cpuTurn();
                            break;
                        }

                    case 6:
                        cpuOptions = [0,2,3,8];
                        chosenMove = Math.floor((Math.random() * cpuOptions.length));
                        cpuChoice = cpuOptions[chosenMove];
                        if(gameSquare[cpuChoice].innerHTML === '') {
                            gameSquare[cpuChoice].innerHTML = cpuWeapon;
                            cpuMoves.push(parseInt(gameSquare[cpuChoice].attributes[2].value));
                            playerOneTurn = !playerOneTurn;
                            computerChecker();
                        break;
                        } else {
                            cpuFails += 1;
                            cpuTurn();
                            break;
                        }

                    case 7:
                        cpuOptions = [0,2,4,8];
                        chosenMove = Math.floor((Math.random() * cpuOptions.length));
                        cpuChoice = cpuOptions[chosenMove];
                        if(gameSquare[cpuChoice].innerHTML === '') {
                            gameSquare[cpuChoice].innerHTML = cpuWeapon;
                            cpuMoves.push(parseInt(gameSquare[cpuChoice].attributes[2].value));
                            playerOneTurn = !playerOneTurn;
                            computerChecker();
                        break;
                        } else {
                            cpuFails += 1;
                            cpuTurn();
                            break;
                        }
                    case 8:
                        cpuOptions = [0,1,4,8];
                        chosenMove = Math.floor((Math.random() * cpuOptions.length));
                        cpuChoice = cpuOptions[chosenMove];
                        if(gameSquare[cpuChoice].innerHTML === '') {
                            gameSquare[cpuChoice].innerHTML = cpuWeapon;
                            cpuMoves.push(parseInt(gameSquare[cpuChoice].attributes[2].value));
                            playerOneTurn = !playerOneTurn;
                            computerChecker();
                        break;
                        } else {
                            cpuFails += 1;
                            cpuTurn();
                            break;
                        }
                    case 9:
                        cpuOptions = [0,2,6,4];
                        chosenMove = Math.floor((Math.random() * cpuOptions.length));
                        cpuChoice = cpuOptions[chosenMove];
                        if(gameSquare[cpuChoice].innerHTML === '') {
                            gameSquare[cpuChoice].innerHTML = cpuWeapon;
                            cpuMoves.push(parseInt(gameSquare[cpuChoice].attributes[2].value));
                            playerOneTurn = !playerOneTurn;
                            computerChecker();
                        break;
                        } else {
                            cpuFails += 1;
                            cpuTurn();
                            break;
                        }
                };
            };
        }, 300);
    };
};

const computerChecker = () => {
    
    if (cpuMoves.length >= 3) {
        if (checkWinner(cpuMoves) === true) {
            message.innerHTML = "<h1>The Computer Wins</h1>";
            playAgain.classList = 'play-again-active';
        };
    };

    // check for a draw
    if (playerOneMoves.length + cpuMoves.length >= 9) {
        if (checkWinner(cpuMoves) !== true){
            message.innerHTML = "<h1>It's a Draw!</h1>";
        }
        playAgain.classList = 'play-again-active';
    };
    
    if (message.innerHTML != "<h1>It's a Draw!</h1>") {
        if (message.innerHTML != "<h1>The Computer Wins</h1>" && message.innerHTML != "<h1>Player One's Turn</h1>") {
                message.innerHTML = "<h1>Player One's Turn</h1>";
        };
    };
};

const optionsAvailable = () => {
    let options = [];
    gameSquare.forEach(square => {
        if (square.innerHTML == '') {
            options.push(parseInt(square.attributes[2].value -1 ));
        }; 
    });
    return options;
};

const checkWinner = (playerMoves) => {
    let theOutcome;
    winningCombos.forEach(combo => {
        if (playerMoves.includes(combo[0]) && playerMoves.includes(combo[1]) && playerMoves.includes(combo[2])) {
            theOutcome = true;
        }
    });
    return theOutcome;
};

const resetGame = (e) => {
    if (e.target.innerHTML === "Yes") {
        playerOneMoves = [];
        cpuMoves = [];
        playerTwoMoves = [];
        playerOneTurn = true;
        playAgain.classList = 'play-again';
        
        gameSquare.forEach(square => {
            square.innerHTML = '';
        });
        message.innerHTML = "<h1>Player One's Turn</h1>";
    } else { 
            playerOneWeapon = undefined;
            playerOneMoves = [];
            PlayerTwoWeapon = undefined;
            playerTwoMoves = [];
            cpuWeapon = undefined;
            cpuMoves = [];
            playerOneTurn = true;
            cpuFails = 0;
            singlePlayerGame = false;
            playAgain.classList = 'play-again';
            gameBoard.classList = 'gameboard';
            gameSquare.forEach(square => {
                square.innerHTML = '';
            });
            menu.classList = 'menu';
            message.innerHTML = "<h1>Tic Tac Toe Battle</h1>";
    };
};

// event listeners

gameSquare.forEach(square => {
    square.addEventListener('click', playerAction);
});

choiceButtons.forEach(button => {
    button.addEventListener('click', startGame);
});

playAgainButtons.forEach(playAgainbutton => {
    playAgainbutton.addEventListener('click', resetGame);
});

startButtons.forEach(startButton => {
    startButton.addEventListener('click', getPlayerChoice);
});
