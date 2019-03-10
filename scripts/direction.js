
function getNewPosition(direction, oldPosition) {
  let [newR, newC] = [...oldPosition];

  if (direction == 'left') {
    newC -= 1;
  } else if (direction == 'right') {
    newC += 1;
  } else if (direction == 'up') {
    newR -= 1;
  } else if (direction == 'down') {
    newR += 1;
  } else {
    return null;
  }

  if (board[newR] == null) {
    if (newR == -1) {
      newR = board.length - 1;
    } else {
      newR = 0;
    }
  }

  if (board[newR][newC] == null) {
    if (newC == -1) {
      newC = board.length[0] - 1;
    } else {
      newC = 0;
    }
  }

  return board[newR][newC].wall ? null : board[newR][newC];
}

function getRandomDirection() {
  return ['up', 'down', 'left', 'right'][Math.floor(Math.random() * 4)];
}

function getRandomValidDirection(position, oldDirection, directions) {
  directions = directions || ['up', 'down', 'left', 'right'];

  if (oldDirection) {
    directions = directions.filter(dir => dir != oldDirection);
  }

  if (directions.length == 0) {
    return null;
  }

  let index = Math.floor(Math.random() * directions.length);

  let newTile = getNewPosition(directions[index], position);

  if (newTile) {
    return directions[index];
  }

  return getRandomDirection(position, directions[index], directions)
}
