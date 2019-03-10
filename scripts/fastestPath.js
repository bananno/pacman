
function fastestPath([r1, c1], [r2, c2]) {
  $('td').removeClass('PATH-TEMP');

  if (r1 == r2) {
    for (let i = c1; i <= c2; i++) {
      board[r1][i].$.addClass('PATH-TEMP');
    }
  }
}
