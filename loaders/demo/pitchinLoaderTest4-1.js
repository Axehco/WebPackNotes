module.exports = function (content) {
  console.log('normal loader1');
  return content;
}

module.exports.pitch = function () {
  console.log('pitch1');
}