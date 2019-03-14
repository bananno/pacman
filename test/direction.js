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

// GET COORDINATES FOR NEXT TILE IN GIVEN DIRECTION (PASSABLE OR NOT)

addTest(test => {
  test.map = [
    '   ',
    '   ',
    '   ',
  ];

  test.check(
    'next tile when moving up',
    [0, 1],
    test.game.getNextPosition('up', [1, 1])
  );

  test.check(
    'next tile when moving left',
    [1, 0],
    test.game.getNextPosition('left', [1, 1])
  );

  test.check(
    'next tile when moving right',
    [1, 2],
    test.game.getNextPosition('right', [1, 1])
  );

  test.check(
    'next tile when moving down',
    [2, 1],
    test.game.getNextPosition('down', [1, 1])
  );

  test.game.tile(0, 1).wall = true;
  test.check(
    'next tile does not need to be passable',
    [0, 1],
    test.game.getNextPosition('up', [1, 1])
  );

  test.check(
    'next tile will wrap around board if necessary',
    [1, 0],
    test.game.getNextPosition('right', [1, 2])
  );
});

// LIST OF PASSABLE DIRECTIONS FOR CREATURE

addTest(test => {
  test.map = [
    '   ',
    ' P ',
    '   ',
  ];

  test.check(
    'passable directions list includes all directions when all tiles are passable',
    ['up', 'left', 'right', 'down'],
    test.game.pacman.getPassableDirections()
  );

  test.game.tile(0, 1).wall = true;
  test.check(
    'passable directions list does not include tiles that are not passable',
    ['left', 'right', 'down'],
    test.game.pacman.getPassableDirections()
  );

  test.game.pacman.position = [1, 2];
  test.check(
    'passable directions list includes wrap-around',
    ['up', 'left', 'right', 'down'],
    test.game.pacman.getPassableDirections()
  );
});
