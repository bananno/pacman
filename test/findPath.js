
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
    [[1, 0], [0, 0], [0, 1], [0, 2], [1, 2]],
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
