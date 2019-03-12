
Creature.prototype.move = function() {
  if (this.position.length == 0) {
    return;
  }

  if (this.ghost) {
    this.chooseDirection();
  } else if (!this.canMove()) {
    return;
  }

  const [newRow, newCol] = this.getNextPosition();
  const newTile = this.game.board[newRow][newCol];

  if (this.pacman) {
    this.eat(newTile);
  } else if (this.inHouse && !newTile.house) {
    this.inHouse = false;
  }

  this.position = [newTile.row, newTile.col];

  if (this.blue && newTile.$.html().match('pacman')) {
    return this.catchBlue();
  }

  if (tileContainsBoth(newTile)) {
    return this.game.lose();
  }
};

Creature.prototype.getNextPosition = function() {
  return this.game.getNextPosition(this.direction, this.position);
};

Creature.prototype.canMove = function(tryDirection) {
  tryDirection = tryDirection || this.direction;
  const [newRow, newCol] = this.game.getNextPosition(tryDirection, this.position);
  return this.game.isTilePassable(newRow, newCol, this);
};

Creature.prototype.getDirectionOptions = function(removeDirection) {
  return ['up', 'left', 'right', 'down'].filter(direction => {
    return direction != removeDirection && this.canMove(direction);
  });
};

Ghost.prototype.chooseDirection = function() {
  if (!this.canMove()) {
    const directionOptions = getDirectionOptions(this, this.direction, this.position);
    this.direction = chooseRandom(directionOptions);
    return;
  }

  if (isIntersection(this.direction, this.position)) {
    const ignoreOpposite = oppositeDirection[this.direction];
    const directionOptions = getDirectionOptions(this, ignoreOpposite, this.position);
    this.direction = chooseRandom(directionOptions);
    return;
  }
};
