var babyccino = require("./babyccino");
var expect = require("unexpected");

babyccino(function () {
  return require.context("./", false, /\.test$/)
}, [function () {expect("12", "to be", "13");}]);
