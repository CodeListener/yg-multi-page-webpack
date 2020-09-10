const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base");

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "cleap-module-eval-source-map",
  devServer: {
    // contentBase: path.join(__dirname, "/dist/"),
    hot: true,
    inline: true,
    host: "localhost",
    stats: "errors-only", // 只打印错误信息
    clientLogLevel: "silent",
    compress: true,
    port: 8080,
  },
});
