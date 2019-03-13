
const GHOST_BLUE_TIME = 5000;

class Creature {
  constructor(game) {
    this.$ = $('<span class="creature">');
    this.speed = 250;
    this.game = game;
  }

  start() {
    this.movementInterval = setInterval(this.move.bind(this), this._speed);
  }

  set speed(newSpeed) {
    this._speed = newSpeed;
    if (this.movementInterval) {
      clearInterval(this.movementInterval);
      this.start();
    }
  }

  set position([r, c]) {
    if (!this.origin) {
      this.origin = [r, c];
    }
    this._position = [r, c];
    this.game.tile(r, c).$.append(this.$);
    this.direction = this.direction || getRandomDirection();
  }

  get position() {
    return this._position || [];
  }

  reset() {
    if (this.origin) {
      this.position = this.origin;
    }

    this.speed = 250;

    if (this.pacman) {
      this.direction = 'right';
    } else {
      this.blue = false;
      this.eyes = false;
      this.path = [];
    }
  }

  set direction(newDirection) {
    this.$.removeClass('direction-' + this._direction);
    this.$.addClass('direction-' + newDirection);
    this._direction = newDirection;
  }

  get direction() {
    return this._direction;
  }

  get tile() {
    return this.game.tile(this.position);
  }

  get inHouse() {
    return this.tile.house;
  }

  get inDoorway() {
    return this.tile.doorway;
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

  eat(tile) {
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
  }
}

class Ghost extends Creature {
  constructor(game, number) {
    super(game);
    this.ghost = true;
    this.number = number;
    this.$.addClass('ghost');
    this.$.addClass('ghost' + (number + 1));
    this.path = [];
  }

  reverse() {
    this.direction = oppositeDirection[this.direction];
  }

  turnBlue() {
    this.blue = true;
    this.reverse();
    clearInterval(this.blueInterval);
    this.blueInterval = setInterval(this.revertBlue.bind(this), GHOST_BLUE_TIME);
    this.speed = 500;

    for (let t = 4; t >= 1; t--) {
      let time = GHOST_BLUE_TIME - (t * 400);
      if (time < 0) {
        continue;
      }
      setTimeout(() => {
        this.flashWhite(t % 2 == 0);
      }, time);
    }
  }

  flashWhite(toggle) {
    if (!this.blue) {
      return;
    }
    if (toggle) {
      this.$.addClass('ghost-flash');
    } else {
      this.$.removeClass('ghost-flash');
    }
  }

  revertBlue() {
    this.blue = false;
    clearInterval(this.blueInterval);
    this.speed = 250;
  }

  catchBlue() {
    this.blue = false;
    this.eyes = true;
    clearInterval(this.blueInterval);
    this.path = this.game.findPath(this.position, this.origin);
    this.speed = 75;
  }

  revertEyes() {
    this.eyes = false;
    this.speed = 250;
  }

  set blue(value) {
    this._blue = value;
    if (value) {
      this.$.addClass('ghost-blue');
    } else {
      this.$.removeClass('ghost-blue');
      this.$.removeClass('ghost-white');
    }
  }

  set eyes(value) {
    this._eyes = value;
    if (value) {
      this.$.addClass('ghost-eyes');
    } else {
      this.$.removeClass('ghost-eyes');
    }
  }

  get blue() {
    return this._blue;
  }

  get eyes() {
    return this._eyes;
  }
}
