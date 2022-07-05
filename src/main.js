import './css/index.css'

console.log('hello main');

console.log('hello main0');

console.log('hello main2');

console.log('hello main3');

const sum = (...args) => {
  return args.reduce((p, q) => p + q, 0);
}