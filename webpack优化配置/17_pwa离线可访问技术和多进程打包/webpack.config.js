const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')


// 复用loader的写法
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss', // 基本写法
      plugins: () => [
        // postcss的插件
        require('postcss-preset-env')(),
      ],
    },
  },
]
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      // html中的图片处理
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        // 第三种方式：按需加载
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: 2 // 使用2个进程
            }
          },
          {
            loader: 'babel-loader',
            options: {
              // 预设：指示babel做怎样的兼容性处理
              presets: [
                '@babel/preset-env', // 基本预设
                {
                  useBuiltIns: 'usage', //按需加载
                  corejs: { version: 3 }, // 指定core-js版本
                  targets: { // 指定兼容到什么版本的浏览器
                    chrome: '60',
                    firefox: '50',
                    ie: '9',
                    safari: '10',
                    edge: '17'
                  },
                },
              ],
            }
          }
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/built.[contenthash:10].css',
    }),
    // 压缩css
    new OptimizeCssAssetsWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
  //  在配置文件中引入，pwa技术插件
    new WorkboxWebpackPlugin.GenerateSW({
    //  1. 帮助serviceworker快速启动
    //  2. 删除旧的 serviceworker
    //  生成一个serviceworker配置文件
      clientsClaim: true,
      skipWaiting: true
    })
  ],
  // 生产环境下会自动压缩js代码
  mode: 'production',
  devtool: 'source-map'
}
