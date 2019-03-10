
const GHOST_BLUE_TIME = 5000;

class Creature {
  constructor() {
    this.$ = $('<span class="creature">');
    this.speed = 250;
    this.movementInterval = setInterval(this.move.bind(this), this.speed);
  }

  set position([r, c]) {
    this._position = [r, c];
    board[r][c].$.append(this.$);

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
}

class Pacman extends Creature {
  constructor () {
    super();
    this.direction = 'right';
    this.$.addClass('pacman');
    this.pacman = true;
  }
}

class Ghost extends Creature {
  constructor(number) {
    super();
    this.number = number;
    this.$.addClass('ghost');
    this.$.addClass('ghost-dangerous');
    this.$.addClass('ghost' + (number + 1));
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

Creature.prototype.move = function() {
  if (this.position.length == 0) {
    return;
  }

  let newTile = getNewPosition(this.direction, this.position);

  if (newTile == null) {
    if (this.pacman) {
      return;
    }

    this.direction = getRandomValidDirection(this.position, this.direction);
    newTile = getNewPosition(this.direction, this.position);
    if (newTile == null) {
      return;
    }
  }

  if (this.pacman) {
    if (newTile.food) {
      newTile.food = false;
      newTile.$.text('');
    }

    if (newTile.token) {
      newTile.token = false;
      newTile.$.text('');
      eatToken();
    }
  }

  this.position = [newTile.row, newTile.col];

  if (this.blue && newTile.$.html().match('pacman')) {
    return this.catchBlue();
  }

  if (tileContainsBoth(newTile)) {
    return loseGame();
  }
};
