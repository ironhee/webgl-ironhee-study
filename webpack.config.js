var path = require('path')
module.exports = {
  devServer: {
    contentBase: 'docs/',
    inline: true,
    host: '0.0.0.0'
  },
  entry: {
    main: ['babel-polyfill', './src/main.js']
  },
  output: {
    path: path.resolve(__dirname, 'docs/assets/'),
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
