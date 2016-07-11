var isDev = require('../isDev');
var path = require('path');
var webpack = require('webpack');
var $ = require('../taskPaths');

module.exports = {
  devtool: isDev('source-maps'),
  output: {
    filename: '[name].js'
  },
  resolve: {
    alias: {
      node_modules: path.resolve('./node_modules'),
      bower_components: path.resolve('./bower_components')
    },
    modulesDirectories: [$.scripts.src]
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /(node_modules|bower_components)/, loader: "babel-loader" },
      { test: /\.json$/, loader: "json-loader" }
    ]
  },
  externals: {
    jQuery: 'jQuery'
  },
  plugins: [
    isDev(noop, new webpack.optimize.DedupePlugin()),
    isDev(noop, new webpack.optimize.UglifyJsPlugin())
  ]
}

function noop() {}
