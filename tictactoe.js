// game variables

    let playerOneWeapon;
    let playerOneMoves = [];
    let PlayerTwoWeapon;
    let playerTwoMoves = [];
    let playerOneTurn = true;
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
const startButton = document.querySelector('#start-button');
const choiceButtons = document.querySelectorAll('.button');
const playAgainButtons = document.querySelectorAll('.again-button');
const gameBoard = document.querySelector('.gameboard');
const playerSelect = document.querySelector('.player-select');
const message = document.querySelector('.message');
const gameSquare = document.querySelectorAll('.game-square')
const playAgain = document.querySelector('.play-again')

// functions

const getPlayerChoice = () => {

    menu.classList = 'display-none'
    playerSelect.classList = 'player-select-active'
    message.innerHTML = '<h1>Choose your weapon!</h1>'
}

const startGame = (e) => {

    // set the symbol of each player
    playerOneWeapon = e.target.innerHTML
    if (playerOneWeapon === "X") {
        PlayerTwoWeapon = "O"
    } else {
        PlayerTwoWeapon = "X"
    };

    // menu disappears and gameboard appears
    playerSelect.classList = 'player-select';
    playerSelect.classList = 'player-select';
    gameBoard.classList = 'gameboard-active';
    message.innerHTML = "<h1>Player One's Turn</h1>"
};

const playerAction = (e) => {
    // get the square the player clicks on
    const square = parseInt(e.target.attributes[2].value)
    
    // what happens on click
    if (playerOneTurn === true) {
        if (e.target.innerHTML === '') {
            e.target.innerHTML = playerOneWeapon;
            playerOneTurn = !playerOneTurn;
            playerOneMoves.push(square);

            if (playerOneMoves.length >= 3) {
                if (checkWinner(playerOneMoves) === true) {
                    message.innerHTML = "<h1>Player One Wins</h1>";
                    playAgain.classList = 'play-again-active';
                };
            };

            if (playerOneMoves.length + playerTwoMoves.length >= 9) {
                if (checkWinner(playerOneMoves) !== true){
                    message.innerHTML = "<h1>It's a Draw!</h1>";
                }
                playAgain.classList = 'play-again-active';
            };
            
            if (message.innerHTML != "<h1>It's a Draw!</h1>") {
                if (message.innerHTML != "<h1>Player One Wins</h1>") {
                    message.innerHTML = "<h1>Player Two's Turn</h1>";
                };
            } else {
                return
            };
            
        } else {
            return
        }
        
    } else { 
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

const checkWinner = (playerMoves) => {
    let theOutcome;
    winningCombos.forEach(combo => {
        if (playerMoves.includes(combo[0]) && playerMoves.includes(combo[1]) && playerMoves.includes(combo[2])) {
            theOutcome = true;
        }
    });
    return theOutcome
};

const resetGame = (e) => {
    if (e.target.innerHTML === "Yes") {
        playerOneMoves = [];
        playerTwoMoves = [];
        playerOneTurn = true;
        playAgain.classList = 'play-again';
        
        gameSquare.forEach(square => {
            square.innerHTML = '';
        });
        message.innerHTML = "<h1>Player One's Turn</h1>"
    } else { 
            playerOneWeapon = undefined;
            playerOneMoves = [];
            PlayerTwoWeapon = undefined;
            playerTwoMoves = [];
            playerOneTurn = true;
            playAgain.classList = 'play-again';
            gameBoard.classList = 'gameboard';
            gameSquare.forEach(square => {
                square.innerHTML = '';
            });
            menu.classList = 'menu';
            message.innerHTML = "<h1>Tic Tac Toe Battle</h1>";
    };
};

// winningCombos.forEach(combo => {
//     let total = 0
//     let multTotal = 1   
//     combo.forEach (number => {
//         total += number
//         multTotal *= number
//     })
    
//     console.log("plus:" + total)
//     console.log("mult:" + multTotal)
// });

// event listeners

gameSquare.forEach(square => {
    square.addEventListener('click', playerAction)
});

choiceButtons.forEach(button => {
    button.addEventListener('click', startGame);
});

playAgainButtons.forEach(playAgainbutton => {
    playAgainbutton.addEventListener('click', resetGame);
});

startButton.addEventListener('click', getPlayerChoice);