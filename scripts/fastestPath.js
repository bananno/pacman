
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

  function getTile(row, col) {
    const tile = game.tile(row, col);

    if (tile && tile.isPassable()) {
      return tile;
    }

    return null;
  }

  let [i, j] = [r1, c1];
  let safety = 0;

  while (true) {
    game.tile(i, j).$.addClass('PATH-TEMP');

    if (i == r2 && j == c2) {
      console.log('success');
      break;
    }

    let up = getTile(i - 1, j);
    let down = getTile(i + 1, j);
    let left = getTile(i, j - 1);
    let right = getTile(i, j + 1);

    let numOptions = (up != null) + (down != null) + (left != null) + (right != null);

    if (numOptions == 0) {
      console.log('dead end');
      break;
    }

    if (numOptions > 1) {
      game.tile(i, j).$.addClass('PATH-TEMP-CHOICE');
    }

    let direction = up ? 'up' : down ? 'down' : left ? 'left' : 'right';

    i += diff[direction][0];
    j += diff[direction][1];

    safety += 1;
    if (safety > 100) {
      console.log('safety');
      break;
    }
  }
}
