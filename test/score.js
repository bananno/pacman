
addTest('Score', test => {
  test.map = [
    'P.+',
  ];

  test.game.pacman.direction = 'right';
  test.game.pacman.move();

  test.check(
    'score increases by 10 when pacman moves into a tile with food',
    10,
    test.game.score
  );

  test.check(
    'tile no longer contains food after being eaten by pacman',
    false,
    test.game.tile(0, 1).food
  );

  test.game.pacman.move();

  test.check(
    'tile no longer contains token after being eaten by pacman',
    false,
    test.game.tile(0, 2).token
  );
});
