const { merge } = require("webpack-merge");
const OptimizeCssPlugin = require("optimize-css-assets-webpack-plugin");
const baseWebpackConfig = require("./webpack.base");

module.exports = merge(baseWebpackConfig, {
  mode: "production",
  plugins: [
    // 压缩css文件
    new OptimizeCssPlugin(),
  ],
  devtool: "source-map", // 'source-map',  // "cleap-module-eval-source-map",
});
