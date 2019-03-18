
function addButton(buttonText, buttonClick, newLine) {
  if (newLine) {
    $('#test-buttons').append('<br>');
  }

  const $button = $('<button>').appendTo('#test-buttons').text(buttonText);

  if (buttonClick) {
    $button.click(buttonClick);
  }
}

function addTestButtons(game) {
  addButton('toggle grid', toggleGrid);
  addButton('toggle targets', toggleTargets);

  addButton('blue', eatToken, true);
  addButton('stop', clearAllIntervals);
  addButton('lose', () => { game.loseGame(); });
  addButton('win', () => { game.winGame(); });

  addButton('move pacman', movePacman, true);
  addButton('move ghost left', moveGhostLeft);
  addButton('move ghost right', moveGhostRight);

  addButton('turn up', turnAll('up'), true);
  addButton('turn left', turnAll('left'));
  addButton('turn right', turnAll('right'));
  addButton('turn down', turnAll('down'));

  function toggleTargets() {
    game.test.showTargets = !game.test.showTargets;
    if (!game.test.showTargets) {
      $('.target-tile-1').removeClass('target-tile-1');
      $('.target-tile-2').removeClass('target-tile-2');
      $('.target-tile-3').removeClass('target-tile-3');
      $('.target-tile-4').removeClass('target-tile-4');
    }
  }

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
  if ($('#board').hasClass('show-test-borders')) {
    $('#board').removeClass('show-test-borders');
  } else {
    $('#board').addClass('show-test-borders');
  }
}
