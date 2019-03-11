
class Game {
  constructor(mapNumber) {
    this.map = maps[mapNumber || 0];
    this.newGame();
  }

  newGame() {
    this.pacman = new Pacman(this);
    this.ghosts = [];

    for (let i = 0; i < 4; i++) {
      this.ghosts.push(new Ghost(this, i));
    }

    this.board = [];

    createBoard(this, this.map, this.board);

    addTestButtons();
  }

  get creatures() {
    return [this.pacman, ...this.ghosts];
  }

  start() {
    if (this.pacman.movementInterval) {
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
