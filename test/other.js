
addTest(test => {
  test.map = [
    '  dd ',
    '  d  ',
  ];

  // FIND ALL DOORWAY TILES

  test.check(
    'empty space is passable for any creature', 3,
    test.game.doorwayTiles.length
  );
});
