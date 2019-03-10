
function fastestPath([r1, c1], [r2, c2]) {
  $('td').removeClass('PATH-TEMP');
  $('td').removeClass('PATH-TEMP-END');

  let [i, j] = [r1, c1];
  let safety = 0;

  const directions = ['right', 'down', 'left', 'up'];
  let d = 0;

  const diff = {
    right: [0, 1],
    left: [0, -1],
    up: [-1, 0],
    down: [1, 0],
  };

  while (true) {

    if (board[i][j].wall || board[i][j].$.hasClass('PATH-TEMP')) {
      i -= diff[directions[d]][0];
      j -= diff[directions[d]][1];

      d += 1;
      if (d > 3) {
        d = 0;
      }
    }

    board[i][j].$.addClass('PATH-TEMP');

    i += diff[directions[d]][0];
    j += diff[directions[d]][1];



    safety += 1;
    if (safety > 100) {
      console.log('safety');
      break;
    }
  }

  board[r1][c1].$.addClass('PATH-TEMP-END');
  board[r2][c2].$.addClass('PATH-TEMP-END');
}
