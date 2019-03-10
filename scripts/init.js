
let board;

const pacman = new Pacman();
const ghosts = [];

for (let i = 0; i < 4; i++) {
  ghosts.push(new Ghost());
}

$(document).ready(() => {
  createBoard();
  createTimer();
});

$(document).keydown(useKeyboard);
