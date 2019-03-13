
Creature.prototype.move = function() {
  if (this.position.length == 0) {
    return;
  }

  let newRow, newCol;

  if (this.ghost && this.eyes && this.path.length) {
    [newRow, newCol] = this.path[0];
    this.path = this.path.slice(1);
  } else {
    if (this.ghost) {
      this.chooseDirection();
    } else if (!this.canMove()) {
      return;
    }

    [newRow, newCol] = this.getNextPosition();
  }

  const newTile = this.game.tile(newRow, newCol);

  if (this.pacman) {
    this.eat(newTile);
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
    const directionOptions = this.getDirectionOptions();
    this.direction = chooseRandom(directionOptions);
    return;
  }

  const directionToIgnore = oppositeDirection[this.direction];
  const directionOptions = this.getDirectionOptions(directionToIgnore);

  if (directionOptions.length > 1) {
    this.direction = chooseRandom(directionOptions);
  }
};
