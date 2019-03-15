
// BASIC TARGET TILE SELECTION

addTest(test => {
  test.map = [
    '||||||||||||||||||',
    '|t              t|',
    '|       GG   P   |',
    '|       GG       |',
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
    test.game.ghosts[0].target
  );

  test.game.ghosts[3].mode = 'scatter';
  test.check(
    'target tile is null for any ghost that does not have a corresponding corner tile',
    null,
    test.game.ghosts[3].target
  );

  test.game.ghosts[0].mode = 'blue';
  test.check(
    'target tile is null when ghost switches to blue mode',
    null,
    test.game.ghosts[0].target
  );

  test.game.ghosts[0].mode = 'eyes';
  test.check(
    'target tile is the ghost\'s origin when blue ghost is caught',
    [2, 8],
    test.game.ghosts[0].target
  );
});

// TEMPORARY TARGET TILE SELECTION: GHOST HOUSE DOOR

addTest(test => {
  test.map = [
    '|||||||||||',
    '|Ggd      |',
    '|ggd     t|',
    '|||||||||||',
  ];

  test.game.ghosts[0].mode = 'scatter';
  test.check(
    'when ghost must exit the ghost house, the temporary target is the first door tile',
    [1, 3],
    test.game.ghosts[0].target
  );

  test.game.ghosts[0].position = [2, 9];
  test.game.ghosts[0].mode = 'eyes';
  test.check(
    'when ghost must enter the ghost house, the temporary target is the first door tile',
    [1, 3],
    test.game.ghosts[0].target
  );
});

addTest(test => {
  test.map = [
    '|||||||||||',
    '|Ggg      |',
    '|ggg     t|',
    '|||||||||||',
  ];

  test.game.ghosts[0].mode = 'scatter';
  test.check(
    'temp temporary target step is skipped if the map has no ghost door tiles',
    [2, 9],
    test.game.ghosts[0].target
  );
});
