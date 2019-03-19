
const MODE_TIME = [7, 20, 7, 20, 5, 20, 5];

class Game {
  constructor(mapTemplate, isTest) {
    this.isTest = isTest || false;
    this.mapTemplate = mapTemplate || maps[0];

    this.newGame();

    this.test = {
      showTargets: false
    };

    if (!this.isTest) {
      $(document).keydown(event => {
        this.pressKey(event);
      });

      $('#restart').click(() => {
        this.newGame();
      });
    }
  }

  pressKey(event) {
    if (!this.isOver && event.key.match('Arrow')) {
      event.preventDefault ? event.preventDefault() : null;

      let newDirection = event.key.toLowerCase().slice(5);

      this.start();

      if (this.pacman.canMove(newDirection)) {
        this.pacman.direction = newDirection;
      }
    }
  }

  newGame() {
    this.level = 1;
    this.score = 0;
    this.isLost = false;
    this.isWon = false;
    this.isOver = false;
    this.lives = 3;
    this.newLevel();
  }

  newLevel() {
    this.pacman = new Pacman(this);
    this.ghosts = [];
    this.scatter = false;
    this.modeCount = 0;

    for (let i = 0; i < 4; i++) {
      this.ghosts.push(new Ghost(this, i));
    }

    this.board = [];

    this.createBoard();

    this.foodLeft = this.allTiles.filter(tile => tile.food).length;

    if (!this.isTest) {
      addTestButtons(this);
      $('#restart').hide();
    }
  }

  set score(newScore) {
    this._score = newScore;
    if (!this.isTest) {
      $('#score').text(this._score);
    }
  }

  get level() {
    return this._level;
  }

  set level(value) {
    this._level = value;
    if (!this.isTest) {
      $('#level').text('lvl: ' + this._level);
    }
  }

  get score() {
    return this._score;
  }

  get creatures() {
    return [this.pacman, ...this.ghosts];
  }

  start() {
    if (this.pacman.movementInterval || this.isTest) {
      return;
    }

    this.creatures.forEach(creature => {
      creature.start();
    });

    this.toggleMode();
  }

  set lives(value) {
    this._lives = value;

    $('#lives').html('');

    for (let i = 0; i < value - 1; i++) {
      $('#lives').append('<div class="show-life"></div>');
    }
  }

  get lives() {
    return this._lives;
  }

  loseLife() {
    this.lives -= 1;

    if (this.lives == 0) {
      return this.loseGame();
    }

    this.modeCount = 0;

    this.clearAllIntervals();

    this.ghosts.forEach(ghost => {
      ghost.revertMode(true);
    });

    setTimeout(() => {
      this.creatures.forEach(creature => {
        creature.reset();
      });
    }, 500);
  }

  loseGame() {
    this.isLost = true;
    this.finishGame('You lose!');
  }

  winLevel() {

  }

  finishGame(result) {
    this.isOver = true;

    this.clearAllIntervals();

    setTimeout(() => {
      if (!this.isTest) {
        alert(result);
        $('#restart').show();
      }
    }, 250);
  }

  clearAllIntervals() {
    this.creatures.forEach(creature => {
      creature.clearAllIntervals();
    });
  }

  eatFood() {
    this.foodLeft -= 1;
    if (this.foodLeft == 0) {
      this.winLevel();
    }
  }

  eatToken() {
    this.ghosts.forEach(ghost => {
      ghost.turnBlue();
    });
  }

  tile(row, col) {
    if (row.constructor == Array) {
      [row, col] = row;
    }
    return this.board[row] ? this.board[row][col] : null;
  }

  get allTiles() {
    let list = [];
    this.board.forEach(row => {
      list = list.concat(row);
    });
    return list;
  }

  get doorwayTiles() {
    return this.allTiles.filter(tile => tile.doorway);
  }

  get cornerTiles() {
    return this.allTiles.filter(tile => tile.corner);
  }

  encounter(row, col) {
    if (this.pacman.position == null || this.pacman.position[0] != row
        || this.pacman.position[1] != col) {
      return;
    }

    for (let i = 0; i < this.ghosts.length; i++) {
      const ghost = this.ghosts[i];

      if (ghost.position == null || ghost.position[0] != row || ghost.position[1] != col
          || ghost.mode == 'eyes') {
        continue;
      }

      if (ghost.mode == 'blue') {
        ghost.catchBlue();
        continue;
      }

      this.loseLife();
      break;
    }
  }

  toggleMode() {
    this.scatter = !this.scatter;

    if (MODE_TIME[this.modeCount] && !this.isTest) {
      setTimeout(this.toggleMode.bind(this), MODE_TIME[this.modeCount] * 1000);
    }

    this.modeCount += 1;

    this.ghosts.forEach(ghost => {
      ghost.reverse();
      ghost.revertMode(false);
    });
  }

  get mode() {
    return this.scatter ? 'scatter' : 'chase';
  }
}
