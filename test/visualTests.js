
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

  $('#board').append('<br>');

  $('<button>').appendTo('#board').text('path1').click(showPath([3, 6], [5, 8]));
  $('<button>').appendTo('#board').text('path2').click(showPath([5, 3], [5, 10]));
  $('<button>').appendTo('#board').text('path3').click(showPath([3, 6], [12, 6]));
  $('<button>').appendTo('#board').text('path4').click(showPath([5, 3], [12, 6]));
  $('<button>').appendTo('#board').text('path5').click(showPath([8, 5], [20, 19]));
  $('<button>').appendTo('#board').text('path6').click(showPath([5, 13], [20, 19]));
  $('<button>').appendTo('#board').text('into house').click(showPath([26, 23], [14, 14]));
  $('<button>').appendTo('#board').text('out of house').click(showPath([14, 14], [26, 23]));

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

  function showPath(arr1, arr2) {
    return (function() {
      $('td').removeClass('show-path');
      $('td').removeClass('show-path-end');

      const coords = game.findPath(arr1, arr2);

      this.tile(arr1[0], arr1[1]).$.addClass('show-path-end');
      this.tile(arr2[0], arr2[1]).$.addClass('show-path-end');

      coords.forEach(([row, col]) => {
        this.tile(row, col).$.addClass('show-path');
      });
    }).bind(game);
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
