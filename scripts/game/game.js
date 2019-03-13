
const MODE_TIME = [7, 20, 7, 20, 5, 20, 5];

class Game {
  constructor(mapTemplate, isTest) {
    this.isTest = isTest || false;
    this.mapTemplate = mapTemplate || maps[0];

    this.newGame();

    if (!this.isTest) {
      $(document).keydown((event) => {
        this.pressKey(event);
      });
    }
  }

  pressKey(event) {
    if (event.key.match('Arrow')) {
      let newDirection = event.key.toLowerCase().slice(5);

      this.start();

      if (this.pacman.canMove(newDirection)) {
        this.pacman.direction = newDirection;
      }
    }
  }

  newGame() {
    this.pacman = new Pacman(this);
    this.ghosts = [];
    this.scatter = false;
    this.mode = 0;
    this.lives = 3;
    this.isLost = false;

    for (let i = 0; i < 4; i++) {
      this.ghosts.push(new Ghost(this, i));
    }

    this.board = [];

    this.createBoard();

    if (!this.isTest) {
      addTestButtons(this);
    }
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

  loseLife() {
    this.lives -= 1;
    if (this.lives < 0) {
      this.loseGame();
    }
  }

  loseGame() {
    this.isLost = true;

    this.creatures.forEach(creature => {
      creature.clearAllIntervals();
    });

    setTimeout(() => {
      if (!this.isTest) {
        alert('You lose!');
      }
      this.newGame();
    }, 250);
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

  get doorwayTiles() {
    let list = [];
    this.board.forEach(row => {
      list = list.concat(row.filter(tile => tile.doorway));
    });
    return list;
  }

  encounter(row, col) {
    if (this.pacman.position[0] != row || this.pacman.position[1] != col) {
      return;
    }

    for (let i = 0; i < this.ghosts.length; i++) {
      const ghost = this.ghosts[i];

      if (ghost.position[0] != row || ghost.position[1] != col || ghost.eyes) {
        continue;
      }

      if (ghost.blue) {
        ghost.catchBlue();
        continue;
      }

      this.loseLife();
      break;
    }
  }

  toggleMode() {
    this.scatter = !this.scatter;

    if (MODE_TIME[this.mode]) {
      setTimeout(this.toggleMode.bind(this), MODE_TIME[this.mode] * 1000);
    }

    this.mode += 1;

    this.ghosts.forEach(ghost => {
      ghost.reverse();
    });
  }
}
