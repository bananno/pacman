
addTest(test => {
  test.map = [
    ' ',
  ];

  test.game.pacman.position = [0, 0];
  test.game.ghosts[0].position = [0, 0];

  test.game.encounter(0, 0);
  test.check(
    'a life is lost when pacman encounters ghost and there are 3 lives remaining',
    2,
    test.game.lives
  );

  test.game.encounter(0, 0);
  test.check(
    'a life is lost when pacman encounters ghost and there are 2 lives remaining',
    1,
    test.game.lives
  );

  test.check(
    'game is not lost while there is 1 life remaining',
    false,
    test.game.isLost
  );

  test.game.encounter(0, 0);
  test.check(
    'game is lost when pacman encounters ghost and are 0 lives remaining',
    true,
    test.game.isLost
  );
});

addTest(test => {
  test.map = [
    ' ',
  ];

  test.game.pacman.position = [0, 0];
  test.game.ghosts[0].position = [0, 0];
  test.game.ghosts[0].mode = 'blue';
  test.game.ghosts[0].blue = true;
  test.game.lives = 3;

  test.game.encounter(0, 0);

  test.check(
    'encountered ghost in \'blue\' mode switches to \'eyes\' mode',
    'eyes',
    test.game.ghosts[0].mode
  );

  test.check(
    'a life is not lost when a blue ghost is encountered',
    3,
    test.game.lives
  );

  test.game.pacman.position = [0, 0];
  test.game.ghosts[0].position = [0, 0];
  test.game.ghosts[0].mode = 'eyes';
  test.game.ghosts[0].blue = false;
  test.game.ghosts[0].eyes = true;
  test.game.lives = 3;

  test.game.encounter(0, 0);

  test.check(
    'encountered ghost in \'eyes\' mode is not updated',
    'eyes',
    test.game.ghosts[0].mode
  );

  test.check(
    'a life is not lost when an eyes ghost is encountered',
    3,
    test.game.lives
  );
});
