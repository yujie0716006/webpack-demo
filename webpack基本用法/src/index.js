// webpack打包的入口文件
function add(a, b) {
  return a + b
}

// 引入json
import data from './data'

// 引入样式文件
import './index.css'

console.log('add', add(1, 2))
console.log('data', data)
