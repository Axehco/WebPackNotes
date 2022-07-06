// 这样引入会将所有兼容性代码全部引入，体积太大了。我们只想引入 promise 的 polyfill。
// import "core-js";  

// 只引入打包 promise 的 polyfill，打包体积更小。但是将来如果还想使用其他语法，我需要手动引入库很麻烦。
// import "core-js/es/promise";  

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
    .then(({ mul }) => {
      console.log(mul(6, 11))
    })
}

console.log(count(5, 6));
console.log(sum(5, 6));

if (module.hot) {
  module.hot.accept('./js/count');
  module.hot.accept('./js/sum');
}

const promise = Promise.resolve();
promise.then(() => {
  console.log("hello promise");
})

let arr1 = [1, 2, 2, 3, 4, 5];
console.log(arr1.includes(4));


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then(registration => {
      console.log('SW registered: ', registration);
    }).catch(registrationError => {
      console.log('SW registration failed: ', registrationError);
    });
  });
}