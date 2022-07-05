module.exports = function (content) {
  console.log(content);
  // content是一个Buffer数据
  return content;
}

module.exports.raw = true;

// 默认情况下，资源文件会被转化为 UTF-8 字符串，然后传给 loader。
// 通过设置 raw 为 true，loader 可以接收原始的 Buffer。


/* // 下面这种写法也可以：
function Test3Loader(content) {
  return content;
}

Test3Loader.raw = true;

module.exports = Test3Loader; */