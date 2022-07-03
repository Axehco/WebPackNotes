// Node.js的核心模块，专门用来处理文件路径
const path = require("path");

const ESLintPlugin = require('eslint-webpack-plugin');

const HtmlWebpackPlugin = require('html-webpack-plugin');

// 用MiniCssExtractPlugin时：需要把所有的style-loader替换为MiniCssExtractPlugin.loader
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

// 用来获取处理样式的loader
function getStyleLoaders(pre) {
  return [
    MiniCssExtractPlugin.loader,
    'css-loader',
    {
      loader: "postcss-loader",
      options: {
        postcssOptions: {
          plugins: [
            "postcss-preset-env", // 能解决大多数样式兼容性问题
          ],
        },
      },
    },
    pre
  ].filter(Boolean);
}

module.exports = {
  // 入口
  // 相对路径和绝对路径都行
  entry: "./src/main.js",
  // 输出
  output: {
    // path: 文件输出目录，必须是绝对路径
    // path.resolve()方法返回一个绝对路径
    // __dirname 当前文件的文件夹绝对路径
    // path: path.resolve(__dirname, "dist"),
    path: path.resolve(__dirname, "../dist"),
    // filename: 输出文件名
    // filename: "main.js",
    filename: "static/js/main.js",
    clean: true,  // 自动清空上次的打包结果 但是webpack4需要装一个插件
  },
  // 加载器
  module: {
    rules: [
      {
        test: /\.css$/i,
        // use: [
        //   // "style-loader", 
        //   MiniCssExtractPlugin.loader,
        //   "css-loader",
        //   {
        //     loader: "postcss-loader",
        //     options: {
        //       postcssOptions: {
        //         plugins: [
        //           "postcss-preset-env", // 能解决大多数样式兼容性问题
        //         ],
        //       },
        //     },
        //   },
        // ],
        use: getStyleLoaders()
      },
      {
        test: /\.less$/i,
        // loader: 'XXX'  // 只能使用一个loader use可以使用多个loader
        // use: [
        //   // compiles Less to CSS
        //   // 'style-loader',
        //   MiniCssExtractPlugin.loader,
        //   'css-loader',
        //   {
        //     loader: "postcss-loader",
        //     options: {
        //       postcssOptions: {
        //         plugins: [
        //           "postcss-preset-env", // 能解决大多数样式兼容性问题
        //         ],
        //       },
        //     },
        //   },
        //   'less-loader',
        // ],
        use: getStyleLoaders('less-loader')
      },
      {
        test: /\.s[ac]ss$/i,
        // use: [
        //   // 将 JS 字符串生成为 style 节点
        //   // 'style-loader',
        //   MiniCssExtractPlugin.loader,
        //   // 将 CSS 转化成 CommonJS 模块
        //   'css-loader',
        //   {
        //     loader: "postcss-loader",
        //     options: {
        //       postcssOptions: {
        //         plugins: [
        //           "postcss-preset-env", // 能解决大多数样式兼容性问题
        //         ],
        //       },
        //     },
        //   },
        //   // 将 Sass 编译成 CSS
        //   'sass-loader',
        // ],
        use: getStyleLoaders('sass-loader')
      },
      {
        test: /\.styl$/,
        // use: [
        //   // 'style-loader',
        //   MiniCssExtractPlugin.loader,
        //   'css-loader',
        //   {
        //     loader: "postcss-loader",
        //     options: {
        //       postcssOptions: {
        //         plugins: [
        //           "postcss-preset-env", // 能解决大多数样式兼容性问题
        //         ],
        //       },
        //     },
        //   },
        //   'stylus-loader',  // 将 Stylus 文件编译为 CSS
        // ],
        use: getStyleLoaders('stylus-loader')
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset",
      },
      // https://webpack.docschina.org/guides/asset-modules/#general-asset-type
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024 // 小于10kb的图片会被base64处理
          }
        },
        generator: {
          // 将图片文件输出到 static/imgs 目录中
          // 将图片文件命名 [hash:8][ext][query]
          // [hash:8]: hash值取8位
          // [ext]: 使用之前的文件扩展名
          // [query]: 添加之前的query参数
          filename: "static/imgs/[hash:8][ext][query]",
        },
      },
      {
        test: /\.(ttf|woff2?|mp4|mp3|avi)$/,
        type: 'asset/resource',
        generator: {
          filename: "static/media/[hash:8][ext][query]",
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,  // 排除node_modules不处理
        use: {
          loader: 'babel-loader',
          // 下面注释了  主要是将配置罗到了babel.config.js中
          // options: {
          //   presets: ['@babel/preset-env']
          // }
        }
      }
    ],
  },
  // 插件
  plugins: [
    new ESLintPlugin({
      // 检测哪些文件
      context: path.resolve(__dirname, '../src')
    }),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
      // template: path.resolve(__dirname, "./src/index.html"),
      template: path.resolve(__dirname, "../public/index.html"),
    }),
    new MiniCssExtractPlugin({
      // 自定义输出css文件的目录
      filename: "static/css/main.css"
    }),
    // css压缩
    new CssMinimizerPlugin(),
  ],
  // 生产模式不需要 devServer
  // // 开发服务器 运行在内存中的，并没有输出
  // devServer: {
  //   host: "localhost", // 启动服务器域名
  //   port: "3000", // 启动服务器端口号
  //   open: true, // 是否自动打开浏览器
  // },
  // 模式
  mode: "production", // 生产模式
};