
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

  $('#board').append('<button onClick="TEST_toggleGrid()">toggle grid</button><br>');

  $('#board').append('<button onClick="TEST_movePacman()">move pacman</button>');
  $('#board').append('<button onClick="TEST_moveGhostLeft()">move ghost left</button>');
  $('#board').append('<button onClick="TEST_moveGhostRight()">move ghost right</button><br>');

  $('#board').append('<button onClick="fastestPath([5, 3], [5, 10])">path1</button>');
  $('#board').append('<button onClick="fastestPath([3, 6], [12, 6])">path2</button>');
  $('#board').append('<button onClick="fastestPath([5, 3], [12, 6])">path3</button>');
}

function TEST_movePacman() {
  pacman.position = [11, 10];
}

function TEST_moveGhostLeft() {
  ghosts[0].position = [14, 3];
}

function TEST_moveGhostRight() {
  ghosts[1].position = [14, 25];
}

function TEST_toggleGrid() {
  if ($('#board').hasClass('normal')) {
    $('#board').removeClass('normal');
  } else {
    $('#board').addClass('normal');
  }
}
