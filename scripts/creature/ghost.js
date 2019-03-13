
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
