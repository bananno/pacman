
addTest(test => {
  test.map = [
    ' ',
  ];

  test.game.pacman.direction = 'up';
  test.game.pacman.move();
  test.check(
    'pacman does not move when no position is assigned',
    [],
    test.game.pacman.position
  );

  test.game.ghosts[0].direction = 'up';
  test.game.ghosts[0].move();
  test.check(
    'ghost does not move when no position is assigned',
    [],
    test.game.ghosts[0].position
  );
});

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
  test.game.pacman.direction = 'left';
  test.game.pacman.move();
  test.check(
    'pacman moves left when direction is left and tile is passable',
    [1, 0],
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
  test.game.pacman.direction = 'down';
  test.game.pacman.move();
  test.check(
    'pacman moves down when direction is down and tile is passable',
    [2, 1],
    test.game.pacman.position
  );
});
