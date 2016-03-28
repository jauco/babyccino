var expect = require("./anAssertionLib");
var module = require("./theModule");

module.exports = function (describe, it) {
  describe('when not present', function() {
    it("a succeeding test isn't really shown", function() {
      expect(true, "succeeding assertion");
    });
    it("a failing test is", function() {
      expect(true, "failing assertion");
    });
    it('return promised for async tests', function() {
      return Promise.resolve().then(function () {
        expect(false, "async failure");
      });
    });
  });
}
