
function useKeyboard(e) {
  if (e.key.match('Arrow')) {
    let newDirection = e.key.toLowerCase().slice(5);

    game.start();

    if (getNewPosition(newDirection, game.pacman.position)) {
      game.pacman.direction = newDirection;
    }
  }
}

function tileContainsBoth(tile) {
  return tile.$.html().match('ghost-dangerous') && tile.$.html().match('pacman');
}

function chooseRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}
