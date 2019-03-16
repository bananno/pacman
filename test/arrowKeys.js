
addTest('Arrow Keys', test => {
  test.map = [
    '|||||',
    '|   |', //     1,2
    '| P |', // 2,1     2,3
    '|   |', //     3,2
    '|||||',
  ];

  // UP

  test.game.pacman.direction = 'right';
  test.game.tile(1, 2).wall = false;
  test.game.pressKey({ key: 'ArrowUp' });
  test.check(
    'up arrow key turns pacman when up tile is passable',
    'up',
    test.game.pacman.direction
  );

  test.game.pacman.direction = 'right';
  test.game.tile(1, 2).wall = true;
  test.game.pressKey({ key: 'ArrowUp' });
  test.check(
    'up arrow key does nothing when up is not passable',
    'right',
    test.game.pacman.direction
  );

  // LEFT

  test.game.pacman.direction = 'right';
  test.game.tile(2, 1).wall = false;
  test.game.pressKey({ key: 'ArrowLeft' });
  test.check(
    'left arrow key turns pacman when left tile is passable',
    'left',
    test.game.pacman.direction
  );

  test.game.pacman.direction = 'right';
  test.game.tile(2, 1).wall = true;
  test.game.pressKey({ key: 'ArrowLeft' });
  test.check(
    'left arrow key does nothing when left is not passable',
    'right',
    test.game.pacman.direction
  );

  // RIGHT

  test.game.pacman.direction = 'up';
  test.game.tile(2, 3).wall = false;
  test.game.pressKey({ key: 'ArrowRight' });
  test.check(
    'right arrow key turns pacman when right tile is passable',
    'right',
    test.game.pacman.direction
  );

  test.game.pacman.direction = 'up';
  test.game.tile(2, 3).wall = true;
  test.game.pressKey({ key: 'ArrowRight' });
  test.check(
    'right arrow key does nothing when right is not passable',
    'up',
    test.game.pacman.direction
  );

  // DOWN

  test.game.pacman.direction = 'right';
  test.game.tile(3, 2).wall = false;
  test.game.pressKey({ key: 'ArrowDown' });
  test.check(
    'down arrow key turns pacman when down tile is passable',
    'down',
    test.game.pacman.direction
  );

  test.game.pacman.direction = 'right';
  test.game.tile(3, 2).wall = true;
  test.game.pressKey({ key: 'ArrowDown' });
  test.check(
    'down arrow key does nothing when down is not passable',
    'right',
    test.game.pacman.direction
  );
});

addTest(test => {
  test.map = [
    '   ', // 0,0  0,1  0,2
    '   ', // 1,0  1,1  1,2
    '   ', // 2,0  2,1  2,2
  ];

  // UP

  test.game.pacman.position = [0, 1];
  test.game.pacman.direction = 'right';
  test.game.tile(2, 1).wall = false;
  test.game.pressKey({ key: 'ArrowUp' });
  test.check(
    'up arrow key turns pacman when up wrap-around tile is passable',
    'up',
    test.game.pacman.direction
  );

  test.game.pacman.position = [0, 1];
  test.game.pacman.direction = 'right';
  test.game.tile(2, 1).wall = true;
  test.game.pressKey({ key: 'ArrowUp' });
  test.check(
    'up arrow key does nothing when up wrap-around tile is not passable',
    'right',
    test.game.pacman.direction
  );
  test.game.tile(2, 1).wall = false;

  // LEFT

  test.game.pacman.position = [1, 0];
  test.game.pacman.direction = 'right';
  test.game.tile(1, 2).wall = false;
  test.game.pressKey({ key: 'ArrowLeft' });
  test.check(
    'left arrow key turns pacman when left wrap-around tile is passable',
    'left',
    test.game.pacman.direction
  );

  test.game.pacman.position = [1, 0];
  test.game.pacman.direction = 'right';
  test.game.tile(1, 2).wall = true;
  test.game.pressKey({ key: 'ArrowLeft' });
  test.check(
    'left arrow key does nothing when left wrap-around tile is not passable',
    'right',
    test.game.pacman.direction
  );
  test.game.tile(1, 2).wall = false;

  // RIGHT

  test.game.pacman.position = [1, 2];
  test.game.pacman.direction = 'up';
  test.game.tile(1, 0).wall = false;
  test.game.pressKey({ key: 'ArrowRight' });
  test.check(
    'right arrow key turns pacman when right wrap-around tile is passable',
    'right',
    test.game.pacman.direction
  );

  test.game.pacman.position = [1, 2];
  test.game.pacman.direction = 'up';
  test.game.tile(1, 0).wall = true;
  test.game.pressKey({ key: 'ArrowRight' });
  test.check(
    'right arrow key does nothing when right wrap-around tile is not passable',
    'up',
    test.game.pacman.direction
  );
  test.game.tile(1, 0).wall = false;

  // DOWN

  test.game.pacman.position = [2, 1];
  test.game.pacman.direction = 'right';
  test.game.tile(0, 1).wall = false;
  test.game.pressKey({ key: 'ArrowDown' });
  test.check(
    'down arrow key turns pacman when down wrap-around tile is passable',
    'down',
    test.game.pacman.direction
  );

  test.game.pacman.position = [2, 1];
  test.game.pacman.direction = 'right';
  test.game.tile(0, 1).wall = true;
  test.game.pressKey({ key: 'ArrowDown' });
  test.check(
    'down arrow key does nothing when down wrap-around tile is not passable',
    'right',
    test.game.pacman.direction
  );
  test.game.tile(0, 1).wall = false;
});
