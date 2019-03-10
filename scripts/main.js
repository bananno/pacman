
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

function useKeyboard(e) {
  if (e.key.match('Arrow')) {
    let newDirection = e.key.toLowerCase().slice(5);

    if (getNewPosition(newDirection, pacman.position)) {
      pacman.direction = newDirection;
    }
  }
}

function eatToken() {
  ghosts.forEach(ghost => {
    ghost.turnBlue();
  });
}
