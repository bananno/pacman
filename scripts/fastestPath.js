
function fastestPath([r1, c1], [r2, c2]) {
  $('td').removeClass('PATH-TEMP');
  $('td').removeClass('PATH-TEMP-END');
  $('td').removeClass('PATH-TEMP-CHOICE');

  const directions = ['right', 'down', 'left', 'up'];
  let d = 0;

  const diff = {
    right: [0, 1],
    left: [0, -1],
    up: [-1, 0],
    down: [1, 0],
  };

  board[r1][c1].$.addClass('PATH-TEMP PATH-TEMP-END');
  board[r2][c2].$.addClass('PATH-TEMP PATH-TEMP-END');

  function getTile(row, col) {
    if (board[row] == null || board[row][col] == null || board[row][col].wall
        || board[row][col].$.hasClass('PATH-TEMP')) {
      return null;
    }

    return board[row][col];
  }

  let [i, j] = [r1, c1];
  let safety = 0;

  while (true) {
    board[i][j].$.addClass('PATH-TEMP');

    if (i == r2 && j == c2) {
      console.log('success');
      break;
    }

    let up = getTile(i - 1, j);
    let down = getTile(i + 1, j);
    let left = getTile(i, j - 1);
    let right = getTile(i, j + 1);

    let numOptions = (up != null) + (down != null) + (left != null) + (right != null);

    if (numOptions == 0) {
      console.log('dead end');
      break;
    }

    if (numOptions > 1) {
      board[i][j].$.addClass('PATH-TEMP-CHOICE');
    }

    let direction = up ? 'up' : down ? 'down' : left ? 'left' : 'right';

    i += diff[direction][0];
    j += diff[direction][1];

    safety += 1;
    if (safety > 100) {
      console.log('safety');
      break;
    }
  }
}
