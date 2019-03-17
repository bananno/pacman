
const translateChar = {
  '|' : 'wall',
  '.' : 'food',
  '+' : 'token',
  'd' : 'doorway',
  'g' : 'house',
  'P' : 'pacman',
  'G' : 'ghost',
  't' : 'corner',
};

class Tile {
  constructor(row, col, tileChar) {
    this.row = row;
    this.col = col;
    this.$ = $('<td>');

    this.wall = false;
    this.food = false;
    this.token = false;
    this.house = false;
    this.doorway = false;
    this.pacman = false;
    this.ghost = false;
    this.corner = false;

    if (translateChar[tileChar]) {
      this[translateChar[tileChar]] = true;
    }

    if (this.wall) {
      this.$.addClass('board-wall');
    } else {
      this.$.addClass('board-path');

      if (this.ghost || this.doorway) {
        this.house = true;
      } else if (this.corner) {
        this.food = true;
        this.$.text('.');
      } else if (this.food) {
        this.$.text('.');
      } else if (this.token) {
        this.$.text('+');
      }
    }
  }

  get position() {
    return [this.row, this.col];
  }
}

Tile.prototype.isPassable = function(creature) {
  if (this.wall) {
    return false;
  }

  if (creature && this.house) {
    if (!creature.inHouse) {
      return false;
    }

    if (!this.doorway && creature.inDoorway) {
      return false;
    }
  }

  return true;
};
