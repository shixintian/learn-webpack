const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
const HappyPack = require('happypack');
const os = require('os');

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: 'css-loader', options: { modules: true } }
        ]
      },
      {
        test: /\.js$/,
        loader: 'happypack/loader?id=babel',
        include: [path.resolve(__dirname, 'src')],
        exclude: /node_modules/, // /node_modules\/(?![uc-fun|vis])/, 不会去查找的路径
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({template: './src/index.html'}),
    new HappyPack({
      id: 'babel',
      loaders: [{
        loader: 'babel-loader',
        options: {
          configFile: path.resolve(__dirname, 'babel.config.js'),
          cacheDirectory: true,
        }
      }],
      // 共享进程池
      threadPool: happyThreadPool,
    }),
  ]
};