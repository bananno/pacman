
Game.prototype.findPath = function([r1, c1], [r2, c2]) {
  const game = this;

  $('td').removeClass('PATH-TEMP');
  $('td').removeClass('PATH-TEMP-END');
  $('td').removeClass('PATH-TEMP-CHOICE');
  $('td').removeClass('PATH-TEMP-REMOVED');

  const directions = ['right', 'down', 'left', 'up'];
  let d = 0;

  const diff = {
    right: [0, 1],
    left: [0, -1],
    up: [-1, 0],
    down: [1, 0],
  };

  this.tile(r1, c1).$.addClass('PATH-TEMP PATH-TEMP-END');
  this.tile(r2, c2).$.addClass('PATH-TEMP PATH-TEMP-END');

  function canMove(row, col) {
    const tile = game.tile(row, col);
    return tile && tile.isPassable() && !tile.house && (!tile.$.hasClass('PATH-TEMP')
      || tile.$.hasClass('PATH-TEMP-END'));
  }

  let [i, j] = [r1, c1];
  let safety = 0;

  const intersections = [];

  let justReset = false;

  function newTrail(i, j) {
    return {
      i: i,
      j: j,
      start: [i, j],
      tried: [],
      path: [],
    };
  }

  let currentTrail = newTrail(i, j);
  let testInterval;

  let intersectionCount = 0;

  const coords = [];

  testInterval = setInterval(() => {
    safety += 1;
    if (safety > 500) {
      console.log('safety');
      return breakInterval();
    }

    this.tile(i, j).$.addClass('PATH-TEMP PATH-TEMP-TRIED');

    if (i == r2 && j == c2) {
      coords.push([i, j]);
      console.log('success');
      return breakInterval();
    }

    const can = {
      up: canMove(i - 1, j),
      down: canMove(i + 1, j),
      left: canMove(i, j - 1),
      right: canMove(i, j + 1),
    };

    if (justReset) {
      if (currentTrail == null) {
        console.error('currentTrail is null');
        return breakInterval();
      }

      can.up = can.up && currentTrail.tried.indexOf('up') == -1;
      can.down = can.down && currentTrail.tried.indexOf('down') == -1;
      can.left = can.left && currentTrail.tried.indexOf('left') == -1;
      can.right = can.right && currentTrail.tried.indexOf('right') == -1;
    } else {
      coords.push([i, j]);
    }

    let numOptions = can.up + can.down + can.left + can.right;

    if (numOptions == 0) {
      console.log('dead end');

      if (intersections.length == 0) {
        console.log('no more options');
        return breakInterval();
      }

      [...currentTrail.path, [i, j]].forEach(([i1, j1]) => {
        this.tile(i1, j1).$.removeClass('PATH-TEMP');
        coords.length -= 1;
      });

      [i, j] = currentTrail.start;

      currentTrail = intersections[intersectionCount - 1];
      intersectionCount -= 1;

      justReset = true;

      return;
    }

    justReset = false;

    const isIntersection = numOptions > 1;

    let nextDirection = (() => {
      let order = ['up', 'down', 'left', 'right'];

      if (j < c2) {
        if (i < r2) {
          order = ['right', 'down', 'left', 'up'];
        } else {
          order = ['right', 'up', 'left', 'down'];
        }
      } else {
        if (i < r2) {
          order = ['down', 'left', 'right', 'up'];
        } else {
          order = ['left', 'up', 'right', 'down'];
        }
      }

      for (let x = 0; x < 4; x++) {
        if (can[order[x]]) {
          return order[x];
        }
      }
    })();

    if (isIntersection) {
      this.tile(i, j).$.addClass('PATH-TEMP-CHOICE');

      currentTrail.tried.push(nextDirection);

      intersections[intersectionCount] = currentTrail;
      intersectionCount += 1;

      currentTrail = newTrail(i, j);
    } else {
      currentTrail.path.push([i, j]);
    }

    i += diff[nextDirection][0];
    j += diff[nextDirection][1];
  }, 100);

  function breakInterval() {
    clearInterval(testInterval);
  }
};
