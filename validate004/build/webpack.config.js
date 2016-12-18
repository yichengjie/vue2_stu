var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack') ;
var path = require('path') ;
var projectRoot = path.resolve(__dirname, '../') ;
var distPath = projectRoot + "/dist" ;
var srcPath = projectRoot +"/src" ;
var libPath = projectRoot +"/src/lib" ;
var commonPath = projectRoot +"/src/common" ;
var componentsPath = projectRoot +"/src/components" ;
var assetsPath = projectRoot +"/src/assets" ;
var apiPath = projectRoot + "/src/api" ;
var mockjsPath = projectRoot + "/src/mockjs" ;

module.exports = {
  entry: {
    'main':srcPath+"/main.js"
  },
  output: {
     path: distPath,
     publicPath: '/dist/',
     filename: '[name].js'
  },
  module: {
    loaders: [
        {test: /\.vue$/,loader: 'vue'},
        {test: /\.js$/,loader: 'babel',exclude: /node_modules|lib/},
        {test: /\.css$/, loader: ExtractTextPlugin.extract("css-loader")},
        {test: /\.less$/,loader: ExtractTextPlugin.extract("css-loader","less-loader")},
        {test: /\.json$/,loader: 'json-loader'},
        {test: /\.(eot|svg|ttf|woff|woff2)$/,loader: 'file'},
        {test: /\.(png|jpg|gif|svg)$/,loader: 'file',query: {name: '[name].[ext]?[hash]'}}
    ]
  },
  resolve: {
      alias: {
        vue: 'vue/dist/vue.common.js'
      }
  },
  devServer: {
     historyApiFallback: true,
     noInfo: true
  },
  devtool: '#eval-source-map',
  plugins: [
    new ExtractTextPlugin("[name].css"),
  ],
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract("css"),
      less: ExtractTextPlugin.extract("css!less")
    }
  },
  devtool:'#source-map'
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
