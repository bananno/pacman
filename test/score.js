
addTest('Score', test => {
  test.map = [
    'P.+ ',
  ];

  test.game.score = 0;
  test.game.pacman.position = [0, 0];
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

  test.game.score = 0;
  test.game.pacman.position = [0, 1];
  test.game.pacman.direction = 'right';
  test.game.pacman.move();
  test.check(
    'tile no longer contains booster token after being eaten by pacman',
    false,
    test.game.tile(0, 2).token
  );

  test.game.score = 0;
  test.game.pacman.position = [0, 2];
  test.game.pacman.direction = 'right';
  test.game.ghosts[0].position = [0, 3];
  test.game.ghosts[0].mode = 'blue';
  test.game.pacman.move();
  test.check(
    'score increases by 20 when pacman catches a blue ghost',
    20,
    test.game.score
  );
});
