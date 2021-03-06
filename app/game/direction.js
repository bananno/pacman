
Game.prototype.getNextPosition = function(direction, oldPosition) {
  if (direction == null || oldPosition.length == 0) {
    return null;
  }

  let newR = oldPosition[0] + positionAdjustment[direction][0];
  let newC = oldPosition[1] + positionAdjustment[direction][1];

  return this.getWrappedCoordinates(newR, newC);
};

Game.prototype.getWrappedCoordinates = function(row, col) {
  if (this.board[row] == null) {
    if (row == -1) {
      row = this.board.length - 1;
    } else {
      row = 0;
    }
  }

  if (this.board[row][col] == null) {
    if (col == -1) {
      col = this.board[0].length - 1;
    } else {
      col = 0;
    }
  }

  return [row, col];
};

Game.prototype.isTilePassable = function(row, col, creature) {
  return this.tile(row, col).isPassable(creature);
};

Game.prototype.getDiagonalDistance = function([row1, col1], [row2, col2]) {
  return Math.round(Math.sqrt(((row1 - row2) ** 2) + ((col1 - col2) ** 2)) * 10) / 10;
};
