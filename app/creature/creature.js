
class Creature {
  constructor(game) {
    this.$ = $('<div class="creature">');
    this.speed = 250;
    this.game = game;
  }

  start() {
    this.movementInterval = setInterval(this.move.bind(this), this.speed);
  }

  set speed(newSpeed) {
    this._speed = newSpeed;
    if (this.movementInterval) {
      clearInterval(this.movementInterval);
      this.start();
    }
  }

  get speed() {
    return this._speed;
  }

  set position([r, c, animate]) {
    if (!this.origin) {
      this.origin = [r, c];
    }
    this._position = [r, c];

    moveElement(this.$, this.game.tile(r, c).$, this.direction, this.speed,
      !animate || this.game.isTest);

    this.direction = this.direction || getRandomDirection();
  }

  get position() {
    return this._position || null;
  }

  reset() {
    if (this.origin) {
      this.position = this.origin;
    }

    this.movementInterval = null;
    this.speed = 250;

    if (this.pacman) {
      this.direction = 'right';
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
