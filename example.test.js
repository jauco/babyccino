var expect = require("unexpected");
module.exports = function (describe, it) {
  describe('when not present', function() {
    it('should not throw an error', function() {
      return Promise.resolve().then(function () {
        expect("13", "to be", "12");
      });
    });
    it('should return -1', function() {
      expect({a:1, b:2}, "to equal", {a:1, b:2});
    });
  });
}
