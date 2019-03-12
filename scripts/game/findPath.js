
Game.prototype.findPath = function([startRow, startCol], [targetRow, targetCol]) {
  const coords = [];
  const pathAlreadyCovered = [];
  const intersections = [];

  let [currentRow, currentCol] = [startRow, startCol];
  let safety = 0;
  let justReset = false;
  let currentTrail = getNewTrail(currentRow, currentCol);
  let testInterval;
  let intersectionCount = 0;

  function coverPath(row, col) {
    pathAlreadyCovered[row] = pathAlreadyCovered[row] || [];
    pathAlreadyCovered[row][col] = true;
  }

  function uncoverPath(row, col) {
    pathAlreadyCovered[row] = pathAlreadyCovered[row] || [];
    pathAlreadyCovered[row][col] = false;
  }

  function isPathCovered(row, col) {
    return pathAlreadyCovered[row] && pathAlreadyCovered[row][col];
  }

  const canMove = (row, col) => {
    const tile = this.tile(row, col);
    return tile && tile.isPassable() && !tile.house && !isPathCovered(row, col);
  };

  function getNewTrail(row, col) {
    return {
      start: [row, col],
      tried: [],
      path: [],
    };
  }

  while (true) {
    safety += 1;
    if (safety > 500) {
      console.error('Path finder exceeded iteration limit.');
      break;
    }

    coverPath(currentRow, currentCol);

    if (currentRow == targetRow && currentCol == targetCol) {
      coords.push([currentRow, currentCol]);
      break;
    }

    const can = {
      up: canMove(currentRow - 1, currentCol),
      down: canMove(currentRow + 1, currentCol),
      left: canMove(currentRow, currentCol - 1),
      right: canMove(currentRow, currentCol + 1),
    };

    if (justReset) {
      justReset = false;
      currentTrail.tried.forEach(triedDirection => {
        can[triedDirection] = false;
      });
    } else {
      coords.push([currentRow, currentCol]);
    }

    let numOptions = can.up + can.down + can.left + can.right;

    if (numOptions == 0) {
      if (intersections.length == 0) {
        console.error('No path options.');
        break;
      }

      [...currentTrail.path, [currentRow, currentCol]].forEach(([tempRow, tempCol]) => {
        uncoverPath(tempRow, tempCol);
        coords.length -= 1;
      });

      [currentRow, currentCol] = currentTrail.start;

      currentTrail = intersections[intersectionCount - 1];
      intersectionCount -= 1;

      justReset = true;

      continue;
    }

    const isIntersection = numOptions > 1;

    let nextDirection = getNextDirection(currentRow, currentCol, targetRow, targetCol, can);

    if (isIntersection) {
      currentTrail.tried.push(nextDirection);

      intersections[intersectionCount] = currentTrail;
      intersectionCount += 1;

      currentTrail = getNewTrail(currentRow, currentCol);
    } else {
      currentTrail.path.push([currentRow, currentCol]);
    }

    currentRow += positionAdjustment[nextDirection][0];
    currentCol += positionAdjustment[nextDirection][1];
  }

  return coords;
};

function getNextDirection(currentRow, currentCol, targetRow, targetCol, validDirections) {
  const order = getDirectionTryOrder(currentRow, currentCol, targetRow, targetCol);

  for (let i = 0; i < 4; i++) {
    if (validDirections[order[i]]) {
      return order[i];
    }
  }

  console.error('No valid path directions.');
}

function getDirectionTryOrder(currentRow, currentCol, targetRow, targetCol) {
  if (currentCol < targetCol) {
    if (currentRow < targetRow) {
      return ['right', 'down', 'left', 'up'];
    }

    return ['right', 'up', 'left', 'down'];
  }

  if (currentRow < targetRow) {
    return ['down', 'left', 'right', 'up'];
  }

  return ['left', 'up', 'right', 'down'];
}
