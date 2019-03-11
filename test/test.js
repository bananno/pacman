
class Test {
  constructor(callback) {
    callback(this);
  }

  set map(newMap) {
    this.game = new Game(newMap, true);
  }

  check(message, expectedResult, actualResult) {
    if (expectedResult != actualResult) {
      console.error(message);
    }
  }
}
