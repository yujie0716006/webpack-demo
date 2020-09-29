const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

module.exports = {
  // 但文件入口
  entry: './src/js/index.js',
  // 多文件入口
/*  entry: {
    index: './src/js/index.js',
    test: './src/js/test.js',
  },*/
  output: {
    filename: 'js/[name].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
/*   这块内容是默认配置，不用写就可以
      miniSize: 30 * 1024, // 分割的chunk最小为30kb(大于30kb的才分割)
      maxSize: 0, // 最大没有限制
      minChunks: 1, // 要提取的chunk最少被引用1次
      maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量为5
      maxInitialRequests: 3, // 入口js文件最大并行请求数量
      automaticNameDelimiter: "~", // 名称连接符
      name: true, // 可以使用命名规则
      // 分割chunk的组,一个键值对算一组
      cacheGroups: {
        vendors: {
        //  node_modules中的文件会被打包到vendors组的chunk中; 分割出的为 vendors~xxx.js
        //  其中每个组满足上面的公共规则，大小超过30kb，至少被引用一次
          test: /[\\]node_module[\\]/,
        //  优先级
          priority: -10
        },
        default: {
        //  需要体恤的chunk最少被引用2次
          minChunks: 2,
          priority: -20,
        //  如果当前要打包的模块和之前已经被提取的模块是同一个，就会服用，而不是重新打包
          reuseExistingChunk: true
        }
      }
      */
    // 将index.js中记录b.js的contenthash值单独打包到runtime文件中
      runtimeChunk: {
        // 打包到runtime中的这个文件的名字
        name: entrypoint => `runtime-${entrypoint.name}`
      },
      minimizer: [
        //  配置生产环境的压缩方案：js/css
        new TerserWebpackPlugin({
        //  开启缓存
          cache: true,
        //  开启多进程打包
          paraller: true,
        //  启动souce-map(如果不开启，则会被压缩掉)
          sourceMap: true
        })
      ]
    }
  },
  // 生产环境下会自动压缩js代码
  mode: 'development',
}
