
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

// CORRESPONDING CORNERS

addTest(test => {
  test.map = [
    ' t t t  t ',
  ];

  test.check(
    'first ghost corresponds with first corner',
    [0, 1],
    test.game.ghosts[0].corner
  );

  test.check(
    'second ghost corresponds with second corner',
    [0, 3],
    test.game.ghosts[1].corner
  );

  test.check(
    'third ghost corresponds with third corner',
    [0, 5],
    test.game.ghosts[2].corner
  );

  test.check(
    'fourth ghost corresponds with fourth corner',
    [0, 8],
    test.game.ghosts[3].corner
  );
});

// CORNER TILE NOT AVAILABLE

addTest(test => {
  test.map = [
    't',
  ];

  test.check(
    'first ghost corresponds with first corner',
    [0, 0],
    test.game.ghosts[0].corner
  );

  test.check(
    'ghost corner is undefined if there are not enough corners for all ghosts',
    undefined,
    test.game.ghosts[1].corner
  );
});
