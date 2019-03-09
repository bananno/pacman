
$(document).ready(() => {
  createBoard();
  createTimer();
});

$(document).keydown(useKeyboard);

function createBoard() {
  let $table = $('<table>');
  board = [];

  maps[0].forEach((row, r) => {
    const $row = $('<tr>').appendTo($table);
    board[r] = [];

    const tiles = row.split('');

    tiles.forEach((tile, c) => {
      const $col = $('<td>').appendTo($row);

      board[r][c] = {
        $: $col,
        wall: false,
        food: false,
        row: r,
        col: c,
      };

      if (tile == '|') {
        $col.addClass('board-wall');
        board[r][c].wall = true;
        return;
      }

      $col.addClass('board-path');

      if (tile == 'P') {
        $col.append($PACMAN);
        pacmanPosition = [r, c];
        return;
      }

      if (tile == '.') {
        board[r][c].food = true;
      }

      $col.text(tile);
    });
  });

  $('#board').html($table);
}

function createTimer() {
  pacmanInterval = setInterval(movePacman, 1000);
}

function movePacman() {
  const newTile = getNewPosition();

  if (newTile == null || newTile.wall) {
    return;
  }

  if (newTile.food) {
    newTile.food = false;
    newTile.$.text('');
  }

  newTile.$.append($PACMAN);
  pacmanPosition = [newTile.row, newTile.col];
}

function getNewPosition() {
  let [newR, newC] = [...pacmanPosition];

  if (pacmanDirection == 'left') {
    newC -= 1;
  } else if (pacmanDirection == 'right') {
    newC += 1;
  } else if (pacmanDirection == 'up') {
    newR -= 1;
  } else if (pacmanDirection == 'down') {
    newR += 1;
  }

  if (board[newR] == null || board[newR][newC] == null) {
    return null;
  }

  return board[newR][newC];
}

function useKeyboard(e) {
  if (e.key.match('Arrow')) {
    let newDirection = e.key.toLowerCase().slice(5);

    if (['up', 'down', 'left', 'right'].indexOf(newDirection) >= 0) {
      pacmanDirection = newDirection;
    }
  }
}
