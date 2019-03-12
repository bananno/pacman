// GET COORDINATES TO WRAP AROUND

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
    test.game.getWrappedCoordinates(0, 6)
  );
});

// GET COORDINATES FOR NEXT TILE ON COURSE

addTest(test => {
  test.map = [
    '   ',
    ' P ',
    '   ',
  ];

  test.game.pacman.direction = 'up';
  test.check(
    'next tile when moving up',
    [0, 1],
    test.game.pacman.getNextPosition()
  );

  test.game.pacman.direction = 'left';
  test.check(
    'next tile when moving left',
    [1, 0],
    test.game.pacman.getNextPosition()
  );

  test.game.pacman.direction = 'right';
  test.check(
    'next tile when moving right',
    [1, 2],
    test.game.pacman.getNextPosition()
  );

  test.game.pacman.direction = 'down';
  test.check(
    'next tile when moving down',
    [2, 1],
    test.game.pacman.getNextPosition()
  );
});
