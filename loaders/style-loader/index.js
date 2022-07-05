module.exports = function (content) {
  /**
   * 1．直接使用style-loader，只能处理样式，不能处理样式中引入的其他资源
   * 
   * use: ["./ loaders/style-loader"],
   * 
   * 2．借助css-loader解决样式中引入的其他资源的问题
   * 
   * use: ["./ loaders/style-loader", "css-loader"],
   * 
   * 问题是css-loader暴露了一段js代码，style-loader需要执行js代码，得到返回值，再动态创建style标签，插入到页面上
   * 不好操作
   * 
   * 3. style-loader使用pitch loader用法
   */
  // const script = `
  //   const styleEl = document.createElement('style');
  //   styleEl.innerHTML = ${JSON.stringify(content)};
  //   document.head.appendChild(styleEl);
  // `

  // return script;

};

// pitch的执行顺序和normal是相反的
module.exports.pitch = function (remainingRequest) {
  // remainingRequest 剩下还需要处理的loader
  console.log(remainingRequest);  // D:\JS\18Webpack\WebPackNotesLoader\node_modules\css-loader\dist\cjs.js!D:\JS\18Webpack\WebPackNotesLoader\src\css\index.css

  // 1.将 remainingRequest中绝对路径改成相对路径（因为后面只能使用相对路径操作)
  // 希望变成：..\..\node_modules\css-loader\dist\cjs.js!..\..\src\css\index.css
  const relativePath = remainingRequest.split("!").map((absolutePath) => {
    // 返回相对路径
    return this.utils.contextify(this.context, absolutePath);  // 注意：this.context，不是this.content
  }).join("!");

  // console.log(relativePath);

  // 2.引入css-loader处理后的资源
  // 3.动态创建style，将内容插入生效
  // !! 跳过 pre、 normal 和 post loader。
  const script = `
    import style from '!!${relativePath}';
    const styleEl = document.createElement('style');
    styleEl.innerHTML = style;
    document.head.appendChild(styleEl);
  `

  return script;  // 终止后面loader的执行。
}