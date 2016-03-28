var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: {
    "tests": "../index.js", //in your own repo this would be "babyccino"
    "app": "./theModule.js"
  },
  plugins: [
    new webpack.DefinePlugin({
      "babyccinoPath": JSON.stringify(path.resolve("./src")),
      "babyccinoRegex": "/\\.test$/"
    })
  ],
  output: {
    path: path.join(__dirname, "build"),
    filename: "[name].js"
  }
};
