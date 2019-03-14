
class Pinky extends Ghost {
  constructor(game) {
    super(game, 0);
    this.name = 'Pinky';
    this.color = 'pink';
  }
}

class Blinky extends Ghost {
  constructor(game) {
    super(game, 1);
    this.name = 'Blinky';
    this.color = 'red';
  }
}

class Clyde extends Ghost {
  constructor(game) {
    super(game, 2);
    this.name = 'Clyde';
    this.color = 'orange';
  }
}

class Inky extends Ghost {
  constructor(game) {
    super(game, 3);
    this.name = 'Inky';
    this.color = 'blue';
  }
}
