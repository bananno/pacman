
const GHOST_BLUE_TIME = 5000;

class Ghost extends Creature {
  static chooseEyesInterval() {
    return (Math.floor(Math.random() * 10) + 1) * 500;
  }

  constructor(game, number) {
    super(game);
    this.ghost = true;
    this.number = number;
    this.$.addClass('ghost');
    this.$.addClass('ghost-normal');
    this.$.addClass('ghost' + (number + 1));

    this.waitingEyes = Ghost.chooseEyesInterval();
    this.waitingInterval = setInterval(() => {
      this.direction = getRandomDirection();
    }, this.waitingEyes);
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
    this.game.score += 200;
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
    let trueTarget = this.trueTarget;

    if (trueTarget == null || this.position == null) {
      return trueTarget;
    }

    const currentTile = this.game.tile(this.position);
    const targetTile = this.game.tile(trueTarget);

    if (targetTile && targetTile.house != currentTile.house && !currentTile.doorway) {
      const doorwayTile = this.game.doorwayTiles[0];
      if (doorwayTile) {
        return doorwayTile.position;
      }
      return trueTarget;
    }

    return trueTarget;
  }

  get trueTarget() {
    if (this.mode == 'scatter') {
      return this.corner;
    }

    if (this.mode == 'eyes') {
      return this.origin;
    }

    if (this.mode == 'chase') {
      if (this.number == 0) {
        const pacmanPosition = this.game.pacman.position;
        const pacmanDirection = this.game.pacman.direction;

        if (!pacmanPosition || !pacmanDirection) {
          return null;
        }

        let row = pacmanPosition[0] + positionAdjustment[pacmanDirection][0] * 4;
        let col = pacmanPosition[1] + positionAdjustment[pacmanDirection][1] * 4;

        return [row, col];
      }

      if (this.number == 1) {
        return this.game.pacman.position;
      }

      if (this.number == 2) {
        const pacmanPosition = this.game.pacman.position;

        if (!pacmanPosition || !this.position) {
          return null;
        }

        const distanceToPacman = this.game.getDiagonalDistance(this.position, pacmanPosition);

        if (distanceToPacman > 8) {
          return pacmanPosition;
        }

        return this.corner;
      }

      if (this.number == 3) {
        const pacmanPosition = this.game.pacman.position;
        const redGhostPosition = this.game.ghosts[1].position;

        if (!pacmanPosition || !this.position || !redGhostPosition) {
          return null;
        }

        const row = pacmanPosition[0] * 2 - redGhostPosition[0];
        const col = pacmanPosition[1] * 2 - redGhostPosition[1];

        return [row, col];
      }
    }

    return null;
  }
}
