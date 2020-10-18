let readline = require('readline-sync');
const PAYOFF_MATRIX = {
  rock: {
    rock: 0,
    paper: -1,
    scissors: 1,
    lizard: 1,
    spock: -1
  },
  paper: {
    rock: 1,
    paper: 0,
    scissors: -1,
    lizard: -1,
    spock: 1
  },
  scissors: {
    rock: -1,
    paper: 1,
    scissors: 0,
    lizard: 1,
    spock: -1
  },
  lizard: {
    rock: -1,
    paper: 1,
    scissors: -1,
    lizard: 0,
    spock: 1
  },
  spock: {
    rock: 1,
    paper: -1,
    scissors: 1,
    lizard: -1,
    spock: 0
  }
};

const WINNING_RESPONSES = {
  rock: ['paper', 'spock'],
  paper: ['scissors', 'lizard'],
  scissors: ['rock', 'spock'],
  lizard: ['rock', 'scissors'],
  spock: ['paper', 'lizard']
}

const WINNING_RESPONSES_INDEX = {
  rock: [1, 4],
  paper: [2, 3],
  scissors: [0, 4],
  lizard: [0, 3],
  spock: [1, 3]
}

function createPlayer() {
  return {
    move: null,
    moveHistory: [],

    clearMoveHistory() {
      this.moveHistory = [];
    }
  };
}

function createComputer() {
  let playerObject = createPlayer();

  let computerObject = {
    frequencyStrategy: [1, 1, 1, 1, 1],

    updateStrategy(recentHumanMove) {
      
      let winningResponsesKeys = WINNING_RESPONSES_INDEX[recentHumanMove];
      winningResponsesKeys.forEach(index => this.frequencyStrategy[index]++);

    },

    getIndex() {
      // let frequencySum = this.frequencyStrategy.reduce((sum, value) => sum + value, 0);
      let frequencyStrategy = this.frequencyStrategy;
      let cumulativeFrequency = frequencyStrategy.map((_,index) => {
        return frequencyStrategy.slice(0,index + 1).reduce((sum, value) => sum + value, 0);
      })
      let lastValue = cumulativeFrequency[cumulativeFrequency.length - 1];
      let cumulativeProbability = cumulativeFrequency.map(num => num / lastValue);

      
      console.log(this.frequencyStrategy);
      console.log(cumulativeProbability);
      let randomNumber = Math.random();
      // console.log(randomNumber);
      for (let idx = 0; idx < cumulativeProbability.length; idx++) {
        if (randomNumber < cumulativeProbability[idx]) {
          return idx;
        }
      }
      // let randomIndex = Math.floor(Math.random() * choices.length);
    },

    choose(humanMoveHistory) {
      let recentHumanMove = humanMoveHistory[humanMoveHistory.length - 1];
      this.updateStrategy(recentHumanMove);
      const choices = ['rock', 'paper', 'scissors', 'lizard', 'spock'];
      
      let randomIndex = this.getIndex();
      this.move = choices[randomIndex];
      this.moveHistory.push(this.move);
    },
  };

  return Object.assign(playerObject, computerObject);
}

function createHuman() {
  let playerObject = createPlayer();

  let humanObject = {

    choose() {
      let choiceKey;

      while (true) {
        console.log('Please choose rock (r), paper (p), or scissors (s) \n' +
        'lizard (l), spock (k):');
        choiceKey = readline.question().trim().toLowerCase()[0];
        if ('rpslk'.includes(choiceKey)) break;
        console.log('Sorry, invalid choice.');
      }

      // console.log("choiceKey: " ,choiceKey);
      let choiceTable = {r: "rock", p: "paper", s: "scissors",
                         l: "lizard", k: "spock"};

      this.move = choiceTable[choiceKey];
      this.moveHistory.push(this.move);
    }
  };

  return Object.assign(playerObject, humanObject);
}

const RPSGame = {
  human: createHuman(),
  computer: createComputer(),

  humanScore: 0,
  computerScore: 0,

  currentOutcome: null,

  displayWelcomeMessage() {
    console.log('Welcome to Rock, Paper, Scissors!');
  },

  displayGoodbyeMessage() {
    console.log('Thanks for playing Rock, Paper, Scissors. Goodbye!');
  },

  displayMoveHistory() {
    if (this.human.moveHistory.length > 0) {
      console.log('================= MOVE HISTORY =================');
      console.log(`Human moves: ${this.human.moveHistory}`);
      console.log(`Computer moves: ${this.computer.moveHistory}`);
      console.log('================= MOVE HISTORY =================');
      console.log(' ');
    }
  },

  getWinner() {
    let outcome = PAYOFF_MATRIX[this.human.move][this.computer.move];
    this.currentOutcome = outcome;
  },

  incrementScores() {
    switch(this.currentOutcome) {
      case 1:
        this.humanScore++;
        break;
      case -1:
        this.computerScore++;
        break;
    }
  },

  displayWinner() {
    console.log(`You chose: ${this.human.move}`);
    console.log(`The computer chose: ${this.computer.move}`);
    console.log(' ');
    if (this.currentOutcome === 1) {
      console.log("You win!");
    } else if (this.currentOutcome === -1) {
      console.log("You lose!");
    } else {
      console.log("Tie!");
    }
  },

  displayScores() {
    console.log(' ');
    console.log(`Current Scores: `);
    console.log(`Human (${this.humanScore}) - Computer (${this.computerScore}) `);
    console.log(' ');
  },

  isGameOver() {
    return this.humanScore === 5 || this.computerScore === 5;
  },

  displayGrandWinner() {
    let grandWinner = 'Human';
    if (this.computerScore === 5) {
      grandWinner = 'Computer';
    }
    console.log(`${grandWinner} is the grand winner!`);
  },

  playAgain() {
    console.log("Would you like to play again (y/n)?");
    let choice = readline.question();
    return 'y'.includes(choice.trim().toLowerCase()[0]);
  },

  clearScores() {
    this.humanScore = 0;
    this.computerScore = 0;
    this.human.clearMoveHistory();
    this.computer.clearMoveHistory();
  },

  play() {
    this.displayWelcomeMessage();
    while (true) {
      this.displayMoveHistory();
      this.human.choose();
      this.computer.choose(this.human.moveHistory);
      // console.clear();
      this.getWinner();
      this.incrementScores();
      this.displayWinner();
      this.displayScores();
      if (this.isGameOver()) {
        this.displayGrandWinner();
        if (!this.playAgain()) break;
        this.clearScores();
      }
    }
    this.displayGoodbyeMessage();
  }
};

RPSGame.play();