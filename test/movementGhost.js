
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

  let numDirections = { up: 0, left: 0, right: 0, down: 0 };

  for (let count = 0; count < 30; count++) {
    test.game.ghosts[0].direction = 'up';
    test.game.ghosts[0].chooseDirection();
    numDirections[test.game.ghosts[0].direction] += 1;
  }

  test.check(
    'ghost will sometimes continue straight at an intersection',
    true,
    numDirections.up > 0
  );

  test.check(
    'ghost will sometimes turn left at an intersection',
    true,
    numDirections.left > 0
  );

  test.check(
    'ghost will sometimes turn right at an intersection',
    true,
    numDirections.right > 0
  );

  test.check(
    'ghost will never reverse directions at an intersection',
    true,
    numDirections.down == 0
  );
});
