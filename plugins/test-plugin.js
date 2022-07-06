/**
 * 1. webpack加载webpack.config.js中所有配置，此时就会new TestPlugin()，执行插件的constructor
 * 2. webpack创建compiler对象
 * 3. 遍历所有plugins中插件,调用插件的apply方法
 * 4. 执行剩下编译流程（触发各个hooks事件）
 */

class TestPlugin {
  constructor () {
    console.log('TestPlugin constructor');
  }

  apply (compiler) {
    debugger;
    console.log(compiler);
    console.log('TestPlugin compiler');

    // 在编译器准备环境时调用，时机就在配置文件中初始化插件之后。
    // SyncHook 同步钩子，只能用tap注册
    compiler.hooks.environment.tap('TestPlugin', () => {
      console.log('TestPlugin environment hooks');
    })

    // 下面的三种调用方式是：异步串行的，所以从上到下依次执行。

    // 输出 asset 到 output 目录之前执行。这个钩子 不会 被复制到子编译器。
    // AsyncSeriesHook 异步串行钩子
    compiler.hooks.emit.tap('TestPlugin', (compilation) => {
      console.log('TestPlugin emit tap hooks 111');
    })

    // tapAsync 多了一个参数callback
    compiler.hooks.emit.tapAsync('TestPlugin', (compilation, callback) => {
      setTimeout(() => {
        console.log('TestPlugin emit tapAsync hooks 222');
        callback();
      }, 3000);
    })

    compiler.hooks.emit.tapPromise('TestPlugin', (compilation) => {
     return new Promise((resolve) => {
      resolve();
     })
    })

    // 使用tapAsync、tapPromise注册，进行异步操作会等异步操作做完再继续往下执行
    compiler.hooks.make.tapAsync("TestPlugin", (compilation, callback) => {
      setTimeout(() => {
        console.log("compiler.make() 222");
        // 必须调用
        callback();
      }, 1000);
    });

    compiler.hooks.make.tapPromise("TestPlugin", (compilation) => {
      console.log("compiler.make() 333");
      // 必须返回promise
      return new Promise((resolve) => {
        resolve();
      });
    });

  }
}

module.exports = TestPlugin;