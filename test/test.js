
const countTests = {
  total: 0,
  pass: 0,
  fail: 0,
};

const allTests = [];

const WILD = 'WILD';

$(document).ready(() => {
  allTests.forEach(nextTest => {
    new Test(nextTest);
  });

  console.log('\nTESTS FINISHED.\n  > total:  ' + countTests.total
    + '\n  > passed: ' + countTests.pass + '\n  > failed: ' + countTests.fail);
});

function addTest(nextTest) {
  allTests.push(nextTest);
}

class Test {
  constructor(callback) {
    callback(this);
  }

  set map(newMap) {
    this.game = new Game(newMap, true);
  }

  check(message, expectedResult, actualResult) {
    countTests.total += 1;
    if (valuesMatch(expectedResult, actualResult)) {
      countTests.pass += 1;
    } else {
      console.warn('TEST FAILED: ' + message);
      console.log('  > expected: ' + expectedResult + '\n  > result:   ' + actualResult);
      countTests.fail += 1;
    }
  }
}

function valuesMatch(value1, value2) {
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
      if (!valuesMatch(value1[i], value2[i])) {
        return false;
      }
    }

    return true;
  }

  return false;
}
