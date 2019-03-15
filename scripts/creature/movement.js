
Creature.prototype.move = function() {
  if (this.position == null) {
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
    const targetPosition = this.target;

    let tempClass = 'target-tile-' + (this.number + 1);
    $('.' + tempClass).removeClass(tempClass);
    if (this.target) {
      let targetTile = this.target;
      if (targetTile) this.game.tile(this.target).$.addClass(tempClass);
    }

    if (!this.game.isTest && this.target && this.number == 1) {

      const distances = {};

      ['up', 'down', 'left', 'right'].forEach(direction => {
        let targetCoords = this.target;

        if (this.canMove(direction)) {
          let [row, col] = this.game.getNextPosition(direction, this.position);
          distances[direction] = this.game.getDiagonalDistance([row, col], targetCoords);
        }
      });

      console.log(distances);
    }

    if (this.path.length) {
      const newPosition = this.path.shift();
      if (this.position) {
        this.direction = getDirectionName(this.position, newPosition);
      }
      return newPosition;
    }

    const directionOptions = this.getDirectionOptions();
    this.direction = chooseRandom(directionOptions);
  }

  return this.game.getNextPosition(this.direction, this.position);
};

Creature.prototype.canMove = function(tryDirection) {
  tryDirection = tryDirection || this.direction;
  const [newRow, newCol] = this.game.getNextPosition(tryDirection, this.position);
  return this.game.isTilePassable(newRow, newCol, this);
};

Creature.prototype.getPassableDirections = function() {
  return ['up', 'left', 'right', 'down'].filter(direction => {
    return this.canMove(direction);
  });
};

Ghost.prototype.getDirectionOptions = function() {
  const directionToIgnore = oppositeDirection[this.direction];

  const directionOptions = this.getPassableDirections().filter(direction => {
    return direction != directionToIgnore;
  });

  if (directionOptions == 0) {
    return directionToIgnore;
  }

  return directionOptions;
};
