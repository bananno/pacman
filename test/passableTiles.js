
addTest(test => {
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

  // WALLS

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

  // GHOST HOUSE

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

addTest(test => {
  test.map = [
    ' Gd ',
  ];

  test.check(
    'ghost that is in house can enter a doorway tile', true,
    test.game.isTilePassable(0, 2, test.game.ghosts[0])
  );

  test.game.ghosts[0].position = [0, 2];
  test.check(
    'ghost that is doorway tile cannot enter a regular house tile', false,
    test.game.isTilePassable(0, 1, test.game.ghosts[0])
  );
});
