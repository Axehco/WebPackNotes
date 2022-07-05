module.exports = function (content) {
  console.log('normal loader2');
  return content;
}

module.exports.pitch = function () {
  console.log('pitch2');
  // 必须有返回值，直接写return不行 
  return "result";
}