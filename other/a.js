module.exports = {
   entry: './src/main.js',
}

if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map' ;
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: 'production'
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
              warnings: false
            }
        })
    ]) ;
}
