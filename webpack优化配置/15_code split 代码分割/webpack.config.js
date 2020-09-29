const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // 但文件入口
  entry: './src/js/index.js',
  // 多文件入口
/*  entry: {
    index: './src/js/index.js',
    test: './src/js/test.js',
  },*/
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  // 生产环境下会自动压缩js代码
  mode: 'production',
}
