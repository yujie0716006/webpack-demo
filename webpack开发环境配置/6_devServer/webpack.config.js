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
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        // 打包排除css/less/js等资源
        exclude: /\.(css|less|js|html)$/,
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
//  启动服务器
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    // 监视contentBase目录下的所有文件，一旦文件变化就会 reload
    watchContentBase: true,
    watchOption: {
    //  忽略文件
      ignored: /node_module/
    },
    port: 8888,
    compress: true,
    open: true,
  //  域名
    host: 'localhost',
  //  不要显示启动服务器日志信息
    clientLogLevel: 'none',
  //  除了一些基本启动信息以外，其他内容都不要显示
    quiet: true,
  //   如果出错了，不要全屏提示
    overlay: false,
  //  服务器代码，解决开发环境跨域问题
    proxy: {
    //  一旦devServer(5000)服务器接收到 /api/xxx 的请求，就会把请求转发到另一个服务器(3000,target的值)
      '/api': {
        target: 'http://localhost:3000',
        // 发送请求时，请求路径重写：将 /api/xxx 重写为 /xxx （去掉api）
        pathRewrite: {
          '^api': ''
        }
      }
    }
  }
}
