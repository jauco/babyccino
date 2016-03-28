//Normally you' use chai, unexpected.js, assert.js or something else.
//I didn't want to depend on them just for the example, so below is a very
//minimal shim

//You use it like this
//  var assert = require("./anAssertionLib");
//  assert(theAnswer === 42, "The answer should be 42")
module.exports = function assert(test, text) {
  if (!test) {
    throw new Error(text);
  }
}
