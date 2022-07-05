// 同步loader

// module.exports = function (content, map, meta) {
//   return content;
// }


module.exports = function (content, map, meta) {
  console.log('test1');
  // 第一个参数：err 代表是否有错误
  // 传递map，让source-map不中断
  // 传递meta，让下一个loader接收到其他参数
  this.callback(null, content, map, meta);
  return; // 当调用 callback() 函数时，总是返回 undefined
}