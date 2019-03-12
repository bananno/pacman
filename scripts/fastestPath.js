
function fastestPath(game, [r1, c1], [r2, c2]) {
  $('td').removeClass('PATH-TEMP');
  $('td').removeClass('PATH-TEMP-END');
  $('td').removeClass('PATH-TEMP-CHOICE');

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
    return tile && tile.isPassable() && !tile.$.hasClass('PATH-TEMP');
  }

  let [i, j] = [r1, c1];
  let safety = 0;

  const intersections = [];

  let justReset = false;

  while (true) {
    safety += 1;
    if (safety > 200) {
      console.log('safety');
      break;
    }

    game.tile(i, j).$.addClass('PATH-TEMP');

    if (i == r2 && j == c2) {
      console.log('success');
      break;
    }

    let up = canMove(i - 1, j);
    let down = canMove(i + 1, j);
    let left = canMove(i, j - 1);
    let right = canMove(i, j + 1);

    let numOptions = up + down + left + right;

    if (numOptions == 0) {
      console.log('dead end');

      justReset = true;

      const lastIntersection = intersections[intersections.length - 1];

      i = lastIntersection.i;
      j = lastIntersection.j;

      intersections[intersections.length - 1] = null;


      continue;
    }

    justReset = false;

    const isIntersection = numOptions > 1;

    if (isIntersection) {
      game.tile(i, j).$.addClass('PATH-TEMP-CHOICE');

      intersections.push({
        i: i,
        j: j,
        tried: [],
      });
    }

    let nextDirection = up ? 'up' : down ? 'down' : left ? 'left' : 'right';

    if (isIntersection) {
      intersections[intersections.length - 1].tried.push(nextDirection);
    }

    console.log(nextDirection);

    i += diff[nextDirection][0];
    j += diff[nextDirection][1];
  }
}
