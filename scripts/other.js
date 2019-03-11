
function tileContainsBoth(tile) {
  return tile.$.html().match('ghost-dangerous') && tile.$.html().match('pacman');
}

function chooseRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}
