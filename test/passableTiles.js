
addTest(test => {
  test.map = [
    '||||',
    '|  |',
    '|P |',
    '|  |',
    '||||',
  ];

  test.check(
    'Wall is not passable for any creature', false,
    test.game.isTilePassable(2, 0, null)
  );

  test.check(
    'Wall is not passable for pacman', false,
    test.game.isTilePassable(2, 0, test.game.pacman)
  );

  test.check(
    'Empty space is passable for any creature', true,
    test.game.isTilePassable(2, 1, null)
  );

  test.check(
    'Empty space is passable for Pacman', true,
    test.game.isTilePassable(2, 1, test.game.pacman)
  );
});
