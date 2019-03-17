
addTest('Tile types', test => {
  test.map = [
    '|.+tPgG',
  ];

  test.check(
    'pipe indicates a wall',
    true,
    test.game.tile(0, 0).wall
  );

  test.check(
    'period indicates food',
    true,
    test.game.tile(0, 1).food
  );

  test.check(
    'plus indicates booster token',
    true,
    test.game.tile(0, 2).token
  );

  test.check(
    't indicates ghost corner target',
    true,
    test.game.tile(0, 3).corner
  );

  test.check(
    'corner target is also food',
    true,
    test.game.tile(0, 3).food
  );

  test.check(
    'P indicates pacman initial position',
    [0, 4],
    test.game.pacman.position
  );

  test.check(
    'g indicates ghost house',
    true,
    test.game.tile(0, 5).house
  );

  test.check(
    'G indicates ghost initial position',
    [0, 6],
    test.game.ghosts[0].position
  );

  test.check(
    'ghost initial position is also ghost house',
    true,
    test.game.tile(0, 6).house
  );
});

addTest('Designated "doorway" tiles', test => {
  test.map = [
    '||||||',
    '|gg  |',
    '||||||',
  ];

  test.check(
    'ghost house tiles with no adjacent empty spaces are not considered doorways',
    false,
    test.game.tile(1, 1).doorway
  );

  test.check(
    'ghost house tiles with adjacent empty spaces are considered doorways',
    true,
    test.game.tile(1, 2).doorway
  );
});

addTest('tile.neighbor(direction)', test => {
  test.map = [
    '    ',
    '    ',
    '    ',
  ];

  test.check(
    'neighbor tile in the "up" direction',
    [0, 1],
    test.game.tile(1, 1).neighbor('up').position
  );

  test.check(
    'neighbor tile in the "left" direction',
    [1, 0],
    test.game.tile(1, 1).neighbor('left').position
  );

  test.check(
    'neighbor tile in the "right" direction',
    [1, 2],
    test.game.tile(1, 1).neighbor('right').position
  );

  test.check(
    'neighbor tile in the "down" direction',
    [2, 1],
    test.game.tile(1, 1).neighbor('down').position
  );

  test.check(
    'neighbor tile over the edge of board returns null by default instead of wrapping around',
    null,
    test.game.tile(0, 1).neighbor('up')
  );

  test.check(
    'neighbor tile wraps around board when given "true"',
    [2, 1],
    test.game.tile(0, 1).neighbor('up', true).position
  );
});
