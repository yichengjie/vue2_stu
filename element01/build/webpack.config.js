var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack') ;
var path = require('path') ;

module.exports = {
  entry: './src/main.js',
  output: {
     path: './dist',
     publicPath: '/dist/',
     filename: 'build.js'
  },
  module: {
    loaders: [
        {test: /\.vue$/,loader: 'vue'},
        {test: /\.js$/,loader: 'babel',exclude: /node_modules|lib/},
        {test: /\.css$/,loader: 'style!css'},
        {test: /\.(eot|svg|ttf|woff|woff2)$/,loader: 'file'},
        {test: /\.(png|jpg|gif|svg)$/,loader: 'file',query: {name: '[name].[ext]?[hash]'}}
    ]
  },
  resolve: {
      alias: {
        'vue': 'vue/dist/vue.js',
      }
  },
  devServer: {
     historyApiFallback: true,
     noInfo: true
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map' ;
    module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
