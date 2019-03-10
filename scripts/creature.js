
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
  constructor (number) {
    super();
    this.number = number;
    this.$.addClass('ghost');
    this.$.addClass('ghost' + (number + 1));
  }

  turnBlue() {
    this.$.addClass('ghost-blue');
    if (this.blueInterval) {
      clearInterval(this.blueInterval);
    }
    this.blueInterval = setInterval(this.revertBlue.bind(this), GHOST_BLUE_TIME);
  }

  revertBlue() {
    this.$.removeClass('ghost-blue');
    clearInterval(this.blueInterval);
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
};
