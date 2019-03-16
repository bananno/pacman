
const allTestList = [];

const allTests = [];

const WILD = 'WILD';

$(document).ready(() => {
  allTests.forEach(([name, callback]) => {
    new Test(name, callback);
  });

  let previousTitle = null;
  let testsPass = 0;
  let testsFail = 0;

  allTestList.forEach(test => {
    if (test.title != null && test.title != previousTitle) {
      $('#tests').append('<p><b>' + test.title + '</b></p>');
      $('#tests').append('<ul></ul>');
      previousTitle = test.title;
    }

    const $item = $('<li>').text(test.message);
    $('#tests ul:last').append($item);

    if (test.expectedResult != test.actualResult) {
      $item.addClass('test-failed');
      $('#tests p:last').addClass('test-failed');
      testsPass += 1;
    } else {
      testsFail += 1;
    }
  });

  console.log('\nTESTS FINISHED.\n  > total:  ' + (testsPass + testsFail)
    + '\n  > passed: ' + testsPass + '\n  > failed: ' + testsFail);
});

function addTest(title, callback) {
  if (typeof title == 'function') {
    [title, callback] = [null, title];
  }
  allTests.push([title, callback]);
}

class Test {
  constructor(title, callback) {
    this.title = title;
    callback(this);
  }

  set map(newMap) {
    this.game = new Game(newMap, true);
  }

  check(message, expectedResult, actualResult) {
    const saveTest = {
      title: this.title,
      message: message,
      pass: valuesMatch(expectedResult, actualResult),
      expectedResult: expectedResult,
      actualResult: actualResult,
    };

    allTestList.push(saveTest);

    if (!saveTest.pass) {
      console.warn('TEST FAILED: ' + message);
      console.log('  > expected: ' + expectedResult + '\n  > result:   ' + actualResult);
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
