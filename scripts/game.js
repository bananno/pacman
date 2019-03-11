
class Game {
  constructor(mapNumber) {
    this.map = maps[mapNumber || 0];
    this.board = [];
    this.creatures = [];
    this.pacman = null;
    this.ghosts = [];
  }
}
