
function createBoard() {
  let $table = $('<table>');
  board = [];

  let countGhost = 0;

  const numColumns = maps[0][0].split('').length;
  const $numberedRow = $('<tr>').appendTo($table);
  $numberedRow.append('<td class="test-coordinates">');
  for (let c = 0; c < numColumns; c++) {
    $numberedRow.append($('<td class="test-coordinates">' + c + '</td>'));
  }
  $numberedRow.append('<td class="test-coordinates">');

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
        board[r][c].house = true;
        countGhost += 1;
        return;
      }

      if (tile == 'g') {
        board[r][c].house = true;
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
