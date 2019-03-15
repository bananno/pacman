
Game.prototype.findPath = function([startRow, startCol], [finalRow, finalCol]) {
  const coords = [];
  const pathAlreadyCovered = [];
  const intersections = [];

  let safety = 0;
  let justReset = false;
  let testInterval;

  let [currentRow, currentCol] = [startRow, startCol];
  let [targetRow, targetCol] = [finalRow, finalCol];

  const startTile = this.tile(startRow, startCol);
  const finalTargetTile = this.tile(finalRow, finalCol);

  if (startTile.house != finalTargetTile.house) {
    const doorwayTiles = this.doorwayTiles;
    if (doorwayTiles.length) {
      [targetRow, targetCol] = [doorwayTiles[0].row, doorwayTiles[0].col];
    }
  }

  let currentTrail = getNewTrail(currentRow, currentCol);

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

  const canEnterTile = (row, col) => {
    const tile = this.tile(row, col);
    return tile != null && tile.isPassable() && !isPathCovered(row, col)
      && (!tile.house || this.tile(currentRow, currentCol).house || finalTargetTile.house);
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
      if (currentRow == finalRow && currentCol == finalCol) {
        coords.push([currentRow, currentCol]);
        break;
      }
      targetRow = finalRow;
      targetCol = finalCol;
    }

    const can = {
      up: canEnterTile(currentRow - 1, currentCol),
      down: canEnterTile(currentRow + 1, currentCol),
      left: canEnterTile(currentRow, currentCol - 1),
      right: canEnterTile(currentRow, currentCol + 1),
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

      [...currentTrail.path, [currentRow, currentCol]].forEach(([row, col]) => {
        uncoverPath(row, col);
        coords.length -= 1;
      });

      [currentRow, currentCol] = currentTrail.start;

      currentTrail = intersections[intersections.length - 1];
      intersections.length -= 1;

      justReset = true;

      continue;
    }

    const isIntersection = numOptions > 1;

    let nextDirection = getNextDirection(currentRow, currentCol, targetRow, targetCol, can);

    if (nextDirection == null) {
      console.error('No valid path directions.');
      break;
    }

    if (isIntersection) {
      currentTrail.tried.push(nextDirection);
      intersections.push(currentTrail);
      currentTrail = getNewTrail(currentRow, currentCol);
    } else {
      currentTrail.path.push([currentRow, currentCol]);
    }

    currentRow += positionAdjustment[nextDirection][0];
    currentCol += positionAdjustment[nextDirection][1];
  }

  return coords;
};

Game.prototype.getDiagonalDistance = function([row1, col1], [row2, col2]) {
  return Math.round(Math.sqrt(((row1 - row2) ** 2) + ((col1 - col2) ** 2)) * 10) / 10;
};

function getNextDirection(currentRow, currentCol, targetRow, targetCol, validDirections) {
  const order = getDirectionTryOrder(currentRow, currentCol, targetRow, targetCol);

  for (let i = 0; i < 4; i++) {
    if (validDirections[order[i]]) {
      return order[i];
    }
  }
}

function getDirectionTryOrder(currentRow, currentCol, targetRow, targetCol) {
  if (currentCol < targetCol) {
    if (currentRow < targetRow) {
      return ['right', 'down', 'left', 'up'];
    }

    return ['right', 'up', 'left', 'down'];
  }

  if (currentCol > targetCol) {
    if (currentRow < targetRow) {
      return ['left', 'down', 'right', 'up'];
    }

    return ['left', 'up', 'right', 'down'];
  }

  if (currentRow < targetRow) {
    return ['down', 'left', 'right', 'up'];
  }

  return ['up', 'left', 'right', 'down'];
}
