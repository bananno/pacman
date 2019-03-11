
const GHOST_BLUE_TIME = 5000;

class Creature {
  constructor() {
    this.$ = $('<span class="creature">');
    this.speed = 250;
  }

  start() {
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
    this.pacman = true;
    this.direction = 'right';
    this.$.addClass('pacman');
  }
}

class Ghost extends Creature {
  constructor(number) {
    super();
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

Creature.prototype.move = function() {
  if (this.position.length == 0) {
    return;
  }

  if (this.ghost) {
    this.chooseDirection();
  } else if (this.isAtDeadEnd()) {
    return;
  }

  const newTile = getNewPosition(this.direction, this.position);

  if (this.pacman) {
    this.eat(newTile);
  } else if (this.inHouse && !newTile.house) {
    this.inHouse = false;
  }

  this.position = [newTile.row, newTile.col];

  if (this.blue && newTile.$.html().match('pacman')) {
    return this.catchBlue();
  }

  if (tileContainsBoth(newTile)) {
    return loseGame();
  }
};

Creature.prototype.isAtDeadEnd = function() {
  return isDeadEnd(this, this.direction, this.position);
};

Ghost.prototype.chooseDirection = function() {
  if (this.isAtDeadEnd()) {
    const directionOptions = getDirectionOptions(this, this.direction, this.position);
    this.direction = chooseRandom(directionOptions);
    return;
  }

  if (isIntersection(this.direction, this.position)) {
    const ignoreOpposite = oppositeDirection[this.direction];
    const directionOptions = getDirectionOptions(this, ignoreOpposite, this.position);
    this.direction = chooseRandom(directionOptions);
    return;
  }
};

Pacman.prototype.eat = function(tile) {
  if (tile.food) {
    tile.food = false;
    tile.$.text('');
    return;
  }

  if (tile.token) {
    tile.token = false;
    tile.$.text('');
    eatToken();
  }
};
