import '../css/index.less'
import '../css/iconfont.css'
import print from './print'

function add(a, b) {
  return a + b
}
console.log('怎么会是js')()
console.log('add', add(1, 2))
print()
if (module.hot) {
  module.hot.accept('./print.js', () => {
    print()
    console.log('如果更新了，我就监视')
  })
}
