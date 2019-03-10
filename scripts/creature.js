
class Creature {
  constructor() {
    this.$ = $('<span></span>');
  }
}

class Pacman extends Creature {
  constructor () {
    super();

    this.direction = 'right';
    this.$.text('P');
  }
}

class Ghost extends Creature {
  constructor () {
    super();
    this.$.text('G');
  }
}
