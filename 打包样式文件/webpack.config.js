const {resolve} = require('path')
module.exports = {
  // 入口起点
  entry: './src/index.js',
  // 输入地址
  output: {
    filename: 'built.js', // 输出的文件名
    // 输出路径 __dirname是node.js的变量，代表当前文件的目录的绝对路径 这里是'打包样式文件'，下面的build文件
    path: resolve(__dirname, 'build')
  },
  // loader配置
  module: {
    // loader的详细配置
    rules: [
      {
        // 使用正则，匹配的哪些文件
        test: /\.css$/,
        // 使用哪些loader进行处理
        // use数组中的loader处理器的执行顺序：从右向左，从下向上
        use: [
          // 创建style标签，将js中的样式资源插入进去
          'style-loader',
          // 将css文件变成commonjs模块加载的js中，里面的内容是样式字符串
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          // 将less文件编译成css文件
          'less-loader'
        ]
      }
    ]
  },
  // plugins的配置
  plugins: [],
  // 打包的模式
  mode: 'development'
}
