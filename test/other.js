
addTest('Game tile getters', test => {
  test.map = [
    '||||||||||',
    '|  |ggg| |',
    '|  |ggg| |',
    '|tt      |',
    '||||||||||',
  ];

  test.check(
    'tile getter returns all tiles',
    50,
    test.game.allTiles.length
  );

  test.check(
    'doorway getter returns all doorway tiles',
    3,
    test.game.doorwayTiles.length
  );

  test.check(
    'corner getter returns all corner target tiles',
    2,
    test.game.cornerTiles.length
  );
});

addTest('Assorted class attributes', test => {
  test.map = [
    ' '
  ];

  test.check(
    'creature position is null before being set',
    null,
    test.game.pacman.position
  );
});

addTest('game.isLost', test => {
  test.map = [
    ' '
  ];

  test.check(
    'lost game attribute is false before game is lost',
    false,
    test.game.isLost
  );

  test.game.loseGame();
  test.check(
    'lost game attribute is true after game is lost',
    true,
    test.game.isLost
  );
});

addTest('game.level', test => {
  test.map = [
    ' '
  ];

  test.game.level = 3;
  test.game.winLevel();
  test.check(
    'level is incremented when level is won',
    4,
    test.game.level
  );
});

// DIRECTION NAME HELPER

addTest('Get direction name between two positions', test => {
  test.map = [
    ' '
  ];

  test.check(
    'direction name returns up',
    'up',
    getDirectionName([5, 5], [4, 5])
  );

  test.check(
    'direction name returns left',
    'left',
    getDirectionName([5, 5], [5, 4])
  );

  test.check(
    'direction name returns right',
    'right',
    getDirectionName([5, 5], [5, 6])
  );

  test.check(
    'direction name returns down',
    'down',
    getDirectionName([5, 5], [6, 5])
  );

  test.check(
    'direction name returns up when wrapping from top to bottom',
    'up',
    getDirectionName([0, 5], [10, 5])
  );

  test.check(
    'direction name returns left when wrapping from left to right',
    'left',
    getDirectionName([5, 0], [5, 10])
  );

  test.check(
    'direction name returns right when wrapping from right to left',
    'right',
    getDirectionName([5, 10], [5, 0])
  );

  test.check(
    'direction name returns down when wrapping from bottom to top',
    'down',
    getDirectionName([10, 5], [0, 5])
  );
});
