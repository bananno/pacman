
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
  return ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)];
}

function getRandomValidDirection(position, removeDirection, directionList) {
  directionList = directionList || ['up', 'down', 'left', 'right'];

  directionList = directionList.filter(dir => dir != removeDirection);

  if (directionList.length == 0) {
    return null;
  }

  let index = Math.floor(Math.random() * directionList.length);
  let newDirection = directionList[index];
  let newTile = getNewPosition(newDirection, position);

  if (newTile) {
    return newDirection;
  }

  return getRandomValidDirection(position, newDirection, directionList)
}

function isDeadEnd(direction, position) {
  return getNewPosition(direction, position) == null;
}
