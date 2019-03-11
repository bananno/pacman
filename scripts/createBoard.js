
Game.prototype.createBoard = function() {
  let $table = $('<table>');

  let countGhost = 0;

  const numColumns = this.map[0].split('').length;
  const $numberedRow = $('<tr>').appendTo($table);
  $numberedRow.append('<td class="test-coordinates">');
  for (let c = 0; c < numColumns; c++) {
    $numberedRow.append($('<td class="test-coordinates">' + c + '</td>'));
  }
  $numberedRow.append('<td class="test-coordinates">');

  this.map.forEach((row, r) => {
    const $row = $('<tr>').appendTo($table);
    this.board[r] = [];

    const tiles = row.split('');

    $row.append($('<td class="test-coordinates">' + r + '</td>'));

    tiles.forEach((tile, c) => {
      const $col = $('<td>').appendTo($row);

      this.board[r][c] = {
        $: $col,
        wall: false,
        food: false,
        row: r,
        col: c,
      };

      if (tile == '|') {
        $col.addClass('board-wall');
        this.board[r][c].wall = true;
        return;
      }

      $col.addClass('board-path');

      if (tile == 'P') {
        this.pacman.position = [r, c];
        return;
      }

      if (tile == 'G') {
        this.ghosts[countGhost].position = [r, c];
        this.board[r][c].house = true;
        countGhost += 1;
        return;
      }

      if (tile == 'g') {
        this.board[r][c].house = true;
        return;
      }

      if (tile == '.') {
        this.board[r][c].food = true;
      } else if (tile == '+') {
        this.board[r][c].token = true;
      }

      $col.text(tile);
    });

    $row.append($('<td class="test-coordinates">' + r + '</td>'));
  });

  $table.append($numberedRow.clone());

  if (!this.isTest) {
    $('#board').html($table);
  }
};
