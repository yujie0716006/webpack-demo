const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // 这里不实用style-loader，因为他是将css样式文件，插入到js中的
          // 'style-loader',
          // 这个loader将取代style-loader，作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名，并设置打包后的路径
      filename: 'css/built.css'
    })
  ],
  mode: 'development'
}
