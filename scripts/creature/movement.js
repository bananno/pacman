
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

  if (this.ghost && this.mode == 'eyes' && this.position && this.origin
      && this.position[0] == this.origin[0] && this.position[1] == this.origin[1]) {
    this.revertEyes();
  }
};

Creature.prototype.chooseNextPosition = function() {
  if (this.ghost) {
    this.direction = this.getDirectionChoice();
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

Ghost.prototype.getDirectionChoice = function() {
  const targetPosition = this.target;
  const targetTileClass = 'target-tile-' + (this.number + 1);

  $('.' + targetTileClass).removeClass(targetTileClass);

  if (targetPosition == null) {
    const directionOptions = this.getDirectionOptions();
    return chooseRandom(directionOptions);
  }

  this.game.tile(targetPosition).$.addClass(targetTileClass);

  const distanceToTarget = {};

  ['up', 'down', 'left', 'right'].forEach(direction => {
    if (this.canMove(direction)) {
      let [row, col] = this.game.getNextPosition(direction, this.position);
      distanceToTarget[direction] = this.game.getDiagonalDistance([row, col], targetPosition);
    } else {
      distanceToTarget[direction] = 1000;
    }
  });

  distanceToTarget[oppositeDirection[this.direction]] += 500;

  let directionChoiceRanking = ['up', 'left', 'down', 'right'];

  directionChoiceRanking.sort((direction2, direction1) => {
    return distanceToTarget[direction2] - distanceToTarget[direction1];
  });

  return directionChoiceRanking[0];
}
