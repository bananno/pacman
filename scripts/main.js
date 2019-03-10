
function createTimer() {
  pacman.interval = setInterval(movePacman, 250);
}

function movePacman() {
  const newTile = getNewPosition(pacman.direction);

  if (newTile == null) {
    return;
  }

  if (newTile.food) {
    newTile.food = false;
    newTile.$.text('');
  }

  newTile.$.append(pacman.$);
  pacman.position = [newTile.row, newTile.col];
}

function getNewPosition(direction) {
  let [newR, newC] = [...pacman.position];

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

function useKeyboard(e) {
  if (e.key.match('Arrow')) {
    let newDirection = e.key.toLowerCase().slice(5);

    if (getNewPosition(newDirection)) {
      pacman.direction = newDirection;
    }
  }
}
