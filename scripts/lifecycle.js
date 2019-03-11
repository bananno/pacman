
function newGame() {
  game = new Game();
  pacman = new Pacman();
  ghosts = [];

  for (let i = 0; i < 4; i++) {
    ghosts.push(new Ghost(i));
  }

  createBoard();

  addTestButtons();
}

function startGame() {
  if (pacman.movementInterval) {
    return;
  }

  pacman.start();

  ghosts.forEach(ghost => {
    ghost.start();
  });
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
