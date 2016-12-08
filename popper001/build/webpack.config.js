var path = require('path') ;
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var projectRoot = path.resolve(__dirname, '../') ;
var distPath = projectRoot + "/dist" ;
var srcPath = projectRoot +"/src" ;

module.exports = {
  entry: srcPath+'/main.js',
  output: {
    path: distPath,
    publicPath: '/dist/',
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.vue$/,loader: 'vue'},
      {test: /\.js$/,loader: 'babel',exclude: /node_modules/},
      {test: /\.css$/, loader: "style-loader!css-loader" },
      {test: /\.less$/,loader: "style-loader!css-loader!less-loader"},
      {test: /\.(jpg|png|gif)$/, loader: "url?limit=8192&name=./images/[name].[hash:8].[ext]"},
      {test: /\.(eot|woff|ttf|svg)$/, loader: "file-loader?name=./file/[name].[hash:8].[ext]" }
    ]
  },
  plugins: [
    new ExtractTextPlugin("[name].css"),
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //       jQuery: "jquery",
    //       "window.jQuery": "jquery"
    // }),
  ],
  devServer: {
     historyApiFallback: true,
     noInfo: true
  },
  devtool: '#eval-source-map',
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract("css"),
      less: ExtractTextPlugin.extract("css!less")
    }
  }
}
