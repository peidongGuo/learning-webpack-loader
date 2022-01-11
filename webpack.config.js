const path = require("path");

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
        test: /\.jsx$/,
        use: [
          {
            loader: "babel-loader",
            options: { presets: ["@babel/preset-env", "@babel/preset-react"] },
          },
        ],
        use: ["babel-loader"],
      },
      {
        test: /\.less$/i,
        use: ["style-loader", "less-loader"],
      },
      {
        test: /\.(jpg|png|bmp|gif|svg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              esModule: false,
              name: "[name].[ext]",
              limit: 1024 * 1024 * 1024,
              fallback: path.resolve(__dirname, "loaders", "file-loader"),
            },
          },
        ],
      },
    ],
  },
};
