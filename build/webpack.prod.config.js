process.env.NODE_ENV = 'production';

// const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const baseWebpackConfig = require('./webpack.base.config');
const utils = require('./utils');

// const { resolve } = utils;

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  output: {
    filename: utils.assetsPath('js/[name].[hash].js'),
    chunkFilename: utils.assetsPath('js/[id].[hash].js')
  },
  plugins: [
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[hash].css')
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: 'static',
        // ignore: ['*.dll.js']
      }
    ])
  ]
});

module.exports = webpackConfig;
