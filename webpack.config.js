/* global __dirname, require, module*/

const webpack = require("webpack");
const path = require("path");
const env = require("yargs").argv.env; // use --env with webpack 2
const pkg = require("./package.json");

let libraryName = pkg.name;

let plugins = [],
  outputFile,
  mode;

if (env === "dev") {
  mode = "development";
  outputFile = libraryName + ".min.js";
} else {
  mode = "production";
  outputFile = libraryName + ".js";
}

const config = {
  entry: __dirname + "/src/index.js",
  devtool: "source-map",
  mode,
  output: {
    path: __dirname + "/lib",
    filename: outputFile,
    library: libraryName,
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: "babel-loader",
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: "eslint-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve("./node_modules"), path.resolve("./src")],
    extensions: [".json", ".js"]
  },
  plugins: plugins
};

module.exports = config;
