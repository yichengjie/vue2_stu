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
  devtool: '#eval-source-map',
  module: {
    loaders: [
      {test: /\.vue$/,loader: 'vue'},
      {test: /\.js$/,loader: 'babel',exclude: /node_modules|lib/},
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      {test: /\.(jpg|png|gif)$/, loader: "url?limit=8192&name=./images/[name].[hash:8].[ext]"},
      {test: /\.(eot|woff|ttf|svg)$/, loader: "file-loader?name=./file/[name].[hash:8].[ext]" }
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
  }
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
