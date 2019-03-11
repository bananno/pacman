
let game;

$(document).ready(newGame);

$(document).keydown(useKeyboard);

function newGame() {
  game = new Game();

  addTestButtons();
}
