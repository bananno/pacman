
class Creature {
  constructor() {
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
    this.$ = $('<span id="packman">P</span>');
  }
}

class Ghost extends Creature {
  constructor () {
    super();
  }
}
