module.exports = function (content) {
  console.log('normal loader3');
  return content;
}

module.exports.pitch = function () {
  console.log('pitch3');
}