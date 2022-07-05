const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    clean: true
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: './loaders/test-loader.js'
      // },
      {
        test: /\.js$/,
        // 执行顺序，从右到左，从下到上
        // use: [
        //   "./loaders/demo/synchronizationTest1.js",
        //   "./loaders/demo/asynchronizationTest2.js"
        // ],
        // use: ['./loaders/demo/rawloaderTest3.js'],
        // use: [
        //   './loaders/demo/pitchinLoaderTest4-1.js', 
        //   './loaders/demo/pitchinLoaderTest4-2.js',
        //   './loaders/demo/pitchinLoaderTest4-3.js'
        // ],
        loader: './loaders/clean-log-loader.js',
      },
      {
        test: /\.js$/,
        loader: './loaders/banner-loader/index.js',
        options: {
          author: '老王',
          // age: 18,  // options has an unknown property 'age'. 
        }
      },
      {
        test: /\.js$/,
        loader: './loaders/babel-loader/index.js',
        options: {
          presets: ["@babel/preset-env"],
        }
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        loader: "./loaders/file-loader",
        type: "javascript/auto", // 阻止webpack默认处理图片资源，只使用file-loader处理
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']  // 在写file-loader时用的
        // 只有'./loaders/style-loader/index.js'还不够，比如还不能处理图片
        use: ['./loaders/style-loader/index.js', 'css-loader']
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './public/index.html')
    })
  ],
  mode: 'development'
}