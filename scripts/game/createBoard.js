
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

    tiles.forEach((tileChar, c) => {
      const tile = new Tile(r, c, tileChar);

      $row.append(tile.$);

      this.board[r][c] = tile;

      if (tile.pacman) {
        this.pacman.position = [r, c];
        return;
      } else if (tile.ghost) {
        this.ghosts[countGhost].position = [r, c];
        countGhost += 1;
        return;
      }
    });

    $row.append($('<td class="test-coordinates">' + r + '</td>'));
  });

  $table.append($numberedRow.clone());

  if (!this.isTest) {
    $('#board').html($table);
  }
};
