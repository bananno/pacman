
function addTestButtons(game) {
  $('<button>').appendTo('#board').text('toggle grid').click(toggleGrid);

  $('#board').append('<br>');

  $('<button>').appendTo('#board').text('move pacman').click(movePacman);
  $('<button>').appendTo('#board').text('move ghost left').click(moveGhostLeft);
  $('<button>').appendTo('#board').text('move ghost right').click(moveGhostRight);

  $('#board').append('<br>');

  $('<button>').appendTo('#board').text('path1').click(findPath([3, 6], [5, 8]));
  $('<button>').appendTo('#board').text('path2').click(findPath([5, 3], [5, 10]));
  $('<button>').appendTo('#board').text('path3').click(findPath([3, 6], [12, 6]));
  $('<button>').appendTo('#board').text('path4').click(findPath([5, 3], [12, 6]));
  $('<button>').appendTo('#board').text('path5').click(findPath([8, 5], [20, 19]));
  $('<button>').appendTo('#board').text('path6').click(findPath([5, 13], [20, 19]));

  function movePacman() {
    game.pacman.position = [11, 10];
  }

  function moveGhostLeft() {
    game.ghosts[0].position = [14, 3];
  }

  function moveGhostRight() {
    game.ghosts[1].position = [14, 25];
  }

  function findPath(arr1, arr2) {
    return function() {
      game.findPath(arr1, arr2);
    };
  }
}

function toggleGrid() {
  if ($('#board').hasClass('normal')) {
    $('#board').removeClass('normal');
  } else {
    $('#board').addClass('normal');
  }
}
