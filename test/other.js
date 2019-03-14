
addTest(test => {
  test.map = [
    '  dd ',
    '  d  ',
    'tt   ',
  ];

  test.check(
    'tile getter returns all tiles',
    15,
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

addTest(test => {
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

addTest(test => {
  test.map = [
    ' '
  ];

  test.check(
    'creature position is null before being set',
    null,
    test.game.pacman.position
  );
});
