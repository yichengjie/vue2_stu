var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack') ;
var path = require('path') ;
var projectRoot = path.resolve(__dirname, '../') ;
var distPath = projectRoot + "/dist" ;
var srcPath = projectRoot +"/src" ;
var libPath = projectRoot +"/src/lib" ;
var commonPath = projectRoot +"/src/common" ;
var assetsPath = projectRoot +"/src/assets" ;

module.exports = {
  entry: {
    's7Edit':srcPath+"/main.js",
    's7EditMock':srcPath+'/mockjs/s7-edit.js'
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
        'assetsPath':assetsPath,
        'vue': 'vue/dist/vue.common.js',
        'lib':libPath,
        'tui_core_lib':libPath+"/tui-core/index.js",
        'tui_dialog_lib':libPath+"/tui-dialog/index.js",
        'tui_drag_lib':libPath+"/tui-drag/index.js",
        'jq_datepicker_lib': libPath+"/jq-datepicker/index.js",
	      'jq_timepicker_lib':libPath+"/jq-timepicker/index.js",
        'jq_validate_lib':libPath+"/jq-validate/index.js",
        'modal_lib':libPath+"/modal.js",
        'iconfont_lib':libPath+"/iconfont/iconfont.js",
        'lodash_lib':libPath+"/lodash/lodash.js",
        'moment_lib':libPath+"/moment/index.js",
        'ajaxfileupload_lib':libPath+"/ajaxfileupload.js",
        'is_loading_lib':libPath+"/is-loading/index.js",
        'bt_growl_lib':libPath+"/bt-grow/jquery.bootstrap-growl.js",
        'HttpClientUtil_lib':commonPath+"/HttpClientUtil.js",
        'modal_helper_lib':commonPath+'/modal.helper.js',
        'util_lib':commonPath+"/util.js"
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
