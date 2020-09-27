const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

// 这个例子有一个坑，就是下载postcss-loader要指定版本，指定@3版本。否则报错

// node默认的打包环境都是production的，可以手动设置更改
// process.env.NODE_ENV = 'development'

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
          MiniCssExtractPlugin.loader,
          'css-loader',
        //  使用postcss-loader处理css兼容性问题
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              // 插件返回的是一个数组
              plugins: () => [
              // postcss的插件
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    }),
    new CssMinimizerWebpackPlugin()
  ],
  mode: 'development'
}
