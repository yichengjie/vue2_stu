var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './test/main.js',
  output: {
    path: __dirname+"/dist/",
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
  ],
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract("css"),
      less: ExtractTextPlugin.extract("css!less")
    }
  }
}
