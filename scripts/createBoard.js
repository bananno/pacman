
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
      const $col = $('<td>').appendTo($row);

      $col.attr('row', r).attr('col', c);

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
  const newPosition = [...pacmanPosition];

  if (pacmanDirection == 'left') {
    newPosition[1] -= 1;
  } else if (pacmanDirection == 'right') {
    newPosition[1] += 1;
  } else if (pacmanDirection == 'up') {
    newPosition[0] -= 1;
  } else if (pacmanDirection == 'down') {
    newPosition[0] += 1;
  }

  let $nextCol = $('.board-path[row="' + newPosition[0] + '"][col="' + newPosition[1] + '"]');

  if ($nextCol.length) {
    $nextCol.append($PACMAN);
    pacmanPosition = [...newPosition];
  }
}
