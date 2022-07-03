import {sum} from './math'
// 按需加载，下面注释掉
// import count from './count'

console.log("hello main");
console.log(sum(5, 9));

document.getElementById('btn').onclick = function () {
  // console.log(count(1, 89));
  import('./count')
  .then(res => console.log('模块加载成功了', res.default(1, 89)))
  .catch((err) => console.log('模块加载失败', err))
}