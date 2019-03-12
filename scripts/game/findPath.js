
Game.prototype.findPath = function([r1, c1], [r2, c2]) {
  const game = this;

  const pathAlreadyCovered = [];

  $('td').removeClass('show-path');
  $('td').removeClass('show-path-end');

  let [i, j] = [r1, c1];
  let safety = 0;

  const intersections = [];

  let justReset = false;

  let currentTrail = getNewTrail(i, j);
  let testInterval;

  let intersectionCount = 0;

  const coords = [];

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

  function canMove(row, col) {
    const tile = game.tile(row, col);
    return tile && tile.isPassable() && !tile.house && !isPathCovered(row, col);
  }

  function getNewTrail(i, j) {
    return {
      i: i,
      j: j,
      start: [i, j],
      tried: [],
      path: [],
    };
  }

  testInterval = setInterval(() => {
    safety += 1;
    if (safety > 500) {
      console.error('Path finder exceeded iteration limit.');
      return breakInterval();
    }

    coverPath(i, j);

    if (i == r2 && j == c2) {
      coords.push([i, j]);
      return breakInterval();
    }

    const can = {
      up: canMove(i - 1, j),
      down: canMove(i + 1, j),
      left: canMove(i, j - 1),
      right: canMove(i, j + 1),
    };

    if (justReset) {
      justReset = false;
      currentTrail.tried.forEach(triedDirection => {
        can[triedDirection] = false;
      });
    } else {
      coords.push([i, j]);
    }

    let numOptions = can.up + can.down + can.left + can.right;

    if (numOptions == 0) {
      if (intersections.length == 0) {
        console.error('No path options.');
        return breakInterval();
      }

      [...currentTrail.path, [i, j]].forEach(([i1, j1]) => {
        uncoverPath(i1, j1);
        coords.length -= 1;
      });

      [i, j] = currentTrail.start;

      currentTrail = intersections[intersectionCount - 1];
      intersectionCount -= 1;

      justReset = true;

      return;
    }

    const isIntersection = numOptions > 1;

    let nextDirection = getNextDirection(i, j, r2, c2, can);

    if (isIntersection) {
      currentTrail.tried.push(nextDirection);

      intersections[intersectionCount] = currentTrail;
      intersectionCount += 1;

      currentTrail = getNewTrail(i, j);
    } else {
      currentTrail.path.push([i, j]);
    }

    i += positionAdjustment[nextDirection][0];
    j += positionAdjustment[nextDirection][1];
  }, 1);

  function breakInterval() {
    clearInterval(testInterval);

    game.tile(r1, c1).$.addClass('show-path-end');
    game.tile(r2, c2).$.addClass('show-path-end');

    coords.forEach(([r, c]) => {
      game.tile(r, c).$.addClass('show-path');
    });
  }
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
