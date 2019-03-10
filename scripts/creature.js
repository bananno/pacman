
class Creature {
  constructor() {
    this.$ = $('<span></span>');
  }

  set $(element) {
    this._element = element;
  }

  get $() {
    return this._element;
  }

  set direction(newDirection) {
    this._direction = newDirection;
  }

  get direction() {
    return this._direction;
  }

  set position(array) {
    this._position = array;
  }

  get position() {
    return this._position || [];
  }
}

class Pacman extends Creature {
  constructor () {
    super();

    this._direction = 'right';
    this.$.text('P');
  }
}

class Ghost extends Creature {
  constructor () {
    super();
    this.$.text('G');
  }
}
