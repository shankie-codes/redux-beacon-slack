/* global __dirname, require, module */

const webpack = require('webpack');
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const pkg = require('./package.json');

const libraryName = pkg.name;

let plugins = [],
  outputFile,
  mode;

plugins.push(new webpack.DefinePlugin({
  'global.GENTLY': false,
}));

if (env === 'dev') {
  mode = 'development';
  outputFile = `${libraryName}.js`;
} else {
  mode = 'production';
  outputFile = `${libraryName}.min.js`;
}

const config = {
  entry: `${__dirname}/src/redux-beacon-slack.js`,
  devtool: 'source-map',
  mode,
  target: 'node',
  output: {
    path: `${__dirname}/dist`,
    globalObject: 'this',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/,
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js'],
  },
  plugins,
};

// A separate output for the server middleware
const serverConfig = Object.assign(
  {
    target: 'node',
  },
  config
);

serverConfig.entry = `${__dirname}/src/express-middleware.js`;
serverConfig.output = {
  path: `${__dirname}/dist`,
  filename: 'server.js',
  globalObject: 'this',
  library: libraryName,
  libraryTarget: 'umd',
  umdNamedDefine: true,
};

console.log(serverConfig);

module.exports = [config, serverConfig];
