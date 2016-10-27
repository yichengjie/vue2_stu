// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
function onProxyReq(proxyReq, req, res) {
    // add custom header to request 
    proxyReq.setHeader('x-added', 'foobar');
    console.info('------------------------------------') ;
    console.info(req.headers) ;
    console.info('------------------------------------') ;
    // or log the req 
}

function onProxyRes(proxyRes, req, res){
   //console.info(req.headers) ;
   console.info('*****************************') ;
   console.info(req.headers) ;
   console.info('*****************************') ;
}

function onProxyReqWs(proxyReq, req, socket, options, head) {
    // add custom header 
    proxyReq.setHeader('X-Special-Proxy-Header', 'foobar');
    console.info('*****************************') ;
    console.info(req.headers) ;
    console.info('*****************************') ;
}

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  dev: {
    env: require('./dev.env'),
    port: 3001,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/api': {
        target: 'http://localhost:8080/ocgui/',
        changeOrigin: false,
        pathRewrite: {
          '^/api': ''
        },
        onProxyReq:onProxyReq,
       // onProxyRes:onProxyRes
       //onProxyReqWs:onProxyReqWs
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}