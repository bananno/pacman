
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

  const targetPosition = creature.target;

  if (targetPosition == null) {
    return !this.house || (creature.inHouse && !creature.inDoorway);
  }

  if (this.row == targetPosition[0] && this.col == targetPosition[1]) {
    return true;
  }

  let creatureInHouse = creature.inHouse;
  let creatureInDoorway = creature.tile.doorway;
  let newTileInHouse = this.house;
  let newTileIsDoorway = this.doorway;
  let targetTile = this.game.tile(targetPosition);
  let targetInHouse = targetTile.house;
  let targetIsDoorway = targetTile.doorway;

  if (creatureInHouse && newTileIsDoorway && targetInHouse) {
    return false;
  }

  if (creatureInHouse && newTileInHouse && !newTileIsDoorway && !targetInHouse) {
    return false;
  }

  if (!creatureInHouse && newTileInHouse && !targetInHouse) {
    return false;
  }

  if (creatureInHouse && !newTileInHouse && targetInHouse) {
    return false;
  }

  return true;
};
