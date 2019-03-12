
class Game {
  constructor(map, isTest) {
    this.isTest = isTest || false;
    this.map = map || maps[0];

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

    for (let i = 0; i < 4; i++) {
      this.ghosts.push(new Ghost(this, i));
    }

    this.board = [];

    this.createBoard();

    addTestButtons();
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
  }

  lose() {
    this.creatures.forEach(creature => {
      creature.clearAllIntervals();
    });

    setTimeout(() => {
      alert('You lose!');
      this.newGame();
    }, 250);
  }

  eatToken() {
    this.ghosts.forEach(ghost => {
      ghost.turnBlue();
    });
  }
}
