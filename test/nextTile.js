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

// GET COORDINATES FOR NEXT TILE ON COURSE (PASSABLE OR NOT)

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

// WHETHER CREATURE CAN MOVE GIVEN DIRECTION

addTest(test => {
  test.map = [
    '   ',
    ' P ',
    '   ',
  ];

  // UP

  test.game.board[0][1].wall = false;
  test.check(
    'creature can move up when tile is passable',
    true,
    test.game.pacman.canMove('up')
  );

  test.game.board[0][1].wall = true;
  test.check(
    'creature cannot move up when tile is not passable',
    false,
    test.game.pacman.canMove('up')
  );

  // LEFT

  test.game.board[1][0].wall = false;
  test.check(
    'creature can move left when tile is passable',
    true,
    test.game.pacman.canMove('left')
  );

  test.game.board[1][0].wall = true;
  test.check(
    'creature cannot move left when tile is not passable',
    false,
    test.game.pacman.canMove('left')
  );

  // RIGHT

  test.game.board[1][2].wall = false;
  test.check(
    'creature can move right when tile is passable',
    true,
    test.game.pacman.canMove('right')
  );

  test.game.board[1][2].wall = true;
  test.check(
    'creature cannot move right when tile is not passable',
    false,
    test.game.pacman.canMove('right')
  );

  // DOWN

  test.game.board[2][1].wall = false;
  test.check(
    'creature can move down when tile is passable',
    true,
    test.game.pacman.canMove('down')
  );

  test.game.board[2][1].wall = true;
  test.check(
    'creature cannot move down when tile is not passable',
    false,
    test.game.pacman.canMove('down')
  );
});

// LIST OF DIRECTION OPTIONS FOR CREATURES

addTest(test => {
  test.map = [
    '   ',
    ' P ',
    '   ',
  ];

  test.check(
    'direction options includes all directions when all tiles are passable',
    ['up', 'left', 'right', 'down'],
    test.game.pacman.getDirectionOptions()
  );

  test.game.board[0][1].wall = true;
  test.check(
    'direction options does not include up tile when not passable',
    ['left', 'right', 'down'],
    test.game.pacman.getDirectionOptions()
  );
  test.game.board[0][1].wall = false;

  test.game.board[1][0].wall = true;
  test.check(
    'direction options does not include left tile when not passable',
    ['up', 'right', 'down'],
    test.game.pacman.getDirectionOptions()
  );
  test.game.board[1][0].wall = false;

  test.game.board[1][2].wall = true;
  test.check(
    'direction options does not include right tile when not passable',
    ['up', 'left', 'down'],
    test.game.pacman.getDirectionOptions()
  );
  test.game.board[1][2].wall = false;

  test.game.board[2][1].wall = true;
  test.check(
    'direction options does not include down tile when not passable',
    ['up', 'left', 'right'],
    test.game.pacman.getDirectionOptions()
  );
  test.game.board[2][1].wall = false;
});
