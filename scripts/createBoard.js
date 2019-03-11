
function createBoard() {
  let $table = $('<table>');
  board = [];

  let countGhost = 0;

  const numColumns = maps[0][0].split('').length;
  const $numberedRow = $('<tr>').appendTo($table);
  $numberedRow.append('<td>');
  for (let c = 0; c < numColumns; c++) {
    $numberedRow.append($('<td class="test-coordinates">' + c + '</td>'));
  }
  $numberedRow.append('<td>');

  maps[0].forEach((row, r) => {
    const $row = $('<tr>').appendTo($table);
    board[r] = [];

    const tiles = row.split('');

    $row.append($('<td class="test-coordinates">' + r + '</td>'));

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
        pacman.position = [r, c];
        return;
      }

      if (tile == 'G') {
        ghosts[countGhost].position = [r, c];
        countGhost += 1;
        return;
      }

      if (tile == '.') {
        board[r][c].food = true;
      } else if (tile == '+') {
        board[r][c].token = true;
      }

      $col.text(tile);
    });

    $row.append($('<td class="test-coordinates">' + r + '</td>'));
  });

  $table.append($numberedRow.clone());

  $('#board').html($table);
}
