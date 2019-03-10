
class Creature {
  constructor() {
    this.$ = $('<span>');
    this.speed = 250;
    this.interval = setInterval(moveCreature.bind(this), this.speed);
  }

  set position([r, c]) {
    this._position = [r, c];
    board[r][c].$.append(this.$);
  }

  get position() {
    return this._position || [];
  }
}

class Pacman extends Creature {
  constructor () {
    super();

    this.direction = 'right';
    this.$.text('P');
    this.pacman = true;
  }
}

class Ghost extends Creature {
  constructor () {
    super();
    this.$.text('G');
  }
}

function moveCreature() {
  const newTile = getNewPosition(this.direction, this.position);

  if (newTile == null) {
    return;
  }

  if (newTile.food && this.pacman) {
    newTile.food = false;
    newTile.$.text('');
  }

  this.position = [newTile.row, newTile.col];
};
