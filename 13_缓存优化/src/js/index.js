import '../css/index.css'

function sum(args) {
  return [...args].reduce((prev, current) => prev + current, 0)
}

console.log('sun', sum([1, 2, 3, 4, 5]))


