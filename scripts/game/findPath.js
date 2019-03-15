
Game.prototype.getDiagonalDistance = function([row1, col1], [row2, col2]) {
  return Math.round(Math.sqrt(((row1 - row2) ** 2) + ((col1 - col2) ** 2)) * 10) / 10;
};
