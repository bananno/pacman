
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
    } else {
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
