const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'build'),
    publicPath: './',
    chunkFilename: "js/[name]_chunk.js",
    library: 'window'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules/',
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  mode: 'development',
  resolve: {
    <!--配置解析模块路径别名：优点：简写路径；缺点：路径没有提示-->
    alias: {
     ' @': resolve(__dirname, 'src'),
      '@css': resolve(__dirname, 'src/css')
    },
    <!--配置省略文件路径的后缀名-->
    extensions: ['.js', '.json', '.jsx', '.css', '.vue'],
    // <!--告诉webpack解析模块时去找哪个目录-->
    // <!--resolve()引用表示，明确指定的寻找的方向；node_module：他会先从最近的目录找，如果没找到则向上一级寻找直到找到-->
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
  }
  // devtool: 'source-map'
}
