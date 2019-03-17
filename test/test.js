
const mainTestList = [];
const subTestList = [];
const WILD = 'WILD';

$(document).ready(() => {
  const isLocal = window.location.href.match('index.html') != null;
  if (isLocal) {
    devMode();
  }
});

function devMode() {
  if (subTestList.length) {
    return;
  }

  document.title += ' [dev mode]';

  $('#test-buttons, #tests').show();

  mainTestList.forEach(([name, callback]) => {
    new Test(name, callback);
  });

  let previousTitle = null;
  let testsPass = 0;
  let testsFail = 0;

  subTestList.forEach(test => {
    if (test.title != previousTitle) {
      $('#tests').append('<p>' + test.title + '</p>');
      $('#tests').append('<ul class="test-list"></ul>');
      previousTitle = test.title;
    }

    const $item = $('<li>').text(test.message);
    $('#tests ul.test-list:last').append($item);

    if (test.pass) {
      testsPass += 1;
      return;
    }

    testsFail += 1;

    $item.addClass('test-failed');
    $('#tests p:last').addClass('test-failed');

    $item.append('<ul><li>expected: ' + test.expectedResult + '</li><li>result: '
      + test.actualResult + '</li></ul>');

    console.warn('TEST FAILED: ' + test.message);
    console.log('  > expected: ' + test.expectedResult + '\n  > result:   ' + test.actualResult);
  });

  $('#test-results').append('Total tests: ' + (testsPass + testsFail)
    + '<br> >> Passed: ' + testsPass + '<br> >> Failed: ' + testsFail)

  console.log('\nTESTS FINISHED.\n  > total:  ' + (testsPass + testsFail)
    + '\n  > passed: ' + testsPass + '\n  > failed: ' + testsFail);
}

function addTest(title, callback) {
  mainTestList.push([title, callback]);
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
    subTestList.push({
      title: this.title,
      message: message,
      pass: valuesMatch(expectedResult, actualResult),
      expectedResult: expectedResult,
      actualResult: actualResult,
    });
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
