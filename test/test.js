
const countTests = {
  total: 0,
  pass: 0,
  fail: 0,
};

const allTests = [];

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
    if (expectedResult != actualResult) {
      console.warn('TEST FAILED: ' + message);
      console.log('  > expected: ' + expectedResult + '\n  > result:   ' + actualResult);
      countTests.fail += 1;
    } else {
      countTests.pass += 1;
    }
  }
}
