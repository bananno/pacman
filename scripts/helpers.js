
function chooseRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomDirection() {
  return chooseRandom(['up', 'down', 'left', 'right']);
}

function getDirectionName([oldRow, oldCol], [newRow, newCol]) {
  if (newRow == oldRow) {
    if (newCol == 0 && oldCol > 1) {
      return 'right';
    }
    if (oldCol == 0 && newCol > 1) {
      return 'left';
    }
    return newCol < oldCol ? 'left' : 'right';
  }
  if (newRow == 0 && oldRow > 1) {
    return 'down';
  }
  if (oldRow == 0 && newRow > 1) {
    return 'up';
  }
  return newRow < oldRow ? 'up' : 'down';
}

function doValuesMatch(value1, value2) {
  if (value1 == value2 || value1 === WILD) {
    return true;
  }

  if (value1 == null || value2 == null) {
    return false;
  }

  if (value1.constructor == Array) {
    if (value2.constructor != Array || value1.length != value2.length) {
      return false;
    }

    for (let i = 0; i < value1.length; i++) {
      if (!doValuesMatch(value1[i], value2[i])) {
        return false;
      }
    }

    return true;
  }

  return false;
}

function moveElement($element, $target, direction, interval, skipStagger) {
  if (skipStagger) {
    return finish();
  }

  const initialMarginTop = getElementMargin($element, 'top');
  const initialMarginLeft = getElementMargin($element, 'left');
  const numberOfSteps = 3;
  const tileSize = 18;
  const marginIncrements = Math.round(tileSize / numberOfSteps);

  let count = 0;

  let newMarginTop = initialMarginTop;
  let newMarginLeft = initialMarginLeft;

  let incrementTop = 0;
  let incrementLeft = 0;

  if (direction == 'up') {
    newMarginTop = -marginIncrements;
  } else if (direction == 'down') {
    newMarginTop = marginIncrements;
  } else if (direction == 'left') {
    incrementLeft = -marginIncrements;
  } else if (direction == 'right') {
    incrementLeft = marginIncrements;
  }

  stagger();

  function stagger() {
    count += 1;

    newMarginTop += incrementTop;
    newMarginLeft += incrementLeft;

    $element.css('margin-top', newMarginTop + 'px');
    $element.css('margin-left', newMarginLeft + 'px');

    if (count < numberOfSteps) {
      setTimeout(stagger, (interval/numberOfSteps));
    } else {
      resetMargins();
      finish();
    }
  }

  function resetMargins() {
    $element.css('margin-top', initialMarginTop + 'px');
    $element.css('margin-left', initialMarginLeft + 'px');
  }

  function finish() {
    $target.append($element);
  }
}

function getElementMargin($element, direction) {
  let margin = $element.css('margin-' + direction) || '0';
  margin = margin.replace('px', '');
  return parseInt(margin);
}
