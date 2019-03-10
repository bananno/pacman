
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
