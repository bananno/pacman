
// MOVEMENT WITHOUT INITIAL POSITION

addTest(test => {
  test.map = [
    ' ',
  ];

  test.game.pacman.direction = 'up';
  test.game.pacman.move();
  test.check(
    'pacman does not move when no position is assigned',
    null,
    test.game.pacman.position
  );

  test.game.ghosts[0].direction = 'up';
  test.game.ghosts[0].move();
  test.check(
    'ghost does not move when no position is assigned',
    null,
    test.game.ghosts[0].position
  );
});

// PACMAN MOVEMENT OR NO MOVEMENT

addTest(test => {
  test.map = [
    '   ',
    ' P ',
    '   ',
  ];

  test.game.pacman.position = [1, 1];
  test.game.pacman.direction = 'up';
  test.game.pacman.move();
  test.check(
    'pacman moves up when direction is up and tile is passable',
    [0, 1],
    test.game.pacman.position
  );

  test.game.pacman.position = [1, 1];
  test.game.pacman.direction = 'up';
  test.game.tile(0, 1).wall = true;
  test.game.pacman.move();
  test.check(
    'pacman does not move up when up tile is not passable',
    [1, 1],
    test.game.pacman.position
  );

  test.game.pacman.position = [1, 1];
  test.game.pacman.direction = 'left';
  test.game.pacman.move();
  test.check(
    'pacman moves left when direction is left and tile is passable',
    [1, 0],
    test.game.pacman.position
  );

  test.game.pacman.position = [1, 1];
  test.game.pacman.direction = 'left';
  test.game.tile(1, 0).wall = true;
  test.game.pacman.move();
  test.check(
    'pacman does not move left when left tile is not passable',
    [1, 1],
    test.game.pacman.position
  );

  test.game.pacman.position = [1, 1];
  test.game.pacman.direction = 'right';
  test.game.pacman.move();
  test.check(
    'pacman moves right when direction is right and tile is passable',
    [1, 2],
    test.game.pacman.position
  );

  test.game.pacman.position = [1, 1];
  test.game.pacman.direction = 'right';
  test.game.tile(1, 2).wall = true;
  test.game.pacman.move();
  test.check(
    'pacman does not move right when right tile is not passable',
    [1, 1],
    test.game.pacman.position
  );

  test.game.pacman.position = [1, 1];
  test.game.pacman.direction = 'down';
  test.game.pacman.move();
  test.check(
    'pacman moves down when direction is down and tile is passable',
    [2, 1],
    test.game.pacman.position
  );

  test.game.pacman.position = [1, 1];
  test.game.pacman.direction = 'down';
  test.game.tile(2, 1).wall = true;
  test.game.pacman.move();
  test.check(
    'pacman does not move down when down tile is not passable',
    [1, 1],
    test.game.pacman.position
  );
});
