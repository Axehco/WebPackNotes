import count from './js/count';
import sum from './js/sum';

import './css/index.css';
import './css/iconfont.css';

import './less/index.less';

import './sass/index.sass';
import './sass/index.scss';
import './stylus/index.styl';

// let r = count(5, 5);
// console.log(r);

console.log(count(5, 6));
console.log(sum(5, 6));

if (module.hot) {
  module.hot.accept('./js/count');
  module.hot.accept('./js/sum');
}