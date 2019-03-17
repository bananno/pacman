
const GHOST_BLUE_TIME = 5000;

class Ghost extends Creature {
  constructor(game, number) {
    super(game);
    this.ghost = true;
    this.number = number;
    this.$.addClass('ghost');
    this.$.addClass('ghost-normal');
    this.$.addClass('ghost' + (number + 1));
  }

  reverse() {
    this.direction = oppositeDirection[this.direction];
  }

  revertMode(force) {
    if (force || (this.mode != 'blue' && this.mode != 'eyes')) {
      this.mode = this.game.mode;
    }
  }

  set mode(newMode) {
    this._mode = newMode;

    if (newMode == 'blue') {
      this.$.removeClass('ghost-normal');
      this.$.addClass('ghost-blue');
    } else if (newMode == 'eyes') {
      this.$.removeClass('ghost-normal');
      this.$.addClass('ghost-eyes');
    } else {
      this.$.addClass('ghost-normal');
      this.$.removeClass('ghost-blue');
      this.$.removeClass('ghost-white');
      this.$.removeClass('ghost-eyes');
    }
  }

  get mode() {
    return this._mode;
  }

  turnBlue() {
    this.mode = 'blue';
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
    if (this.mode != 'blue') {
      return;
    }
    if (toggle) {
      this.$.addClass('ghost-flash');
    } else {
      this.$.removeClass('ghost-flash');
    }
  }

  revertBlue() {
    clearInterval(this.blueInterval);
    this.revertMode(true);
    this.speed = 250;
  }

  catchBlue() {
    this.mode = 'eyes';
    clearInterval(this.blueInterval);
    this.speed = 75;
  }

  revertEyes() {
    this.revertMode(true);
    this.speed = 250;
  }

  get corner() {
    const tile = this.game.cornerTiles[this.number];
    if (tile) {
      return tile.position;
    }
    return null;
  }

  get target() {
    let finalTarget = this.finalTarget();

    if (finalTarget == null || this.position == null) {
      return finalTarget;
    }

    const currentTile = this.game.tile(this.position);
    const targetTile = this.game.tile(finalTarget);

    if (currentTile.house != targetTile.house) {
      const doorwayTile = this.game.doorwayTiles[0];
      if (doorwayTile) {
        return doorwayTile.position;
      }
      return finalTarget;
    }

    return finalTarget;
  }

  finalTarget() {
    if (this.mode == 'scatter') {
      return this.corner;
    }
    if (this.mode == 'eyes') {
      return this.origin;
    }
    if (this.mode == 'chase') {
      if (this.number == 1) {
        return this.game.pacman.position;
      }
    }
    return null;
  }
}
