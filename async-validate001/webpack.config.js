
module.exports = {
  entry: {
    "demo001":'./src/demo001.js',
    "demo002":'./src/demo002.js',
    "demo003":'./src/demo003.js',
    "demo004":'./src/demo004.js',
    "demo005":'./src/demo005.js',
    "demo007":'./src/demo007.js'
  },
  output: {
    path: __dirname+"/dist/",
    filename: '[name].js'
  },
  module: {
    loaders: [
      {test: /\.js$/,loader: 'babel',exclude: /node_modules/}
    ]
  }
}
