
new Test(() => {
  const testMap = [
    '||||',
    '|  |',
    '|P |',
    '|  |',
    '||||',
  ];

  const testGame = new Game(testMap, true);

  console.log(testGame);

  console.log('Wall is not passable for any creature');
  console.log(testGame.isTilePassable(2, 0, null));

  console.log('Wall is not passable for Pacman');
  console.log(testGame.isTilePassable(2, 0, testGame.pacman));

  console.log('Empty space is passable for any creature');
  console.log(testGame.isTilePassable(2, 1, null));

  console.log('Empty space is passable for Pacman');
  console.log(testGame.isTilePassable(2, 1, testGame.pacman));
});
