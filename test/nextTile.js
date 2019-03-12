addTest(test => {
  test.map = [
    '      ',
    '      ',
    '      ',
  ];

  test.check(
    'top side of board wraps around to bottom side of board',
    [2, 0],
    test.game.getWrappedCoordinates(-1, 0)
  );

  test.check(
    'bottom side of board wraps around to top side of board',
    [0, 0],
    test.game.getWrappedCoordinates(3, 0)
  );

  test.check(
    'left side of board wraps around to right side of board',
    [0, 5],
    test.game.getWrappedCoordinates(0, -1)
  );

  test.check(
    'right side of board wraps around to left side of board',
    [0, 0],
    test.game.getWrappedCoordinates(0, 5)
  );
});
