
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

  // $('#board').append('<button onClick="TEST_movePacman()">move pacman</button>');

  $('#board').append('<button onClick="TEST_toggleGrid()">toggle coordinates</button>');

  $('#board').append('<button onClick="fastestPath([5, 3], [5, 10])">path1</button>');
  $('#board').append('<button onClick="fastestPath([3, 6], [12, 6])">path2</button>');
  $('#board').append('<button onClick="fastestPath([5, 3], [12, 6])">path3</button>');
}

function TEST_movePacman() {
  pacman.position = [11, 10];
}

function TEST_toggleGrid() {
  if ($('#board').hasClass('show-grid')) {
    $('#board').removeClass('show-grid');
    $('.test-coordinates').hide();
  } else {
    $('#board').addClass('show-grid');
    $('.test-coordinates').show();
  }
}
