
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
