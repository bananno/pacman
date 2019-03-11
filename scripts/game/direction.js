
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

Game.prototype.getNewPosition = function(direction, oldPosition) {
  if (direction == null || oldPosition.length == 0) {
    return null;
  }

  let newR = oldPosition[0] + positionAdjustment[direction][0];
  let newC = oldPosition[1] + positionAdjustment[direction][1];

  [newR, newC] = getWrappedCoordinates(newR, newC);

  return game.board[newR][newC].wall ? null : game.board[newR][newC];
};

Game.prototype.getWrappedCoordinates = function(row, col) {
  if (game.board[row] == null) {
    if (row == -1) {
      row = game.board.length - 1;
    } else {
      row = 0;
    }
  }

  if (game.board[row][col] == null) {
    if (col == -1) {
      col = game.board.length[0] - 1;
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

  if (tileIsPassable(creature, row, col - 1)) {
    options.push('left');
  }

  if (tileIsPassable(creature, row, col + 1)) {
    options.push('right');
  }

  if (tileIsPassable(creature, row - 1, col)) {
    options.push('up');
  }

  if (tileIsPassable(creature, row + 1, col)) {
    options.push('down');
  }

  return options.filter(dir => dir != removeDirection);
};

Game.prototype.isDeadEnd = function(creature, direction, position) {
  let row = position[0] + positionAdjustment[direction][0];
  let col = position[1] + positionAdjustment[direction][1];

  [row, col] = getWrappedCoordinates(row, col);

  return !tileIsPassable(creature, row, col);
};

Game.prototype.isIntersection = function(currentDirection, [row, col]) {
  if (currentDirection == 'left' || currentDirection == 'right') {
    return ((game.board[row][col - 1] && !game.board[row][col - 1].wall)
      || (game.board[row][col + 1] && !game.board[row][col + 1].wall));
  }

  return ((game.board[row - 1] && game.board[row - 1][col] && !game.board[row - 1][col].wall)
    || (game.board[row + 1] && game.board[row + 1][col] && !game.board[row + 1][col].wall));
};

Game.prototype.tileIsPassable = function(creature, row, col) {
  if (game.board[row] == null || game.board[row][col] == null || game.board[row][col].wall) {
    return false;
  }

  if (game.board[row][col].house && !creature.inHouse) {
    return false;
  }

  return true;
};
