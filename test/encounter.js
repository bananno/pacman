
addTest(test => {
  test.map = [
    '   ',
    '   ',
    '   ',
  ];

  test.game.pacman.position = [1, 1];
  test.game.ghosts[0].position = [1, 1];
  test.game.encounter();
  test.check(
    'life is lost when pacman encounters ghost and there are 2 lives remaining',
    1,
    test.game.lives
  );
});
