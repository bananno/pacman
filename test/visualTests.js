
function addTestButtons(game) {
  $('<button>').appendTo('#board').text('toggle grid').click(toggleGrid);

  $('#board').append('<br>');

  $('<button>').appendTo('#board').text('blue').click(eatToken);
  $('<button>').appendTo('#board').text('stop').click(clearAllIntervals);

  $('#board').append('<br>');

  $('<button>').appendTo('#board').text('move pacman').click(movePacman);
  $('<button>').appendTo('#board').text('move ghost left').click(moveGhostLeft);
  $('<button>').appendTo('#board').text('move ghost right').click(moveGhostRight);

  $('#board').append('<br>');

  $('<button>').appendTo('#board').text('turn up').click(turnAll('up'));
  $('<button>').appendTo('#board').text('turn left').click(turnAll('left'));
  $('<button>').appendTo('#board').text('turn right').click(turnAll('right'));
  $('<button>').appendTo('#board').text('turn down').click(turnAll('down'));

  function movePacman() {
    game.pacman.position = [11, 10];
  }

  function moveGhostLeft() {
    game.ghosts[0].position = [14, 3];
  }

  function moveGhostRight() {
    game.ghosts[1].position = [14, 25];
  }

  function eatToken() {
    game.eatToken();
  }

  function clearAllIntervals() {
    game.clearAllIntervals();
  }

  function turnAll(newDirection) {
    return (function() {
      this.creatures.forEach(creature => {
        creature.direction = newDirection;
      });
    }).bind(game);
  }
}

function toggleGrid() {
  if ($('#board').hasClass('normal')) {
    $('#board').removeClass('normal');
  } else {
    $('#board').addClass('normal');
  }
}
