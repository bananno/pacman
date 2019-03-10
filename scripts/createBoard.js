
function createBoard() {
  let $table = $('<table>');
  board = [];

  let countGhost = 0;

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
        $col.append(pacman.$);
        pacman.position = [r, c];
        pacmanPosition = [r, c];
        return;
      }

      if (tile == 'G') {
        $col.append(ghosts[countGhost].$);
        countGhost += 1;
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
