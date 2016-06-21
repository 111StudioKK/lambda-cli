var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Clean = require('webpack-cleanup-plugin');
var parseArgs = require('minimist');
var Argv = parseArgs(process.argv);
var Dependencies = require(Argv.srcDirectory + '/../package.json').dependencies;

module.exports = {
  entry: {
    'app': Argv.entryPoint,
    'vendors': Object.keys(Dependencies)
  },

  output: {
    publicPath: '/',
    path: path.resolve(Argv.srcDirectory + '/../', 'dist'),
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js'
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
            require.resolve('babel-preset-es2015'),
            require.resolve('babel-preset-react'),
            require.resolve('babel-preset-stage-0')
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
    new Clean(),
    new webpack.DefinePlugin({
      __DEV__ : false,
      __VERSION__ : JSON.stringify(require(Argv.srcDirectory + '/../package.json').version),
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new ExtractTextPlugin('[name].[chunkhash].css'),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors'
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      title: 'λ Lambda Dev Server',
      template: path.join(Argv.srcDirectory, '/index.tpl.html')
    })
  ]
};