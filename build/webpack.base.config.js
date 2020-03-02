const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const HappyPack = require('happypack');
const os = require('os');
const utils = require('./utils');

const { resolve } = utils;
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: resolve('dist'),
    filename: '[name].js',
    // publicPath: '/tian'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: [resolve('src')],
        loader: 'happypack/loader?id=eslint',
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'css-loader', options: { modules: true } }
        ]
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=babel',
        include: [resolve('src')],
        exclude: /node_modules/, // /node_modules\/(?![uc-fun|vis])/, 不会去查找的路径
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      ...utils.styleLoaders({
        sourceMap: false,
        usePostCSS: true
      })
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: resolve('dist/index.html'),
      template: resolve('public/index.html'),
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    }),
    new HappyPack({
      id: 'eslint',
      loaders: ['eslint-loader'],
      threadPool: happyThreadPool,
    }),
    new HappyPack({
      id: 'babel',
      loaders: [{
        loader: 'babel-loader',
        options: {
          configFile: resolve('babel.config.js'),
          cacheDirectory: true,
        }
      }],
      // 共享进程池
      threadPool: happyThreadPool,
    }),
  ]
};
