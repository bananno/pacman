
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

  test.game.ghosts[3].mode = 'scatter';
  test.check(
    'target tile is null for any ghost that does not have a target tile available',
    null,
    test.game.ghosts[3].target
  );
});

addTest(test => {
  test.map = [
    '   ', // 0,0  0,1  0,2
    '   ', // 1,0  1,1  1,2
    '   ', // 2,0  2,1  2,2
  ];

  // DIRECT PATH

  test.check(
    'path is directly up when possible',
    [[2, 1], [1, 1], [0, 1]],
    test.game.findPath([2, 1], [0, 1])
  );

  test.check(
    'path is directly left when possible',
    [[1, 2], [1, 1], [1, 0]],
    test.game.findPath([1, 2], [1, 0])
  );

  test.check(
    'path is directly right when possible',
    [[1, 0], [1, 1], [1, 2]],
    test.game.findPath([1, 0], [1, 2])
  );

  test.check(
    'path is directly down when possible',
    [[0, 1], [1, 1], [2, 1]],
    test.game.findPath([0, 1], [2, 1])
  );

  // GHOST HOUSE

  test.game.tile(1, 1).house = true;
  test.check(
    'path will not enter ghost house tile if destination is not in house',
    [[1, 0], WILD, WILD, WILD, [1, 2]],
    test.game.findPath([1, 0], [1, 2])
  );

  test.game.tile(1, 1).house = true;
  test.game.tile(1, 2).house = true;
  test.check(
    'path will enter ghost house tile if destination is in house',
    [[1, 0], [1, 1], [1, 2]],
    test.game.findPath([1, 0], [1, 2])
  );

  test.game.tile(1, 0).house = true;
  test.game.tile(1, 1).house = true;
  test.game.tile(1, 2).house = false;
  test.check(
    'path will enter ghost house tile if origin is in house',
    [[1, 0], [1, 1], [1, 2]],
    test.game.findPath([1, 0], [1, 2])
  );
});

// DIRECTION PRIORITY

addTest(test => {
  test.map = [
    '   ', // 0,0  0,1  0,2
    ' | ', // 1,0   |   1,2
    '   ', // 2,0  2,1  2,2
  ];

  test.check(
    'when up and down are equidistant from target, up is chosen first',
    [[1, 0], [0, 0], [0, 1], [0, 2], [1, 2]],
    test.game.findPath([1, 0], [1, 2])
  );
});