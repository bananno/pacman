
Game.prototype.createBoard = function() {
  const $newBoard = $('<div>');
  const $boardRows = [];

  let countGhost = 0;

  const $numberedRow = createNumberedRow(this.mapTemplate);

  $boardRows.push($numberedRow);

  this.mapTemplate.forEach((row, r) => {
    const $row = $('<div class="board-row">');
    this.board[r] = [];

    const tiles = row.split('');

    $row.append($('<div class="board-cell test-coordinates">').text(r));

    tiles.forEach((tileChar, c) => {
      const tile = new Tile(this, r, c, tileChar);

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

    $row.append($('<td class="board-cell test-coordinates">').text(r));

    $boardRows.push($row);
  });

  this.allTiles.forEach(tile => {
    tile.decideDoorway();
  });

  $boardRows.push($numberedRow);

  if (!this.isTest) {
    $('#board').html('');
    $boardRows.forEach($row => {
      $('#board').append($row);
    });
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
