import '../css/index.css'

// 简单的兼容性处理
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js') // 注册serviceWorker，使用绝对路径
      .then(res => {
        console.log('注册成功')
      })
      .catch(err => {
        console.log('注册失败', err)
      })
  })
}
