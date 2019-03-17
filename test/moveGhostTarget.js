
// BASIC TARGET TILE SELECTION

addTest('Basic target tile selection', test => {
  test.map = [
    '||||||||||||||||||',
    '|t              t|',
    '|      |gg|      |',
    '|      |GG|  P   |',
    '|      |GG|      |',
    '|      ||||      |',
    '|t               |',
    '||||||||||||||||||',
  ];

  test.check(
    'ghost initial target tile is null',
    null,
    test.game.ghosts[0].target
  );

  test.game.ghosts[0].mode = 'scatter';
  test.check(
    'first ghost uses corresponding corner as target during scatter mode',
    [1, 1],
    test.game.ghosts[0].trueTarget
  );

  test.game.ghosts[3].mode = 'scatter';
  test.check(
    'target tile is null for any ghost that does not have a corresponding corner tile',
    null,
    test.game.ghosts[3].target
  );

  test.game.ghosts[0].mode = 'blue';
  test.check(
    'target tile is null while ghost is in blue mode',
    null,
    test.game.ghosts[0].target
  );

  test.game.ghosts[0].mode = 'eyes';
  test.check(
    'target tile is the ghost\'s origin while in eyes mode',
    [3, 8],
    test.game.ghosts[0].trueTarget
  );
});

// TEMPORARY TARGET TILE SELECTION: GHOST HOUSE DOOR

addTest('Ghost house door target selection', test => {
  test.map = [
    '|||||||||||',
    '|Ggg      |',
    '|ggg     t|',
    '|||||||||||',
  ];

  test.game.ghosts[0].origin = [1, 1];
  test.game.ghosts[0].position = [1, 1];
  test.game.ghosts[0].mode = 'scatter';
  test.check(
    'when ghost must exit the ghost house, the temporary target is the first door tile',
    [1, 3],
    test.game.ghosts[0].target
  );

  test.game.ghosts[0].origin = [1, 1];
  test.game.ghosts[0].position = [2, 9];
  test.game.ghosts[0].mode = 'eyes';
  test.check(
    'when ghost must enter the ghost house, the temporary target is the first door tile',
    [1, 3],
    test.game.ghosts[0].target
  );

  test.game.ghosts[0].origin = [1, 1];
  test.game.ghosts[0].position = [2, 3];
  test.game.ghosts[0].mode = 'scatter';
  test.check(
    'temporary exit target step is skipped when ghost is already in a doorway tile',
    [2, 9],
    test.game.ghosts[0].target
  );
});

// PINK GHOST (#0) CHASE TARGET

addTest('Pink ghost chase target', test => {
  test.map = [
    '     ',
    '     ',
    '  P  ',
    '     ',
    '     ',
  ];

  test.game.ghosts[0].position = [0, 0];
  test.game.ghosts[0].mode = 'chase';

  test.game.pacman.direction = 'up';
  test.check(
    'when pacman is moving up, pink ghost\'s true chase target is 4 tiles above pacman',
    [-2, 2],
    test.game.ghosts[0].trueTarget
  );

  test.game.pacman.direction = 'left';
  test.check(
    'when pacman is moving left, pink ghost\'s true chase target is 4 tiles to the left of pacman',
    [2, -2],
    test.game.ghosts[0].trueTarget
  );

  test.game.pacman.direction = 'right';
  test.check(
    'when pacman is moving right, pink ghost\'s true chase target is 4 tiles to the right of pacman',
    [2, 6],
    test.game.ghosts[0].trueTarget
  );

  test.game.pacman.direction = 'down';
  test.check(
    'when pacman is moving down, pink ghost\'s true chase target is 4 tiles below pacman',
    [6, 2],
    test.game.ghosts[0].trueTarget
  );

  test.game.pacman.direction = 'up';
  test.check(
    'pink ghost\'s actual target might not be a valid tile on the board',
    [-2, 2],
    test.game.ghosts[0].target
  );
});

// RED GHOST (#1) CHASE TARGET

addTest('Red ghost chase target', test => {
  test.map = [
    'GG     P',
  ];

  test.game.ghosts[1].mode = 'chase';
  test.check(
    'red ghost\'s chase target is pacman\'s location',
    [0, 7],
    test.game.ghosts[1].trueTarget
  );
});

// ORANGE GHOST (#2) CHASE TARGET

addTest('Orange ghost chase target', test => {
  test.map = [
    '         P',
    '          ',
    '          ',
    '          ',
    'tttt      ',
  ];

  test.game.ghosts[2].position = [0, 0];
  test.game.ghosts[2].mode = 'chase';
  test.check(
    'orange ghost\'s chase target is pacman\'s location when pacman farther than 8 tiles away',
    [0, 9],
    test.game.ghosts[2].trueTarget
  );

  test.game.ghosts[2].position = [0, 1];
  test.game.ghosts[2].mode = 'chase';
  test.check(
    'orange ghost\'s chase target is its own corner when pacman is within 8 tiles',
    [4, 2],
    test.game.ghosts[2].trueTarget
  );
});

// TEAL GHOST (#3) CHASE TARGET

addTest('Teal ghost chase target', test => {
  test.map = [
    '             ',
    '             ',
    '             ',
    '             ',
    '             ',
  ];

  test.game.pacman.position = [4, 6];
  test.game.ghosts[1].position = [1, 2];

  test.game.ghosts[3].position = [0, 0];
  test.game.ghosts[3].mode = 'chase';
  test.check(
    'teal ghost\'s chase target is based on both pacman\'s location and red ghost\'s location',
    [7, 10],
    test.game.ghosts[3].trueTarget
  );
});
