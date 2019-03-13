
addTest(test => {
  test.map = [
    ' ',
  ];

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
});
