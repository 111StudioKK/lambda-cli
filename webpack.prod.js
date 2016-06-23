var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var Clean = require('webpack-cleanup-plugin');
var parseArgs = require('minimist');
var Argv = parseArgs(process.argv);
var Dependencies = require(Argv.srcDirectory + '/../package.json').dependencies;
var modulesPaths = [Argv.srcDirectory];
try {
  fs.lstatSync(Argv.srcDirectory + '/common');
  modulesPaths.push(fs.realpathSync(Argv.srcDirectory + '/common'));
} catch (error) {
  console.info('No code symlink ... skipping');
}
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
  resolve: {
    fallback: path.join(process.cwd(), 'node_modules')
  },
  resolveLoader: {
    root: path.resolve(__dirname, 'node_modules')
  },
  module: {

    loaders: [
      {
        test: /\.woff$/,
        loader: 'url?limit=100000',
        include: modulesPaths
      },
      {
        test: /\.less$/,
        loader: 'style!css!less',
        include: modulesPaths
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
        include: modulesPaths
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ],
        include: modulesPaths
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