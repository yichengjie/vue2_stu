var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack') ;
var path = require('path') ;
var projectRoot = path.resolve(__dirname, '../') ;
var distPath = projectRoot + "/dist" ;
var srcPath = projectRoot +"/src" ;
var libPath = projectRoot +"/src/lib" ;
var assetsPath = projectRoot +"/src/assets" ;

module.exports = {
  entry: srcPath+"/main.js",
  output: {
     path: distPath,
     publicPath: '/dist/',
     filename: 'build.js'
  },
  module: {
    loaders: [
        {test: /\.vue$/,loader: 'vue'},
        {test: /\.js$/,loader: 'babel',exclude: /node_modules/},
        {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader")},
        {test: /\.less$/,loader: ExtractTextPlugin.extract("style-loader","css-loader","less-loader")},
        {test: /\.(eot|svg|ttf|woff|woff2)$/,loader: 'file'},
        {test: /\.(png|jpg|gif|svg)$/,loader: 'file',query: {name: '[name].[ext]?[hash]'}}
    ]
  },
  resolve: {
      alias: {
        'assetsPath':assetsPath,
        'vue': 'vue/dist/vue.js',
        'lib':libPath,
        'tui_core_lib':libPath+"/tui-core/index.js",
        'tui_dialog_lib':libPath+"/tui-dialog/index.js",
        'tui_drag_lib':libPath+"/tui-drag/index.js",
        'jq_datepicker_lib': libPath+"/jq-datepicker/index.js",
	      'jq_timepicker_lib':libPath+"/jq-timepicker/index.js",
        'modal_lib':libPath+"/modal.js",
        'iconfont_lib':libPath+"/iconfont/iconfont.js",
        'HttpClientUtil_lib':libPath+"/HttpClientUtil.js",
        'util_lib':libPath+"/util.js",
        'lodash_lib':libPath+"/lodash/lodash.js",
        'moment_lib':libPath+"/moment/index.js",
        'ajaxfileupload_lib':libPath+"/ajaxfileupload.js",
        'is_loading_lib':libPath+"/is-loading/index.js",
        'bt_growl_lib':libPath+"/bt-grow/jquery.bootstrap-growl.js"
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
