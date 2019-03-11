
let board, pacman, ghosts;

$(document).ready(newGame);

$(document).keydown(useKeyboard);

function newGame() {
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
