
Creature.prototype.move = function() {
  if (this.position.length == 0) {
    return;
  }

  if (this.pacman && !this.canMove()) {
    return;
  }

  const [newRow, newCol] = this.chooseNextPosition();
  const newTile = this.game.tile(newRow, newCol);

  if (this.pacman) {
    this.eat(newTile);
  }

  this.position = [newRow, newCol];

  this.game.encounter(newRow, newCol);

  if (this.ghost && this.mode == 'eyes' && this.path.length == 0) {
    this.revertEyes();
  }
};

Creature.prototype.chooseNextPosition = function() {
  if (this.ghost) {
    if (this.mode == 'eyes') {
      return this.path.shift();
    }
    this.chooseDirection();
  }

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
