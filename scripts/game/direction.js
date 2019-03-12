
const oppositeDirection = {
  left: 'right',
  right: 'left',
  up: 'down',
  down: 'up'
};

const positionAdjustment = {
  left: [0, -1],
  right: [0, 1],
  up: [-1, 0],
  down: [1, 0]
};

Game.prototype.getNextPosition = function(direction, oldPosition) {
  if (direction == null || oldPosition.length == 0) {
    return null;
  }

  let newR = oldPosition[0] + positionAdjustment[direction][0];
  let newC = oldPosition[1] + positionAdjustment[direction][1];

  return this.getWrappedCoordinates(newR, newC);
};

Game.prototype.getWrappedCoordinates = function(row, col) {
  if (this.board[row] == null) {
    if (row == -1) {
      row = this.board.length - 1;
    } else {
      row = 0;
    }
  }

  if (this.board[row][col] == null) {
    if (col == -1) {
      col = this.board[0].length - 1;
    } else {
      col = 0;
    }
  }

  return [row, col];
};

function getRandomDirection() {
  return chooseRandom(['up', 'down', 'left', 'right']);
}

Game.prototype.getDirectionOptions = function(creature, removeDirection, [row, col]) {
  const options = [];

  if (isTilePassable(row, col - 1, creature)) {
    options.push('left');
  }

  if (isTilePassable(row, col + 1, creature)) {
    options.push('right');
  }

  if (isTilePassable(row - 1, col, creature)) {
    options.push('up');
  }

  if (isTilePassable(row + 1, col, creature)) {
    options.push('down');
  }

  return options.filter(dir => dir != removeDirection);
};

Game.prototype.isDeadEnd = function(creature, direction, position) {
  let row = position[0] + positionAdjustment[direction][0];
  let col = position[1] + positionAdjustment[direction][1];

  [row, col] = getWrappedCoordinates(row, col);

  return !isTilePassable(row, col, creature);
};

Game.prototype.isIntersection = function(currentDirection, [row, col]) {
  if (currentDirection == 'left' || currentDirection == 'right') {
    return ((game.board[row][col - 1] && !game.board[row][col - 1].wall)
      || (game.board[row][col + 1] && !game.board[row][col + 1].wall));
  }

  return ((game.board[row - 1] && game.board[row - 1][col] && !game.board[row - 1][col].wall)
    || (game.board[row + 1] && game.board[row + 1][col] && !game.board[row + 1][col].wall));
};

Game.prototype.isTilePassable = function(row, col, creature) {
  if (this.board[row] == null || this.board[row][col] == null || this.board[row][col].wall) {
    return false;
  }

  if (creature && !creature.inHouse && this.board[row][col].house) {
    return false;
  }

  return true;
};
