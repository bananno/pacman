
$(document).ready(() => {
  createBoard();
  createTimer();
});

function createBoard() {
  let $table = $('<table>');

  maps[0].forEach((row, r) => {
    const $row = $('<tr>').appendTo($table);

    const tiles = row.split('');

    tiles.forEach((tile, c) => {
      const $col = $('<td>').appendTo($table);

      if (tile == '|') {
        $col.addClass('board-wall');
        return;
      }

      $col.addClass('board-path');

      if (tile == 'P') {
        $col.append($PACMAN);
        pacmanPosition = [r, c];
        return;
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
  console.log('move')
}
