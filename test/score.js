
addTest('Food', test => {
  test.map = [
    'P...',
  ];

  test.check(
    'food attribute keeps track of how many food tiles remaing',
    3,
    test.game.foodLeft
  );

  test.game.pacman.direction = 'right';
  test.game.pacman.move();

  test.check(
    'food attribute is reduced when pacman eats one food',
    2,
    test.game.foodLeft
  );

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

addTest('Food', test => {
  test.map = [
    'P.'
  ];

  test.game.level = 1;
  test.game.pacman.direction = 'right';
  test.game.pacman.move();
  test.check(
    'level is won when pacman eats last food',
    2,
    test.game.level
  );
});

addTest('Token', test => {
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

addTest('Token', test => {
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

  test.game.score = 0;
  test.game.pacman.move();
  test.check(
    'score increases by 400 when pacman catches a 2nd blue ghost during a single blue period',
    400,
    test.game.score
  );

  test.game.score = 0;
  test.game.pacman.move();
  test.check(
    'score increases by 800 when pacman catches a 3rd blue ghost during a single blue period',
    800,
    test.game.score
  );

  test.game.score = 0;
  test.game.pacman.move();
  test.check(
    'score increases by 1600 when pacman catches a 4th blue ghost during a single blue period',
    1600,
    test.game.score
  );
});
