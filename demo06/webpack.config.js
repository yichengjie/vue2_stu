var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require('path') ;
var ASSETS_PATH = path.resolve('./src/assets');
var LIB_PATH = path.resolve('./src/lib');

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
      {test: /\.js$/,loader: 'babel',exclude: /node_modules|lib/},
      {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
      {test: /\.(jpg|png|gif)$/, loader: "url?limit=8192&name=./images/[name].[hash:8].[ext]"},
      {test: /\.(eot|woff|ttf|svg)$/, loader: "file-loader?name=./file/[name].[hash:8].[ext]" }
    ]
  },
  resolve: {
      alias: {
        'vue': 'vue/dist/vue.js',
        'assets': ASSETS_PATH,
        'tui_core_lib':LIB_PATH+"/tui-core/index.js",
        'tui_dialog_lib':LIB_PATH+"/tui-dialog/index.js",
        'tui_drag_lib':LIB_PATH+"/tui-drag/index.js",
        'jq_datepicker_lib': LIB_PATH+"/jq-datepicker/index.js",
	      'jq_timepicker_lib':LIB_PATH+"/jq-timepicker/index.js",
        'modal_lib':LIB_PATH+"/modal.js",
        'iconfont_lib':LIB_PATH+"/iconfont/iconfont.js",
        'HttpClientUtil_lib':LIB_PATH+"/HttpClientUtil.js",
        'util_lib':LIB_PATH+"/util.js",
        'lodash_lib':LIB_PATH+"/lodash/lodash.js",
        'moment_lib':LIB_PATH+"/moment/index.js",
        'ajaxfileupload_lib':LIB_PATH+"/ajaxfileupload.js",
        'is_loading_lib':LIB_PATH+"/is-loading/index.js",
        'bt_growl_lib':LIB_PATH+"/bt-grow/jquery.bootstrap-growl.js"
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
