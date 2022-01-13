const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "source-map",
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        // 用来处理 *.less 模块，
        // less-loader 将源码转成 css 代码
        // style-loader 将源码写入 html 的 head 的一个 style 元素中
        test: /\.less$/i,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        // 用来处理 *.jsx 模块，
        // babel-loader 中的 presets-@babel/preset-env 将 es6 写法转换成 es5 的写法
        // babel-loader 中的 presets-@babel/preset-react 将 jsx 语法转成 react.createElement 的写法
        test: /\.jsx$/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env", "@babel/preset-react"] },
          },
        ],
      },
      {
        // 用来处理图片资源模块
        // 将小于 limit 范围内的图片转成 base64 码
        // 如果大于等于 limit 就用 file-loader 直接复制一份到指定目录中，命名格式按 name 指定的来
        test: /\.(jpg|png|bmp|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false,
              name: "[name].[ext]",
              limit: 1024 * 1024 * 1024,
            },
          },
        ],
      },
    ],
  },
  plugins: [new HTMLWebpackPlugin({ template: "./src/html/index.html" })],
};
