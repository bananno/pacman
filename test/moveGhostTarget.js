
// DISTANCE

addTest(test => {
  test.map = [
    ' '
  ];

  test.check(
    'distance between (0, 0) and (0, 1) is 1',
    1,
    test.game.getDiagonalDistance([0, 0], [0, 1])
  );

  test.check(
    'distance between (3, 7) and (15, 37) is ~32.3',
    32.3,
    test.game.getDiagonalDistance([3, 7], [15, 37])
  );
});

// TARGET TILE SELECTION

addTest(test => {
  test.map = [
    '||||||||||||||||||',
    '|t              t|',
    '|       GG   P   |',
    '|       GG       |',
    '|t               |',
    '||||||||||||||||||',
  ];

  test.check(
    'ghost initial target tile is null',
    null,
    test.game.ghosts[0].target
  );

  test.game.ghosts[0].mode = 'scatter';
  test.check(
    'first ghost uses corresponding corner as target during scatter mode',
    [1, 1],
    test.game.ghosts[0].target
  );

  test.game.ghosts[3].mode = 'scatter';
  test.check(
    'target tile is null for any ghost that does not have a corresponding corner tile',
    null,
    test.game.ghosts[3].target
  );

  test.game.ghosts[0].mode = 'blue';
  test.check(
    'target tile is null when ghost switches to blue mode',
    null,
    test.game.ghosts[0].target
  );

  test.game.ghosts[0].mode = 'eyes';
  test.check(
    'target tile is the ghost\'s origin when blue ghost is caught',
    [2, 8],
    test.game.ghosts[0].target
  );
});
