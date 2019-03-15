
function chooseRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDirection() {
  return chooseRandom(['up', 'down', 'left', 'right']);
}

function getDirectionName([oldRow, oldCol], [newRow, newCol]) {
  if (newRow == oldRow) {
    if (newCol == 0 && oldCol > 1) {
      return 'right';
    }
    if (oldCol == 0 && newCol > 1) {
      return 'left';
    }
    return newCol < oldCol ? 'left' : 'right';
  }
  if (newRow == 0 && oldRow > 1) {
    return 'down';
  }
  if (oldRow == 0 && newRow > 1) {
    return 'up';
  }
  return newRow < oldRow ? 'up' : 'down';
}

function getDiagonalDistance([row1, col1], [row2, col2]) {
  return Math.round(Math.sqrt(((row1 - row2) ** 2) + ((col1 - col2) ** 2)) * 10) / 10;
}
