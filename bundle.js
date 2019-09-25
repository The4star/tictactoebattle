(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
module.exports = function (arr, choose) {
  var output = []
  var result = []
  nck(0, choose)
  return output 

  function nck(index, nleft) {
    if (nleft === 0){
      output.push([].concat(result))
      return
    }

    if (nleft > arr.length - index) 
      return

    result.push(arr[index])
    nck(index+1, nleft -1)
    result.pop()

    nck(index+1, nleft)
  }
}


},{}],2:[function(require,module,exports){
// game variables
    const nck = require('enum-nck');

    let playerOneWeapon;
    let playerOneMoves = [];
    let PlayerTwoWeapon;
    let playerTwoMoves = [];
    let playerOneTurn = true;
    const winningCombos = [
        [1,2,3],
        [4,5,6],
        [7,8,9],
        [2,5,8],
        [3,6,9],
        [1,5,9],
        [7,5,3]
    ];




// query selectors

const menu = document.querySelector('.menu');
const startButton = document.querySelector('#start-button');
const choiceButtons = document.querySelectorAll('.button');
const gameBoard = document.querySelector('.gameboard');
const playerSelect = document.querySelector('.player-select');
const message = document.querySelector('.message');
const gameSquare = document.querySelectorAll('.game-square')

// functions

const getPlayerChoice = () => {

    menu.classList.replace('menu', 'menu-done');
    menu.addEventListener('animationend', () => {
        menu.classList.replace('menu-done', 'display-none');
        playerSelect.classList.replace('player-select', 'player-select-active');
        message.innerHTML = '<h1>Choose your weapon!</h1>'
    });
}

const startGame = (e) => {

    // set the symbol of each player
    playerOneWeapon = e.target.innerHTML
    if (playerOneWeapon === "X") {
        PlayerTwoWeapon = "O"
    } else {
        PlayerTwoWeapon = "X"
    };

    console.log("Player one:" + playerOneWeapon)
    console.log("Player two:" + PlayerTwoWeapon)

    playerSelect.classList.replace('player-select-active', 'menu-done');
    playerSelect.addEventListener('animationend', () => {
        playerSelect.classList.replace('menu-done', 'display-none');
        gameBoard.style.display = 'grid';
        message.innerHTML = "<h1>Player One's Turn</h1>"
    });
};

const playerAction = (e) => {

    const square = parseInt(e.target.attributes[2].value)
    
    if (playerOneTurn === true) {
        if (e.target.innerHTML === '') {
            e.target.innerHTML = playerOneWeapon;
            playerOneTurn = !playerOneTurn;
            playerOneMoves.push(square);

            if (playerOneMoves.length >= 3) {
                checkwinner(playerOneMoves)
            };
            if (checkwinner(playerOneMoves) === true) {
                message.innerHTML = "<h1>Player One Wins</h1>";
            };
            
            if (message.innerHTML != "<h1>Player One Wins</h1>") {
                message.innerHTML = "<h1>Player Two's Turn</h1>";
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
                checkwinner(playerTwoMoves)
            };
            if (checkwinner(playerTwoMoves) == true) {
                message.innerHTML = "<h1>Player Two Wins</h1>";
            };

            if (message.innerHTML != "<h1>Player Two Wins</h1>") {
                message.innerHTML = "<h1>Player One's Turn</h1>";
            };
            
        } else {
            return;
        };
    };
};

const checkwinner = (playerMoves) => {
    possibleWinCombos = nck(playerMoves)
    winningCombos.forEach((combo) => {
        possibleWinCombos.forEach(outcome => {
            if (outcome === combo){
                return true
            } else {
                return false
            }; 
        });
    });
};

// event listeners

gameSquare.forEach(square => {
    square.addEventListener('click', playerAction)
});

choiceButtons.forEach(button => {
    button.addEventListener('click', startGame);
});

startButton.addEventListener('click', getPlayerChoice);

},{"enum-nck":1}]},{},[2]);
