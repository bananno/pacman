
Game.prototype.createBoard = function() {
  const $table = $('<table>');

  let countGhost = 0;

  const $numberedRow = createNumberedRow(this.mapTemplate);

  $table.append($numberedRow);

  this.mapTemplate.forEach((row, r) => {
    const $row = $('<tr>').appendTo($table);
    this.board[r] = [];

    const tiles = row.split('');

    $row.append($('<td class="test-coordinates">').text(r));

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

    $row.append($('<td class="test-coordinates">').text(r));
  });

  $table.append($numberedRow.clone());

  if (!this.isTest) {
    $('#board').html($table);
  }
};

function createNumberedRow(mapTemplate) {
  const numColumns = mapTemplate[0].split('').length;

  const $row = $('<tr>');

  $row.append('<td class="test-coordinates">');

  for (let c = 0; c < numColumns; c++) {
    $row.append($('<td class="test-coordinates">').text(c));
  }

  $row.append('<td class="test-coordinates">');

  return $row;
}
