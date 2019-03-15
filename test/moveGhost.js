
addTest(test => {
  test.map = [
    '| |',
    '|G|',
    '| |',
  ];

  test.game.ghosts[0].position = [1, 1];
  test.game.ghosts[0].direction = 'up';
  test.game.ghosts[0].move();
  test.check(
    'ghost always moves up at non-intersection when direction is up and tile is passable',
    [0, 1],
    test.game.ghosts[0].position
  );

  test.game.ghosts[0].position = [1, 1];
  test.game.ghosts[0].direction = 'down';
  test.game.ghosts[0].move();
  test.check(
    'ghost always moves down at non-intersection when direction is down and tile is passable',
    [2, 1],
    test.game.ghosts[0].position
  );
});

addTest(test => {
  test.map = [
    '|||',
    ' G ',
    '|||',
  ];

  test.game.ghosts[0].position = [1, 1];
  test.game.ghosts[0].direction = 'left';
  test.game.ghosts[0].move();
  test.check(
    'ghost always moves left at non-intersection when direction is left and tile is passable',
    [1, 0],
    test.game.ghosts[0].position
  );

  test.game.ghosts[0].position = [1, 1];
  test.game.ghosts[0].direction = 'right';
  test.game.ghosts[0].move();
  test.check(
    'ghost always moves right at non-intersection when direction is right and tile is passable',
    [1, 2],
    test.game.ghosts[0].position
  );
});

addTest(test => {
  test.map = [
    '|||| |||',
    '|||| |||',
    '    G   ',
    '|||| |||',
    '|||| |||',
  ];

  test.game.ghosts[0].direction = 'up';
  test.check(
    'ghost cannot reverse directions when current direction is passable',
    ['up', 'left', 'right'],
    test.game.ghosts[0].getDirectionOptions()
  );
});

addTest(test => {
  test.map = [
    '||||||||',
    '||||||||',
    '    G   ',
    '|||| |||',
    '|||| |||',
  ];

  test.game.ghosts[0].direction = 'up';
  test.check(
    'ghost cannot reverse directions when any 90 degree turn is possible',
    ['left', 'right'],
    test.game.ghosts[0].getDirectionOptions()
  );
});

addTest(test => {
  test.map = [
    '||||||||',
    '||||||||',
    '||||G|||',
    '|||| |||',
    '|||| |||',
  ];

  test.game.ghosts[0].direction = 'up';
  test.check(
    'ghost can reverse directions when there are no other passable options',
    ['down'],
    test.game.ghosts[0].getDirectionOptions()
  );
});

addTest(test => {
  test.map = [
    '|||',
    ' G ',
    '|||',
  ];

  test.game.scatter = false;
  test.game.ghosts[0].direction = 'right';
  test.game.toggleMode();
  test.check(
    'ghost will reverse directions when game mode changes from chase to scatter',
    'left',
    test.game.ghosts[0].direction
  );

  test.game.scatter = true;
  test.game.ghosts[0].direction = 'right';
  test.game.toggleMode();
  test.check(
    'ghost will reverse directions when game mode changes from scatter to chase',
    'left',
    test.game.ghosts[0].direction
  );

  test.game.scatter = true;
  test.game.ghosts[0].direction = 'right';
  test.game.ghosts[0].mode = 'scatter';
  test.game.ghosts[0].turnBlue();
  test.check(
    'ghost will reverse directions when ghost mode changes to blue',
    'left',
    test.game.ghosts[0].direction
  );
});
