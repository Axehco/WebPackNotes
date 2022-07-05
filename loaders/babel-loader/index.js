const babel = require("@babel/core");
const schema = require('./schema.json');

// https://www.babeljs.cn/docs/babel-core

module.exports = function (content) {
  const options = this.getOptions(schema);
  // 使用异步loader
  const callback = this.async();
  // 使用babel对js代码进行编译
  babel.transform(content, options, function (err, result) {
    if (err) {
      callback(err);
    } else {
      callback(null, result.code);
    }
    // callback(err, result.code);
  });
}