var babyccino = require("./babyccino");
var assert = require("./anAssertionLib");

babyccino(
  //the first argument should be a function that returns a require.context
  //that points to all the test files. In this example it looks in the same
  //directory as unittests.js ("./") does not look in subdirectories (false)
  //and includes only files that end in .test, excluding known suffixes (/\.test$/)
  function () { return require.context("./", false, /\.test$/); },
  //optionally, you can add functions that throw a failed assertion
  //these functions are used by babyccino to strip the stack trace of a failed
  //assertion of all lines except the line where the assert call is made
  () => assert(true == false, "")
);
