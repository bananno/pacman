
function fastestPath([r1, c1], [r2, c2]) {
  $('td').removeClass('PATH-TEMP');

  board[r1][c1].$.addClass('PATH-TEMP');
  board[r2][c2].$.addClass('PATH-TEMP');

  if (r1 == r2) {
    for (let i = c1; i <= c2; i++) {
      board[r1][i].$.addClass('PATH-TEMP');
    }
  }

  if (c1 == c2) {
    for (let i = r1; i <= r2; i++) {
      board[i][c1].$.addClass('PATH-TEMP');
    }
  }
}
