
const merge = require('webpack-merge');
const webpack = require('webpack');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
// const path = require('path');
// const utils = require('./utils');
const baseWebpackConfig = require('./webpack.base.config');

const mergeConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    clientLogLevel: 'warning',
    // historyApiFallback: {
    //   rewrites: [
    //     {
    //       from: /.*/,
    //       to: path.posix.join(config.dev.assetsPublicPath, 'index.html')
    //     }
    //   ]
    // },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    quiet: true, // 启用 devServer.quiet 后，除了初始启动信息之外的任何内容都不会被打印到控制台。这也意味着来自 webpack 的错误或警告在控制台不可见。
    host: '0.0.0.0',
    port: 8080,
    open: false,
    overlay: true // 当出现编译器错误或警告时，在浏览器中显示全屏覆盖层。默认禁用。如果你想要只显示编译器错误：
      ? { warnings: false, errors: true }
      : false,
    publicPath: '/',
    // proxy: config.dev.proxyTable,
    watchOptions: {
      poll: false
    },
    disableHostCheck: true
  },
  plugins: [
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
  ]
};

const devWebpackConfig = merge(baseWebpackConfig, mergeConfig);
module.exports = devWebpackConfig;
