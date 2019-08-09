
const oppositeDirection = {
  left: 'right',
  right: 'left',
  up: 'down',
  down: 'up'
};

const positionAdjustment = {
  left: [0, -1],
  right: [0, 1],
  up: [-1, 0],
  down: [1, 0],
  upLeft: [-1, -1],
  upRight: [-1, 1],
  downLeft: [1, -1],
  downRight: [1, 1],
};

const DIRECTIONS = ['up', 'left', 'right', 'down'];

$(document).ready(() => {
  new Game();
});
