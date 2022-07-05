// 异步loader

module.exports = function (content, map, meta) {
  console.log('test2');
  const callback = this.async();
  // 进行异步操作
  setTimeout(() => {
    callback(null, content, map, meta);
  }, 3000);
};
