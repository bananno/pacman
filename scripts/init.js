
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

  $('#board').append('<button onClick="TEST_movePacman()">move pacman</button>');
}

function TEST_movePacman() {
  pacman.position = [11, 10];
}
