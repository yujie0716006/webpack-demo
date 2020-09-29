const {resolve} = require('path')
const Webpack = require('webpack')

module.exports = {
  entry: {
  //  最终打包生成的[name] -> jquery
  //  ['jquery']：表示要打包的库是jquery
    jquery: ['jquery']
  },
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'dll'),
    library: '[name]_[hash]' // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
  //  打包生成一个manifest.js文件，提供了jquery的映射关系(告诉webpack，jquery之后不需要在打包和暴露内容)
    new Webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
    })
  ],
  mode: 'production'
}
