import count from './js/count';
import sum from './js/sum';

// 在下面是import方式动态导入，所以这里不需要了
// import { mul } from './js/math';

import './css/index.css';
import './css/iconfont.css';

import './less/index.less';

import './sass/index.sass';
import './sass/index.scss';
import './stylus/index.styl';

// let r = count(5, 5);
// console.log(r);

// console.log(mul(9, 8));

document.getElementById('btn').onclick = function () {
  // import('./js/math.js')
  // .then((res) => {
  //   console.log(res.mul(9, 8));
  // })
  // Eslint不识别动态导入语法，需要额外追加配置
  // eslint会对动态导入语法报错，需要修改eslint配置文件
  // webpackChunkName: "math"：这是webpack动态导入模块命名的方式
  // "math"将来就会作为[name]的值显示。
  import(/* webpackChunkName: "math" */ './js/math.js')
  .then(({mul}) => {
    console.log(mul(6, 11))
  })
}

console.log(count(5, 6));
console.log(sum(5, 6));

if (module.hot) {
  module.hot.accept('./js/count');
  module.hot.accept('./js/sum');
}