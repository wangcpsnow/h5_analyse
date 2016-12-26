var path = require('path')
var webpack = require('webpack')

module.exports = {
    // devtool: 'inline-source-map',
    // devtool: '#eval-source-map',
    entry: [
        'webpack-hot-middleware/client',
        './clients/main.js'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            // { test: /\.js[x]?$/, loaders: ['react-hot', 'babel'], exclude: /node_modules/ },
            { test: /\.js[x]?$/,include: path.resolve(__dirname, 'clients'), exclude: /node_modules/, loader: 'babel-loader' }
        ]
    },
    resolve:{
         extensions:['','.js','.jsx']
    }
}
