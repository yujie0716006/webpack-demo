const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // entry: './src/index.js',
  // entry: ['./src/index.js', './src/add.js'],
  entry: {
    add: './src/add.js',
    mul: './src/mul.js',
    index: './src/index.js'
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  // devtool: 'source-map'
}
