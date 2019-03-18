
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

function doValuesMatch(value1, value2) {
  if (value1 == value2 || value1 === WILD) {
    return true;
  }

  if (value1 == null || value2 == null) {
    return false;
  }

  if (value1.constructor == Array) {
    if (value2.constructor != Array || value1.length != value2.length) {
      return false;
    }

    for (let i = 0; i < value1.length; i++) {
      if (!doValuesMatch(value1[i], value2[i])) {
        return false;
      }
    }

    return true;
  }

  return false;
}
