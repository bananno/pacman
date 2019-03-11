
class Game {
  constructor(mapNumber) {
    this.map = maps[mapNumber || 0];
    this.board = [];
    this.pacman = new Pacman();
    this.ghosts = [];

    for (let i = 0; i < 4; i++) {
      this.ghosts.push(new Ghost(i));
    }

    this.creatures = [this.pacman, ...this.ghosts];
  }
}
