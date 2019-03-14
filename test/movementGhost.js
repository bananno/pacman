
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
    'ghost can turn 90 degrees but cannot reverse directions when current direction is passable',
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
    'ghost can reverse directions when current direction is not passable',
    ['left', 'right', 'down'],
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

// TRAVEL TO CORNER IN SCATTER MODE

addTest(test => {
  test.map = [
    'tttt',
  ];

  test.check(
    'first ghost corresponds with first corner',
    [0, 1],
    test.game.ghosts[0].corner
  );

  test.check(
    'second ghost corresponds with second corner',
    [0, 2],
    test.game.ghosts[1].corner
  );

  test.check(
    'third ghost corresponds with third corner',
    [0, 3],
    test.game.ghosts[2].corner
  );

  test.check(
    'fourth ghost corresponds with fourth corner',
    [0, 4],
    test.game.ghosts[3].corner
  );
});

addTest(test => {
  test.map = [
    't',
  ];

  test.check(
    'first ghost corresponds with first corner',
    [0, 1],
    test.game.ghosts[0].corner
  );

  test.check(
    'ghost corner is undefined if there are not enough corners for all ghosts',
    undefined,
    test.game.ghosts[1].corner
  );

  test.game.scatter = false;
  test.game.toggleMode();

  test.check(
    'ghost enters \'scatter\' mode if it has a corresponding corner',
    'scatter',
    test.game.ghosts[0].mode
  );

  test.check(
    'ghost enters \'wander\' mode instead of scatter when there is no corner available',
    'wander',
    test.game.ghosts[1].mode
  );
});

addTest(test => {
  test.map = [
    '||||||||',
    '|    t |',
    '||||||||',
  ];

  test.game.ghosts[0].position = [1, 2];

  test.game.scatter = false;
  test.game.toggleMode();

  test.check(
    'ghost enters scatter mode when game mode is toggled',
    'scatter',
    test.game.ghosts[0].mode
  );

  test.check(
    'ghost creates a path to its designated corner when entering scatter mode',
    [[1, 2], [1, 3], [1, 4], [1, 5]],
    test.game.ghosts[0].path
  );
});

// RETURN TO HOUSE IN EYES MODE

addTest(test => {
  test.map = [
    '||||||||',
    '|gGgd  |',
    '||||||||',
  ];

  test.game.ghosts[0].position = [1, 6];

  test.check(
    'ghost origin is the original position before any movement',
    [1, 2],
    test.game.ghosts[0].origin
  );

  test.game.ghosts[0].mode = 'blue';
  test.game.ghosts[0].catchBlue();

  test.check(
    'ghost creates path to origin when caught',
    [[1, 5], [1, 4], [1, 3], [1, 2]],
    test.game.ghosts[0].path
  );

  test.game.ghosts[0].move();

  test.check(
    'ghost in eyes mode moves to next location in path array',
    [1, 5],
    test.game.ghosts[0].position
  );

  test.check(
    'next position is removed from ghost path array when ghost moves into position',
    [[1, 4], [1, 3], [1, 2]],
    test.game.ghosts[0].path
  );

  test.game.ghosts[0].move();
  test.game.ghosts[0].move();

  test.check(
    'next position is removed from ghost path array when ghost moves into position',
    [[1, 2]],
    test.game.ghosts[0].path
  );

  test.check(
    'ghost stays in \'eyes\' mode as long as there are positions remaining in the list',
    'eyes',
    test.game.ghosts[0].mode
  );

  test.game.ghosts[0].move();

  test.check(
    'ghost path array is empty when ghost reaches final position',
    [],
    test.game.ghosts[0].path
  );

  test.check(
    'ghost final position is its origin',
    test.game.ghosts[0].origin,
    test.game.ghosts[0].position
  );

  test.check(
    'ghost reverts to current game mode as soon as the last position is occupied',
    test.game.mode,
    test.game.ghosts[0].mode
  );
});
