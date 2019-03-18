
addTest('Score', test => {
  test.map = [
    'P.',
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
});

addTest('Score', test => {
  test.map = [
    'P+',
  ];

  test.game.pacman.direction = 'right';
  test.game.pacman.move();

  test.check(
    'score increases by 50 when pacman moves into a tile with a booster token',
    50,
    test.game.score
  );

  test.check(
    'tile no longer contains booster token after being eaten by pacman',
    false,
    test.game.tile(0, 1).token
  );
});

addTest('Score', test => {
  test.map = [
    'P    ',
  ];

  test.game.pacman.direction = 'right';
  test.game.ghosts[1].position = [0, 1];
  test.game.ghosts[3].position = [0, 2];
  test.game.ghosts[0].position = [0, 3];
  test.game.ghosts[2].position = [0, 4];
  test.game.eatToken();
  test.game.score = 0;

  test.game.pacman.move();
  test.check(
    'score increases by 200 when pacman catches a blue ghost',
    200,
    test.game.score
  );

  test.game.pacman.move();
  test.check(
    'score increases by 400 when pacman catches a 2nd blue ghost during a single blue period',
    400,
    test.game.score
  );

  test.game.pacman.move();
  test.check(
    'score increases by 800 when pacman catches a 3rd blue ghost during a single blue period',
    800,
    test.game.score
  );

  test.game.pacman.move();
  test.check(
    'score increases by 1600 when pacman catches a 4th blue ghost during a single blue period',
    1600,
    test.game.score
  );
});
