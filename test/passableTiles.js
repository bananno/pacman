
addTest('game.isTilePassable() - empty space', test => {
  test.map = [
    '||||||',
    '|    |',
    '|P   |',
    '|g   |',
    '|G   |',
    '|    |',
    '|    |',
    '||||||',
  ];

  // EMPTY SPACES

  test.check(
    'empty space is passable for any creature', true,
    test.game.isTilePassable(1, 3, null)
  );

  test.check(
    'empty space is passable for pacman', true,
    test.game.isTilePassable(2, 2, test.game.pacman)
  );

  test.check(
    'empty space is passable for ghost', true,
    test.game.isTilePassable(4, 2, test.game.ghosts[0])
  );

  test.title = 'game.isTilePassable() - wall';

  test.check(
    'wall is not passable for any creature', false,
    test.game.isTilePassable(1, 0, null)
  );

  test.check(
    'wall is not passable for pacman', false,
    test.game.isTilePassable(2, 0, test.game.pacman)
  );

  test.check(
    'wall is not passable for ghost', false,
    test.game.isTilePassable(4, 0, test.game.ghosts[0])
  );

  test.title = 'game.isTilePassable() - ghost house';

  test.check(
    'pacman cannot enter ghost house', false,
    test.game.isTilePassable(3, 1, test.game.pacman)
  );

  test.game.ghosts[0].tile.house = true;
  test.check(
    'ghost that is in house can enter another house tile', true,
    test.game.isTilePassable(3, 1, test.game.ghosts[0])
  );

  test.game.ghosts[0].tile.house = false;
  test.check(
    'ghost that is not in house cannot enter a house tile', false,
    test.game.isTilePassable(3, 1, test.game.ghosts[0])
  );
});

// GHOST HOUSE DOORWAY

addTest('game.isTilePassable() - ghost house doorway', test => {
  test.map = [
    ' Gd ',
  ];

  test.check(
    'ghost that is in house can enter a doorway tile', true,
    test.game.isTilePassable(0, 2, test.game.ghosts[0])
  );

  test.game.ghosts[0].position = [0, 2];
  test.check(
    'ghost that is in a doorway tile cannot enter a regular house tile', false,
    test.game.isTilePassable(0, 1, test.game.ghosts[0])
  );
});

addTest('game.isTilePassable() - ghost house & doorway depending on target', test => {
  test.map = [
    '|||||||||||',
    '|Gggd    t|',
    '|||||||||||',
  ];

  test.game.ghosts[0].position = [1, 3];
  test.game.ghosts[0].mode = 'eyes';
  test.check(
    'ghost in house can NOT enter a doorway tile if its target is in house',
    false,
    test.game.isTilePassable(1, 4, test.game.ghosts[0])
  );

  test.game.ghosts[0].position = [1, 4];
  test.game.ghosts[0].mode = 'eyes';
  test.check(
    'ghost in doorway can NOT enter a non-house tile if its target is in house',
    false,
    test.game.isTilePassable(1, 5, test.game.ghosts[0])
  );

  test.game.ghosts[0].position = [1, 4];
  test.game.ghosts[0].mode = 'eyes';
  test.game.tile(1, 4).doorway = false;
  test.check(
    'ghost in non-door house tile can NOT enter a non-house tile if its target is in house',
    false,
    test.game.isTilePassable(1, 4, test.game.ghosts[0])
  );
  test.game.tile(1, 4).doorway = true;

  test.game.ghosts[0].position = [1, 5];
  test.game.ghosts[0].mode = 'eyes';
  test.check(
    'ghost that is not in house CAN enter a house tile if its target is in house',
    true,
    test.game.isTilePassable(1, 4, test.game.ghosts[0])
  );

  test.game.ghosts[0].position = [1, 5];
  test.game.ghosts[0].mode = 'scatter';
  test.check(
    'ghost that is not in house can NOT enter a house tile if its target is not in house',
    true,
    test.game.isTilePassable(1, 4, test.game.ghosts[0])
  );
});

// WHETHER CREATURE CAN MOVE GIVEN DIRECTION

addTest('creature.canMove(direction)', test => {
  test.map = [
    '   ',
    ' P ',
    '   ',
  ];

  // UP

  test.game.tile(0, 1).wall = false;
  test.check(
    'creature can move up when tile is passable',
    true,
    test.game.pacman.canMove('up')
  );

  test.game.tile(0, 1).wall = true;
  test.check(
    'creature cannot move up when tile is not passable',
    false,
    test.game.pacman.canMove('up')
  );

  // LEFT

  test.game.tile(1, 0).wall = false;
  test.check(
    'creature can move left when tile is passable',
    true,
    test.game.pacman.canMove('left')
  );

  test.game.tile(1, 0).wall = true;
  test.check(
    'creature cannot move left when tile is not passable',
    false,
    test.game.pacman.canMove('left')
  );

  // RIGHT

  test.game.tile(1, 2).wall = false;
  test.check(
    'creature can move right when tile is passable',
    true,
    test.game.pacman.canMove('right')
  );

  test.game.tile(1, 2).wall = true;
  test.check(
    'creature cannot move right when tile is not passable',
    false,
    test.game.pacman.canMove('right')
  );

  // DOWN

  test.game.tile(2, 1).wall = false;
  test.check(
    'creature can move down when tile is passable',
    true,
    test.game.pacman.canMove('down')
  );

  test.game.tile(2, 1).wall = true;
  test.check(
    'creature cannot move down when tile is not passable',
    false,
    test.game.pacman.canMove('down')
  );
});
