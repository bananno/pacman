
addTest(test => {
  test.map = [
    ' ',
  ];

  // GAME MODE GETTER

  test.game.scatter = true;
  test.check(
    'game mode returns \'scatter\' when scatter is true',
    'scatter',
    test.game.mode
  );

  test.game.scatter = false;
  test.check(
    'game mode returns \'chase\' when scatter is true',
    'chase',
    test.game.mode
  );

  // GAME TOGGLE MODE METHOD

  test.game.scatter = true;
  test.game.toggleMode();
  test.check(
    'game mode toggles from scatter to chase',
    'chase',
    test.game.mode
  );

  test.game.scatter = false;
  test.game.toggleMode();
  test.check(
    'game mode toggles from chase to scatter',
    'scatter',
    test.game.mode
  );

  // GHOSTS UPDATE WHEN GAME MODE UPDATES

  test.game.scatter = true;
  test.game.ghosts[0].mode = 'scatter';
  test.game.toggleMode();
  test.check(
    'ghosts in \'scatter\' mode are updated to \'chase\' when game mode updates',
    'chase',
    test.game.ghosts[0].mode
  );

  test.game.scatter = false;
  test.game.ghosts[0].mode = 'chase';
  test.game.toggleMode();
  test.check(
    'ghosts in \'chase\' mode are updated to \'scatter\' when game mode updates',
    'scatter',
    test.game.ghosts[0].mode
  );

  test.game.scatter = true;
  test.game.ghosts[0].mode = 'blue';
  test.game.toggleMode();
  test.check(
    'ghosts in \'blue\' mode are not updated when game mode updates',
    'blue',
    test.game.ghosts[0].mode
  );

  test.game.scatter = true;
  test.game.ghosts[0].mode = 'eyes';
  test.game.toggleMode();
  test.check(
    'ghosts in \'eyes\' mode are not updated when game mode updates',
    'eyes',
    test.game.ghosts[0].mode
  );

  // GHOST REVERT MODE METHOD

  test.game.scatter = false;
  test.game.ghosts[0].mode = 'scatter';
  test.game.ghosts[0].revertMode();
  test.check(
    'ghosts in \'scatter\' mode can be reverted to match game mode',
    'chase',
    test.game.ghosts[0].mode
  );

  test.game.scatter = true;
  test.game.ghosts[0].mode = 'chase';
  test.game.ghosts[0].revertMode();
  test.check(
    'ghosts in \'chase\' mode can be reverted to match game mode',
    'scatter',
    test.game.ghosts[0].mode
  );

  test.game.scatter = true;
  test.game.ghosts[0].mode = 'blue';
  test.game.ghosts[0].revertMode();
  test.check(
    'ghosts in \'blue\' mode cannot be reverted to match game mode',
    'blue',
    test.game.ghosts[0].mode
  );

  test.game.scatter = true;
  test.game.ghosts[0].mode = 'eyes';
  test.game.ghosts[0].revertMode();
  test.check(
    'ghosts in \'eyes\' mode cannot be reverted to match game mode',
    'eyes',
    test.game.ghosts[0].mode
  );

  // GHOST REVERT MODE METHOD WITH FORCE

  test.game.scatter = true;
  test.game.ghosts[0].mode = 'blue';
  test.game.ghosts[0].revertMode(true);
  test.check(
    'ghosts in \'blue\' mode can be forced to revert to match game mode',
    'scatter',
    test.game.ghosts[0].mode
  );

  test.game.scatter = true;
  test.game.ghosts[0].mode = 'eyes';
  test.game.ghosts[0].revertMode(true);
  test.check(
    'ghosts in \'eyes\' mode can be forced to revert to match game mode',
    'scatter',
    test.game.ghosts[0].mode
  );

  // GAME MODE RESTARTED WHEN A LIFE IS LOST

  test.game.scatter = true;
  test.game.lives = 3;
  test.game.loseLife();
  test.check(
    'game mode resets to \'scatter\' when a life is lost',
    'scatter',
    test.game.mode
  );

  test.game.scatter = true;
  test.game.lives = 3;
  test.game.modeCount = 6;
  test.game.loseLife();
  test.check(
    'game mode counter resets to 0 when a life is lost',
    0,
    test.game.modeCount
  );

  // GHOST MODE IS REVERTED WHEN A LIFE IS LOST

  test.game.scatter = true;
  test.game.lives = 3;
  test.game.ghosts[0].mode = 'scatter';
  test.game.loseLife();
  test.check(
    'ghost in \'scatter\' mode stays in scatter mode when a life is lost',
    'scatter',
    test.game.ghosts[0].mode
  );

  test.game.scatter = true;
  test.game.lives = 3;
  test.game.ghosts[0].mode = 'chase';
  test.game.loseLife();
  test.check(
    'ghost in \'chase\' mode resets when a life is lost',
    'scatter',
    test.game.ghosts[0].mode
  );

  test.game.scatter = true;
  test.game.lives = 3;
  test.game.ghosts[0].mode = 'blue';
  test.game.loseLife();
  test.check(
    'ghost in \'blue\' mode resets when a life is lost',
    'scatter',
    test.game.ghosts[0].mode
  );

  test.game.scatter = true;
  test.game.lives = 3;
  test.game.ghosts[0].mode = 'eyes';
  test.game.loseLife();
  test.check(
    'ghost in \'eyes\' mode resets when a life is lost',
    'scatter',
    test.game.ghosts[0].mode
  );
});
