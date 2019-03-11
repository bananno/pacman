
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

function getNewPosition(direction, oldPosition) {
  if (direction == null || oldPosition.length == 0) {
    return null;
  }

  let newR = oldPosition[0] + positionAdjustment[direction][0];
  let newC = oldPosition[1] + positionAdjustment[direction][1];

  [newR, newC] = getWrappedCoordinates(newR, newC);

  return board[newR][newC].wall ? null : board[newR][newC];
}

function getWrappedCoordinates(row, col) {
  if (board[row] == null) {
    if (row == -1) {
      row = board.length - 1;
    } else {
      row = 0;
    }
  }

  if (board[row][col] == null) {
    if (col == -1) {
      col = board.length[0] - 1;
    } else {
      col = 0;
    }
  }

  return [row, col];
}

function getRandomDirection() {
  return chooseRandom(['up', 'down', 'left', 'right']);
}

function getDirectionOptions(creature, removeDirection, [row, col]) {
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
}

function isDeadEnd(creature, direction, position) {
  let row = position[0] + positionAdjustment[direction][0];
  let col = position[1] + positionAdjustment[direction][1];

  [row, col] = getWrappedCoordinates(row, col);

  return !tileIsPassable(creature, row, col);
}

function isIntersection(currentDirection, [row, col]) {
  if (currentDirection == 'left' || currentDirection == 'right') {
    return ((board[row][col - 1] && !board[row][col - 1].wall)
      || (board[row][col + 1] && !board[row][col + 1].wall));
  }

  return ((board[row - 1] && board[row - 1][col] && !board[row - 1][col].wall)
    || (board[row + 1] && board[row + 1][col] && !board[row + 1][col].wall));
}

function tileIsPassable(creature, row, col) {
  if (board[row] == null || board[row][col] == null || board[row][col].wall) {
    return false;
  }

  if (board[row][col].house && !creature.inHouse) {
    return false;
  }

  return true;
}
