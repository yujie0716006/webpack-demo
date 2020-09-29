import '../css/index.css'

function sum(args) {
  return [...args].reduce((prev, current) => prev + current, 0)
}

function test1() {
  console.log('test111111')
}

function test2(){
  console.log('test222222')
}

console.log('sun', sum([1, 2, 3, 4, 5]))
console.log('test1', test1())


