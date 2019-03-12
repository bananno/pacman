
addTest(test => {
  test.map = [
    '    ', // 0,0  0,1  0,2  0,3
    '    ', // 1,0  1,1  1,2  1,3
    '    ', // 2,0  2,1  2,2  2,3
    '    ', // 3,0  3,1  3,2  3,3
  ];

  test.check(
    'path is directly right when possible',
    [[1, 0], [1, 1], [1, 2], [1, 3]],
    test.game.findPath([1, 0], [1, 3])
  );
});
