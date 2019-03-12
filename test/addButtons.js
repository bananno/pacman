
function addTestButtons(game) {
  $('<button>').appendTo('#board').text('toggle grid').click(toggleGrid);

  $('#board').append('<br>');

  $('<button>').appendTo('#board').text('move pacman').click(movePacman);
  $('<button>').appendTo('#board').text('move ghost left').click(moveGhostLeft);
  $('<button>').appendTo('#board').text('move ghost right').click(moveGhostRight);

  $('#board').append('<br>');

  $('<button>').appendTo('#board').text('path1').click(() => callFastestPath([5, 3], [5, 10]));
  $('<button>').appendTo('#board').text('path2').click(() => callFastestPath([3, 6], [12, 6]));
  $('<button>').appendTo('#board').text('path3').click(() => callFastestPath([5, 3], [12, 6]));

  function movePacman() {
    game.pacman.position = [11, 10];
  }

  function moveGhostLeft() {
    game.ghosts[0].position = [14, 3];
  }

  function moveGhostRight() {
    game.ghosts[1].position = [14, 25];
  }

  function callFastestPath(arr1, arr2) {
    fastestPath(game, arr1, arr2);
  }
}

function toggleGrid() {
  if ($('#board').hasClass('normal')) {
    $('#board').removeClass('normal');
  } else {
    $('#board').addClass('normal');
  }
}
