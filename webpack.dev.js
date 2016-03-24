var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var parseArgs = require('minimist');
var Argv = parseArgs(process.argv);
module.exports = {
  entry: [
    __dirname + '/node_modules/webpack-dev-server/client?http://localhost:8080',
    __dirname + '/node_modules/webpack/hot/only-dev-server',
    Argv.entryPoint
  ],

  output: {
    path: path.resolve(Argv.entryPoint, 'build'),
    filename: 'bundle.js'
  },

  devtool: 'source-map',

  resolveLoader: {
    root: path.resolve(__dirname, 'node_modules')
  },
  module: {

    loaders: [
      {
        test: /\.woff$/,
        loader: 'url?limit=100000',
        include: path.join(Argv.srcDirectory)
      },
      {
        test: /\.less$/,
        loader: 'style!css!less',
        include: path.join(Argv.srcDirectory)
      },
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        query: {
          presets: [
            require.resolve('babel-preset-react-hmre'),
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-react'),
            require.resolve('babel-preset-stage-0')
          ],
          plugins: [
            require.resolve('babel-plugin-typecheck')
          ]
        },
        include: path.join(Argv.srcDirectory),
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file',
        include: path.join(Argv.srcDirectory)
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__ : (process.env.NODE_ENV !== 'production')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      title: 'λ Lambda Dev Server',
      template: path.join(Argv.srcDirectory, '/index.tpl.html')
    })
  ],
  devServer: {
    contentBase: Argv.srcDirectory + '/../build/',
    host: 'localhost',
    port: 8080,
    hot: true,
    historyApiFallback: true,
    colors: true
  }

};