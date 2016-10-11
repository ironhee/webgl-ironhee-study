var path = require('path')
module.exports = {
  devServer: {
    contentBase: 'public/',
    inline: true,
    host: '0.0.0.0'
  },
  entry: {
    main: ['babel-polyfill', './src/main.js']
  },
  output: {
    path: path.resolve(__dirname, 'public/assets/'),
    publicPath: '/assets/',
    filename: 'main.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
}
