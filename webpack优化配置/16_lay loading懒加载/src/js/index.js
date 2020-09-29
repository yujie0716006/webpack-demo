

console.log('我是index.js文件被加载了')



document.getElementById('click').onclick = function(e) {
  import(/*webpackChunkName: 'text', webpackPrefetch: true*/'./test')
    .then(res => {
      console.log('成功', res.test1())
    })
    .catch(err => {
      console.log('失败', err)
    })
}


