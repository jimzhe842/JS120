// Game

// Deck
// Suit
// Card
// Shuffle

// Participant
// Player
// Dealer

// Hit
// Stay

const DEALER_THRESHOLD = 17;
const MAX_POINTS = 21;
const STARTING_CASH = 5;
const RICH_THRESHOLD = 10;
const BROKE_THRESHOLD = 0;
const CHOICE = {HIT: 'h', STAY: 's'};

let readline = require('readline-sync');

class Card {
  constructor(rank, suit) {
    this.rank = rank;
    this.suit = suit;
  }

  getRank() {
    return this.rank;
  }

  getFullCard() {
    return `${this.rank}[${this.suit}]`;
  }
}

class Deck {
  static RANKS = ('Ace 2 3 4 5 6 7 8 9 10 Jack Queen King').split(' ');
  static SUITS = ('dhcs').split('');

  static initDeck() {
    let deck = [];
    Deck.RANKS.forEach(rank => {
      Deck.SUITS.forEach(suit => {
        let card = new Card(rank,suit);
        deck.push(card);
      });
    });
    return deck;
  }

  constructor() {
    this.deck = Deck.initDeck();
  }

  shuffleDeck() {
    let deck = this.deck;
    for (let index = deck.length - 1; index > 0; index--) {
      let otherIndex = Math.floor(Math.random() * (index + 1)); // 0 to index
      [deck[index], deck[otherIndex]] = [deck[otherIndex], deck[index]]; // swap elements
    }
  }

  dealCard(participant, repeat = 1) {
    for (let rep = 0; rep < repeat; rep++) {
      let randomCard = this.deck[Math.floor(Math.random() * 52)]; // Deck does not run out
      participant.hand.push(randomCard); // Just pop the last value!
    }
  }
}

class Hand {
  static rankValues = {
    Ace: 11,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10:10,
    Jack: 10,
    Queen: 10,
    King: 10
  };

  constructor() {
    this.hand = [];
    this.sum = 0;
  }

  getSum() {
    let hand = this.hand;
    let acesCount = hand.filter(card => card === 'Ace').length;

    let rankValuesArr = hand.map(card => {
      let cardRank = card.getRank();
      return Hand.rankValues[cardRank];
    });

    let sum = rankValuesArr.reduce((sum, value) => sum + value, 0);
    while (sum > 21 && acesCount > 0) {
      sum -= 10;
      acesCount--;
    }

    return sum;
  }

  push(card) {
    this.hand.push(card);
  }

  joinAnd(arr, delimiter = ',', word = 'and') {
    if (arr.length <= 2) {
      return arr.join(` ${word} `);
    } else {
      return arr.slice(0, arr.length - 1).join(`${delimiter} `).concat(`${delimiter} ${word} ${arr[arr.length - 1]}`);
    }
  }

  formatHand() {
    let formattedCardsArr = this.hand.map(card => card.getFullCard());
    let formattedText = this.joinAnd(formattedCardsArr);
    return formattedText;
  }

  formatPartialHand() {
    let formattedCardsArr = this.hand.map(card => card.getFullCard());
    let formattedText = `${this.joinAnd(formattedCardsArr.slice(1), ',', '')} and unknown card`;
    return formattedText;
  }
}

class Participant {
  constructor() {
    this.score = 0;
    this.bust = false;
    this.hand = new Hand();
    this.points = 0;
  }

  newHand() {
    this.hand = new Hand();
  }

  displayHand() {
    let formattedHand = this.hand.formatHand();
    console.log(`You have ${formattedHand}`);
  }

  getScore() {
    return this.score;
  }

  addScore() {
    this.score++;
  }

  getPoints() {
    return this.points;
  }

  updatePoints() {
    this.points = this.hand.getSum();
    console.log(this.points);
  }

  updateBust() {
    this.bust = this.getPoints() > MAX_POINTS;
  }

  isBust() {
    return this.bust;
  }

  // setBust(value) {
  //   this.bust = value;
  // }
}

class Player extends Participant {
  constructor(money = STARTING_CASH) {
    super();
    this.money = money;
  }

  displaySum() {
    let sum = this.getPoints();
    console.log(`Your points are: ${sum}`);
  }

  getMoney() {
    return this.money;
  }

  addMoney(value) {
    this.money += value;
  }

  choose() {
    console.log("Hit or stay (h/s)?");
    let choice;
    while (true) {
      choice = readline.question();
      choice = choice.trim().toLowerCase()[0];
      if (!(`${CHOICE.HIT}${CHOICE.STAY}`.includes(choice))) {
        console.log("Invalid choice");
        console.log("Please enter (h/s)");
        console.log(' ');
      } else {
        break;
      }
    }

    return choice;
  }
}

class Dealer extends Participant {
  constructor() { //money) {
    super();
  }

  displayDealerHand() {
    let formattedHand = this.hand.formatPartialHand();
    console.log(`Dealer has ${formattedHand}`);
  }

  displayHand() {
    let formattedHand = this.hand.formatHand();
    console.log(`Dealer has ${formattedHand}`);
  }

  displaySum() {
    let sum = this.getPoints();
    console.log(`Dealer's points are: ${sum}`);
  }

  // displayHand() {
  //   let formattedHand = this.hand.formatHand();
  //   console.log(`You have ${formattedHand}`);
  // }

  choose() {
    console.log(this.getPoints());
    if (this.getPoints() < DEALER_THRESHOLD) {
      return CHOICE.HIT;
    } else {
      return CHOICE.STAY;
    }
  }
}

class TwentyOneGame {
  constructor() {
    this.player = new Player();
    this.dealer = new Dealer();
    this.deck = new Deck();
  }

  displayWelcome() {
    console.log("Welcome to Twenty One!");
    console.log(" ");
  }

  dealCards() {
    // console.log("Dealing cards");
    this.deck.dealCard(this.player,2);
    this.deck.dealCard(this.dealer,2);
    console.log(" ");
  }

  displayGameInfo() {
    console.log("Scores: ");
    console.log(`Player (${this.player.getScore()}) Dealer (${this.dealer.getScore()})`);
    console.log(' ');
    console.log(`Player has $${this.player.getMoney()}`);
    console.log(' ');
  }

  displayCardsInfo() {
    this.player.displayHand();
    this.player.displaySum();
    console.log(" ");
    this.dealer.displayDealerHand();
    console.log(" ");
  }

  displayFinalHands() {
    this.player.displayHand();
    this.player.displaySum();
    console.log(" ");
    this.dealer.displayHand();
    this.dealer.displaySum();
    console.log(" ");
  }

  gameOver() {
    let money = this.player.getMoney();
    if (money >= RICH_THRESHOLD || money <= BROKE_THRESHOLD) {
      return true;
    } else if (this.player.score === 5 ||
      this.dealer.score === 5) {
      return true;
    }
    return false;
  }

  displayGrandWinner() {
    if (this.player.getScore() === 5 || this.player.getMoney() === 5) {
      console.log("Player is the grand winner!");
    } else {
      console.log("Dealer is the grand winner!");
    }
  }

  newRound() {
    this.player.newHand();
    this.dealer.newHand();

    this.dealCards();
    this.updatePlayer();
    this.updateDealer();

    readline.question("Starting new round (press enter)");
    console.clear();
  }

  playerTurn() {
    let choice;

    while (choice !== CHOICE.STAY) {
      this.displayGameInfo();
      this.displayCardsInfo();
      choice = this.player.choose();

      if (choice === CHOICE.HIT) {
        console.clear();
        this.deck.dealCard(this.player);
        this.updatePlayer();

        if (this.player.isBust()) break;
      }
    }
  }

  dealerTurn() {
    // this.dealer.updatePoints();
    let dealerChoice;

    while (dealerChoice !== CHOICE.STAY) {
      dealerChoice = this.dealer.choose();

      if (dealerChoice === CHOICE.HIT) {
        this.deck.dealCard(this.dealer);
        // console.log("Points: " + this.dealer.getPoints());
        // console.log("Points: " + this.dealer.getPoints());
        // this.displayCardsInfo();
        this.updateDealer();

        if (this.dealer.isBust()) {
          break;
        }
        console.log(dealerChoice);
      }
    }
  }

  playerWon() {
    this.player.addScore(1);
    this.player.addMoney(1);
  }

  dealerWon() {
    this.dealer.addScore(1);
    this.player.addMoney(-1);
  }

  playerBust() {
    console.clear();
    this.displayFinalHands();
    this.dealerWon();
    console.log(' ');
    console.log("You have bust! Dealer wins!");
  }

  dealerBust() {
    console.clear();
    this.displayFinalHands();
    console.log("Dealer has bust! You win!");
    this.playerWon();
  }

  handleFinalResult() {
    console.clear();
    this.displayFinalHands();
    if (this.player.getPoints() > this.dealer.getPoints()) {
      console.log("Player wins!");
      this.playerWon();
    } else if (this.player.getPoints() < this.dealer.getPoints()) {
      console.log("Dealer wins!");
      this.dealerWon();
    } else {
      console.log("Tie");
    }
  }

  updatePlayer() {
    this.player.updatePoints();
    this.player.updateBust();
  }

  updateDealer() {
    this.dealer.updatePoints();
    this.dealer.updateBust();
  }

  play() {
    this.deck.shuffleDeck();
    this.displayWelcome();

    while (true) {
      if (this.gameOver()) break;
      this.newRound();
      this.playerTurn();
      if (this.player.isBust()) {
        this.playerBust();
      } else {
        this.dealerTurn();
        if (this.dealer.isBust()) {
          this.dealerBust();
        } else {
          this.handleFinalResult();
        }
      }
      this.displayGrandWinner();
    }
  }
}

let game = new TwentyOneGame();
game.play();