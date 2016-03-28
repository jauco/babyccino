var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: {
    "tests": "./unittests.js",
    "app": "./theModule.js"
  },
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js"
  }
};
