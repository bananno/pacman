
const GHOST_BLUE_TIME = 5000;

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

  revertMode(force) {
    if (force || this.mode == 'chase' || this.mode == 'scatter') {
      this.mode = this.game.mode;
    }
  }

  set mode(newMode) {
    this._mode = newMode;

    if (newMode == 'blue') {
      this.$.addClass('ghost-blue');
    } else if (newMode == 'eyes') {
      this.$.addClass('ghost-eyes');
    } else {
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
    this.path = this.game.findPath(this.position, this.origin);
    this.speed = 75;
  }

  revertEyes() {
    this.revertMode(true);
    this.speed = 250;
  }
}
