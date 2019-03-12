
addTest(test => {
  test.map = [
    '||||||',
    '|    |',
    '|P   |',
    '|    |',
    '|G   |',
    '|    |',
    '|    |',
    '||||||',
  ];

  test.check(
    'Wall is not passable for any creature', false,
    test.game.isTilePassable(1, 0, null)
  );

  test.check(
    'Empty space is passable for any creature', true,
    test.game.isTilePassable(1, 3, null)
  );

  test.check(
    'Wall is not passable for pacman', false,
    test.game.isTilePassable(2, 0, test.game.pacman)
  );

  test.check(
    'Empty space is passable for pacman', true,
    test.game.isTilePassable(2, 2, test.game.pacman)
  );

  test.check(
    'Wall is not passable for ghost', false,
    test.game.isTilePassable(4, 0, test.game.ghosts[0])
  );

  test.check(
    'Empty space is passable for ghost', true,
    test.game.isTilePassable(4, 2, test.game.ghosts[0])
  );
});
