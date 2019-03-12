
function fastestPath(game, [r1, c1], [r2, c2]) {
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

  game.tile(r1, c1).$.addClass('PATH-TEMP PATH-TEMP-END');
  game.tile(r2, c2).$.addClass('PATH-TEMP PATH-TEMP-END');

  function canMove(row, col) {
    const tile = game.tile(row, col);
    return tile && tile.isPassable() && (!tile.$.hasClass('PATH-TEMP')
      || tile.$.hasClass('PATH-TEMP-END'));
  }

  let [i, j] = [r1, c1];
  let safety = 0;

  const intersections = [];

  function newTrail(i, j) {
    return {
      start: [i, j],
      tried: [],
      path: [],
    };
  }

  let currentTrail = newTrail(i, j);
  let testInterval;

  testInterval = setInterval(() => {
    safety += 1;
    if (safety > 200) {
      console.log('safety');
      return clearInterval(testInterval);
    }

    game.tile(i, j).$.addClass('PATH-TEMP');

    if (i == r2 && j == c2) {
      console.log('success');
      return clearInterval(testInterval);
    }

    let up = canMove(i - 1, j);
    let down = canMove(i + 1, j);
    let left = canMove(i, j - 1);
    let right = canMove(i, j + 1);

    let numOptions = up + down + left + right;

    if (numOptions == 0) {
      console.log('dead end');

      if (intersections.length == 0) {
        console.log('no more options');
        return clearInterval(testInterval);
      }

      [i, j] = currentTrail.start;

      [...currentTrail.path, [i, j]].forEach(([i1, j1]) => {
        game.tile(i1, j1).$.removeClass('PATH-TEMP');
        game.tile(i1, j1).$.addClass('PATH-TEMP-REMOVED');
      });

      currentTrail = intersections[intersections.length - 1];
      intersections[intersections.length - 1] = null;

      return clearInterval(testInterval);
    }

    const isIntersection = numOptions > 1;

    if (isIntersection) {
      game.tile(i, j).$.addClass('PATH-TEMP-CHOICE');

      intersections.push(currentTrail);

      currentTrail = newTrail(i, j);
    }

    let nextDirection = up ? 'up' : down ? 'down' : left ? 'left' : 'right';

    if (isIntersection) {
      currentTrail.tried.push(nextDirection);
    } else {
      currentTrail.path.push([i, j]);
    }

    console.log(nextDirection);

    i += diff[nextDirection][0];
    j += diff[nextDirection][1];
  }, 100);
}
