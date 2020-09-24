const {resolve} = require('path')
// 引入的这个html-webpack-plugin插件，是个构造函数
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: "built.js",
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: []
  },
  plugins: [
    // 如果不加template，就只是新打包出来一个html文件，并引入相关的资源，但是其他的内容都没有
    new HtmlWebpackPlugin({
      // template会复制'./src/index.html'文件，并自动引入打包出输出的所有资源（js/css）
      template: './src/index.html'
    })
  ],
  mode: 'development'
}
