
const translateChar = {
  '|' : 'wall',
  '.' : 'food',
  '+' : 'token',
  'g' : 'house',
  'P' : 'pacman',
  'G' : 'ghost',
  't' : 'corner',
};

class Tile {
  constructor(game, row, col, tileChar) {
    this.game = game;
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

      if (this.ghost) {
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

  neighbor(direction, wrapAround) {
    let row = this.row + positionAdjustment[direction][0];
    let col = this.col + positionAdjustment[direction][1];

    if (wrapAround) {
      [row, col] = this.game.getWrappedCoordinates(row, col);
    }

    return this.game.tile(row, col);
  }

  decideDoorway() {
    if (!this.house) {
      return;
    }

    for (let i = 0; i < 4; i++) {
      const otherTile = this.neighbor(DIRECTIONS[i], false);

      if (otherTile && !otherTile.wall && !otherTile.house) {
        this.doorway = true;
        break;
      }
    }
  }
}

Tile.prototype.isPassable = function(creature) {
  if (this.wall) {
    return false;
  }

  if (creature == null) {
    return true;
  }

  if (creature.target == null) {
    if (this.house) {
      if (!creature.inHouse) {
        return false;
      }

      if (!this.doorway && creature.inDoorway) {
        return false;
      }
    }

    return true;
  }

  let tileInHouse = this.house;
  let creatureInHouse = creature.inHouse;
  let targetInHouse = this.game.tile(creature.target).house == true;

  if (tileInHouse && !creatureInHouse) {
    return targetInHouse;
  }

  return true;
};
