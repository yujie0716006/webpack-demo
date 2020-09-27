const { resolve } = require('path')
const MiniCssExtractorPlugin = require('mini-css-extract-plugin')
const OptimiziCssAssetsWebpackPlugin = require('optimizi-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 定义node.js的环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production'

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
  entry: './src/js/index.js ./src/index.html',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
        {
          test: /\.css$/,
          use: [...commonCssLoader],
        },
      {
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader'],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/, // 忽略node_modules
        enforce: 'pre', // 优先执行
        loader: 'eslint-loader',
        options: {
          // 自动修复
          fix: true,
        },
      },
      {
        // 第三种方式：按需加载
        test: /\.js$/,
        exclude: /node_modules/,
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
        },
      },
      {
        // 图片处理
        test: /\.(jpg|png|gif)/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
          esModule: false, // 关闭url-loader默认使用的es6模块化解析
        },
      },
      // html中的图片处理
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      // 处理其他文件
      {
        exclude: /\.(js|css|less|html|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/built.css',
    }),
    // 压缩css
    new OptimiziCssAssetsWebpackPlugin(),
    // HtmlWebpackPlugin：html文件的打包和压缩处理
    // 通过这个插件会自动将单独打包的样式文件通过link标签引入
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
  ],
  // 生产环境下会自动压缩js代码
  mode: 'production',
}
