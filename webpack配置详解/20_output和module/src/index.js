import add from './add'
// import mul from './mul'

import '@css/index'

function fun() {
  console.log('我是index加载了')
}

import('./mul')
  .then(({default: mul}) => {
    console.log('nul', mul())
  })
  .catch(err => {
    console.log('err', err)
  })
console.log(fun())
console.log('add', add())
// console.log('mul', mul())
