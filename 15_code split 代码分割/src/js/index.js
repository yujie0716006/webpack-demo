import $ from 'jquery'
// import {test1} from './test'


function sum(args) {
  return [...args].reduce((prev, current) => prev + current, 0)
}

/*动态引入*/
import(/*webpackChunkName: 'test'*/'./test')
  .then(res => {
    console.log('res成功', res)
  })
  .catch(err => {
    console.log('引入失败', err)
  })

console.log('sum', sum([1, 2, 3, 4, 5]))
console.log('test index', test1())



