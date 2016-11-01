var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path') ;
var ASSETS_PATH = path.resolve('./src/assets');

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname+"/dist/",
    filename: '[name].js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {test: /\.vue$/,loader: 'vue'},
      {test: /\.js$/,loader: 'babel',exclude: /node_modules/},
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      {test: /\.(jpg|png|gif)$/, loader: "url?limit=8192&name=./images/[name].[hash:8].[ext]"},
      {test: /\.(eot|woff|ttf|svg)$/, loader: "file-loader?name=./file/[name].[hash:8].[ext]" }
    ]
  },
  resolve: {
      alias: {
        'vue': 'vue/dist/vue.js',
        'assets': ASSETS_PATH
      }
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
  ],
  vue: {
    loaders: {
        css: ExtractTextPlugin.extract("css")
    }
  }
}
