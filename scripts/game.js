
class Game {
  constructor(mapNumber) {
    this.map = maps[mapNumber || 0];
    this.board = createBoard(this.map);
    this.pacman = new Pacman();
    this.ghosts = [];

    for (let i = 0; i < 4; i++) {
      this.ghosts.push(new Ghost(i));
    }
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
      clearInterval(creature.movementInterval);
      clearInterval(creature.blueInterval);
    });

    setTimeout(() => {
      alert('You lose!');
      newGame();
    }, 250);
  }

  eatToken() {
    this.ghosts.forEach(ghost => {
      ghost.turnBlue();
    });
  }
}
