
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
    if (this.wall) {
      const connections = {};

      [...DIRECTIONS, 'upLeft', 'upRight', 'downLeft', 'downRight'].forEach(direction => {
        const otherTile = this.neighbor(direction, false);
        connections[direction] = otherTile && otherTile.wall;
      });

      this.$.addClass(getWallClasses(connections));
      this.$.append('<div>')

      return;
    }

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

  const targetTile = this.game.tile(targetPosition);
  const targetTileIsInHouse = targetTile ? targetTile.house : false;

  if (creature.inHouse) {
    if (targetTileIsInHouse) {
      return this.house && !this.doorway;
    }

    return !this.house || this.doorway;
  }

  return !this.house || targetTileIsInHouse;
};

function getWallClasses(connections) {
  if (connections.up && connections.down && connections.left && connections.right) {
    if (!connections.downLeft) {
      return 'wall-corner top-right';
    }
    if (!connections.downRight) {
      return 'wall-corner top-left';
    }
    if (!connections.upRight) {
      return 'wall-corner bottom-left';
    }
    if (!connections.upLeft) {
      return 'wall-corner bottom-right';
    }
    console.log(connections)
  }

  if (!connections.up && connections.down && connections.left && connections.right) {
    return 'wall-corner top-right';
  }

  if (!connections.up && connections.down && !connections.left && connections.right) {
    return 'wall-corner top-left';
  }

  if (!connections.up && connections.down && connections.left && !connections.right) {
    return 'wall-corner top-right';
  }

  if (connections.up && !connections.down && !connections.left && connections.right) {
    return 'wall-corner bottom-left';
  }

  if (connections.up && !connections.down && connections.left && !connections.right) {
    return 'wall-corner bottom-right';
  }

  if (connections.up && connections.down && !connections.left && !connections.right) {
    return 'wall-vertical';
  }

  if (connections.up && connections.down && (connections.left != connections.right)) {
    return 'wall-vertical';
  }

  if (connections.up && !connections.down && connections.left && connections.right) {
    return 'wall-horizontal';
  }

  if (!connections.up && connections.down && connections.left && connections.right) {
    return 'wall-horizontal';
  }

  if (!connections.up && connections.down && connections.left && !connections.right) {
    return 'wall-corner top-right';
  }

  if (!connections.up && !connections.down && connections.left && connections.right) {
    return 'wall-horizontal';
  }

  if (!connections.up && !connections.down && !connections.left && connections.right) {
    return 'wall-horizontal';
  }

  if (!connections.up && !connections.down && connections.left && !connections.right) {
    return 'wall-horizontal';
  }
}
