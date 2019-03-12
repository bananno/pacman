
const GHOST_BLUE_TIME = 5000;

class Creature {
  constructor(game) {
    this.$ = $('<span class="creature">');
    this.speed = 250;
    this.game = game;
  }

  start() {
    this.movementInterval = setInterval(this.move.bind(this), this.speed);
  }

  set position([r, c]) {
    this._position = [r, c];
    this.game.board[r][c].$.append(this.$);
    this.direction = this.direction || getRandomDirection();
  }

  get position() {
    return this._position || [];
  }

  set direction(newDirection) {
    this.$.removeClass('direction-' + this._direction);
    this.$.addClass('direction-' + newDirection);
    this._direction = newDirection;
  }

  get direction() {
    return this._direction;
  }

  clearAllIntervals() {
    clearInterval(this.movementInterval);
    clearInterval(this.blueInterval);
  }
}

class Pacman extends Creature {
  constructor (game) {
    super(game);
    this.pacman = true;
    this.direction = 'right';
    this.$.addClass('pacman');
  }
}

class Ghost extends Creature {
  constructor(game, number) {
    super(game);
    this.ghost = true;
    this.number = number;
    this.$.addClass('ghost');
    this.$.addClass('ghost-dangerous');
    this.$.addClass('ghost' + (number + 1));
    this.inHouse = true;
  }

  turnBlue() {
    this.blue = true;
    this.$.addClass('ghost-blue');
    this.$.removeClass('ghost-dangerous');
    clearInterval(this.blueInterval);
    this.blueInterval = setInterval(this.revertBlue.bind(this), GHOST_BLUE_TIME);
  }

  revertBlue() {
    this.blue = false;
    this.$.addClass('ghost-dangerous');
    this.$.removeClass('ghost-blue');
    clearInterval(this.blueInterval);
  }

  catchBlue() {
    this.blue = false;
    this.eyes = true;
    this.$.addClass('ghost-eyes');
    this.$.removeClass('ghost-blue');
    clearInterval(this.blueInterval);
  }

  revertEyes() {
    this.eyes = false;
  }
}

Pacman.prototype.eat = function(tile) {
  if (tile.food) {
    tile.food = false;
    tile.$.text('');
    return;
  }

  if (tile.token) {
    tile.token = false;
    tile.$.text('');
    this.game.eatToken();
  }
};
