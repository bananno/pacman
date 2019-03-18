
class Pacman extends Creature {
  constructor (game) {
    super(game);
    this.pacman = true;
    this.direction = 'right';
    this.$.addClass('pacman');
  }

  eat(tile) {
    if (tile.food) {
      tile.food = false;
      this.game.score += 10;
      return;
    }

    if (tile.token) {
      tile.token = false;
      this.game.score += 50;
      this.game.eatToken();
    }
  }
}
