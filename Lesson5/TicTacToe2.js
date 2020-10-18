let readline = require("readline-sync"); // first line in ttt.js

function Square(marker = " ") {
  this.marker = marker;
}
Square.randomUNUSED_SQUARE = " ";
Square.randomHUMAN_MARKER = "X";
Square.randomCOMPUTER_MARKER = "O";

Square.prototype.setMarker = function(marker) {
  this.marker = marker;
}

Square.prototype.getMarker = function() {
  return this.marker;
}

Square.prototype.toString = function() {
  return this.marker;
}

Square.prototype.isUnused = function() {
  return this.marker === Square.randomUNUSED_SQUARE;
}


function Board() {
  this.squares = {};
  for (let counter = 1; counter <= 9; ++counter) {
    this.squares[String(counter)] = new Square();
  }
}

Board.prototype.markSquareAt = function(key, marker) {
  this.squares[key].setMarker(marker);
}

Board.prototype.display = function() {
  console.log("");
  console.log("     |     |");
  console.log(`  ${this.squares["1"]}  |  ${this.squares["2"]}  |  ${this.squares["3"]}`);
  console.log("     |     |");
  console.log("-----+-----+-----");
  console.log("     |     |");
  console.log(`  ${this.squares["4"]}  |  ${this.squares["5"]}  |  ${this.squares["6"]}`);
  console.log("     |     |");
  console.log("-----+-----+-----");
  console.log("     |     |");
  console.log(`  ${this.squares["7"]}  |  ${this.squares["8"]}  |  ${this.squares["9"]}`);
  console.log("     |     |");
  console.log("");
}

Board.prototype.unusedSquares = function() {
  let keys = Object.keys(this.squares);
  // console.log(this.squares[1]);
  // console.log(this.squares[1].isUnused());
  return keys.filter(key => this.squares[key].isUnused());
}

Board.prototype.isFull = function() {
  return this.unusedSquares().length === 0;
}

Board.prototype.countMarkersFor = function(player, keys) {
  let markers = keys.filter(key => {

    // console.log(this.squares[key].getMarker());
    // console.log(player.getMarker());
    // console.log(this.squares[key].getMarker() === player.getMarker());
    return this.squares[key].getMarker() === player.getMarker();
  });
  // console.log("length: ", markers.length);
  return markers.length;
}

Board.prototype.displayWithClear = function() {
  console.clear();
  console.log("");
  console.log("");
  this.display();
}

function Player(marker = " ") {
  this.marker = marker;
}

Player.prototype.getMarker = function() {
  return this.marker;
}


function Human() {
  return new Player(Square.randomHUMAN_MARKER);
  // Player.call(this,Square.randomHUMAN_MARKER);
}

// Human.prototype = new Player();

function Computer() {
  return new Player(Square.randomCOMPUTER_MARKER);
}

function TTTGame() {
  this.board  = new Board();
  this.human = new Human();
  this.computer = new Computer();
  console.log(this.human);
  console.log(this.human.__proto__);
}

TTTGame.POSSIBLE_WINNING_ROWS = [
  [ "1", "2", "3" ],            // top row of board
  [ "4", "5", "6" ],            // center row of board
  [ "7", "8", "9" ],            // bottom row of board
  [ "1", "4", "7" ],            // left column of board
  [ "2", "5", "8" ],            // middle column of board
  [ "3", "6", "9" ],            // right column of board
  [ "1", "5", "9" ],            // diagonal: top-left to bottom-right
  [ "3", "5", "7" ],            // diagonal: bottom-left to top-right
];

TTTGame.prototype.play = function() {
  //SPIKE
  // this.displayWelcomeMessage();
  this.board.display();
  while (true) {
    this.humanMoves();
    if (this.gameOver.call(this)) break;

    this.computerMoves();
    if (this.gameOver.call(this)) break;

    // this.board.displayWithClear();
  }

  this.board.displayWithClear();
  this.displayResults();
  this.displayGoodbyeMessage();
}

TTTGame.prototype.humanMoves = function() { // was firstPlayerMoves
  let choice;

  while (true) {
    let validChoices = this.board.unusedSquares();
    // console.log(this.board.unusedSquares());
    const prompt = `Choose a square (${validChoices.join(", ")}): `;
    choice = readline.question(prompt);

    if (validChoices.includes(choice)) break;

    console.log("Sorry, that's not a valid choice.");
    console.log("");
  }

  this.board.markSquareAt(choice, Square.randomHUMAN_MARKER);
}

TTTGame.prototype.computerMoves = function() { // was secondPlayerMoves
  let validChoices = this.board.unusedSquares();
  let choice;

  do {
    choice = Math.floor((9 * Math.random()) + 1).toString();
  } while (!validChoices.includes(choice));
  this.board.markSquareAt(choice, this.computer.getMarker());
}

TTTGame.prototype.displayWelcomeMessage = function() {

  console.clear();
  console.log("Welcome to Tic Tac Toe!");

  console.log("");
}

TTTGame.prototype.displayGoodbyeMessage = function() {
  console.log("Thanks for playing Tic Tac Toe! Goodbye!");
}

TTTGame.prototype.displayResults = function() {
  // console.log(this.isWinner(this.human));
  if (this.isWinner(this.human)) {
    console.log("You won! Congratulations!");
  } else if (this.isWinner(this.computer)) {
    console.log("I won! I won! Take that, human!");
  } else {
    console.log("A tie game. How boring.");
  }
}

TTTGame.prototype.isWinner = function(player) {
  return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
    // console.log(row);
    // console.log(this.board.countMarkersFor(player,row));
    return this.board.countMarkersFor(player, row) === 3;
  });
}

TTTGame.prototype.someoneWon = function() {
  return TTTGame.POSSIBLE_WINNING_ROWS.some(row => {
    return this.isWinner(this.human, row) ||
            this.isWinner(this.computer, row);
  });
}

TTTGame.prototype.gameOver = function() {
  return this.board.isFull.call(this.board) || this.someoneWon.call(this);
}

let game = new TTTGame();
game.play();