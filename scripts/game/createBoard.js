
Game.prototype.createBoard = function() {
  let countGhost = 0;

  this.mapTemplate.forEach((row, r) => {
    this.board[r] = [];

    const tiles = row.split('');

    tiles.forEach((tileChar, c) => {
      const tile = new Tile(this, r, c, tileChar);

      this.board[r][c] = tile;

      if (tile.pacman) {
        this.pacman.position = [r, c];
        return;
      }

      if (tile.ghost) {
        this.ghosts[countGhost].position = [r, c];
        countGhost += 1;
        return;
      }
    });
  });

  this.allTiles.forEach(tile => {
    tile.decideDoorwayAndWalls();
  });

  if (!this.isTest) {
    printBoardOnScreen(this.mapTemplate, this.board);
  }
};

function printBoardOnScreen(mapTemplate, board) {
  $('#board').html('');

  const $numberedRow = createNumberedRow(mapTemplate).appendTo('#board');

  board.forEach((row, r) => {
    const $row = $('<div class="board-row">').appendTo('#board');

    $row.append($('<div class="board-cell test-coordinates">').text(r));

    row.forEach((tile, c) => {
      $row.append(tile.$);
    });

    $row.append($('<div class="board-cell test-coordinates">').text(r));
  });

  $('#board').append($numberedRow.clone());
}

function createNumberedRow(mapTemplate) {
  const numColumns = mapTemplate[0].split('').length;

  const $row = $('<div class="board-row">');

  $row.append('<div class="board-cell test-coordinates">');

  for (let c = 0; c < numColumns; c++) {
    $row.append($('<div class="board-cell test-coordinates">').text(c));
  }

  $row.append('<div class="board-cell test-coordinates">');

  return $row;
}
