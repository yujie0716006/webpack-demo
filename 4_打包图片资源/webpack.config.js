const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test:/\.(png|jpg|gif)$/, // 处理图片资源
        // 在使用use-loader的时候，也必须下载file-loader,因为url-loader基于file-loader进行
        loader: 'url-loader',
        options: {
          // 限制打包图片的大小，当图片的大小小于这个值的时候，会使用base64进行打包
          limit: 8 * 1024,
          // 关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          // name给图片进行重命名，[hash:8]：表示取图片hash的前10位；[ext]：表示取原来文件的扩展名
          name: '[hash:8].[ext]'
        }
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development'
}
