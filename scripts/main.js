
function useKeyboard(e) {
  if (e.key.match('Arrow')) {
    let newDirection = e.key.toLowerCase().slice(5);

    if (getNewPosition(newDirection, pacman.position)) {
      pacman.direction = newDirection;
    }
  }
}

function eatToken() {
  ghosts.forEach(ghost => {
    ghost.turnBlue();
  });
}

function tileContainsBoth(tile) {
  return tile.$.html().match('ghost-dangerous') && tile.$.html().match('pacman');
}

function loseGame() {
  [pacman, ...ghosts].forEach(creature => {
    clearInterval(creature.movementInterval);
    clearInterval(creature.blueInterval);
  });

  setTimeout(() => {
    alert('You lose!');
    newGame();
  }, 250);
}
