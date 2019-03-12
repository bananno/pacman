
addTest(test => {
  test.map = [
    '|||||||',
    '|     |',
    '|  P  |',
    '|     |',
    '|||||||',
  ];

  test.game.pacman.direction = 'right';
  test.game.pressKey({ key: 'ArrowLeft' });

  test.check(
    'left arrow key turns pacman to left',
    'left',
    test.game.pacman.direction
  );
});
