const webpack = require("webpack");
const { merge } = require("webpack-merge");
const baseWebpackConfig = require("./webpack.base");

module.exports = merge(baseWebpackConfig, {
  mode: "development",
  watch: true,
  plugins: [new webpack.HotModuleReplacementPlugin()],
  devtool: "cleap-module-eval-source-map",
  devServer: {
    // contentBase: path.join(__dirname, "/dist/"),
    hot: true,
    inline: true,
    host: process.env.HOST || "localhost",
    stats: "errors-only", // 只打印错误信息
    clientLogLevel: "silent",
    compress: true,
    port: process.env.PORT || process.env.npm_package_port || 8080,
    proxy: {
      "/api": {
        target: process.env.PROXY_URL,
        pathRewrite: {
          "^/api": "/api",
        },
        changeOrigin: true
      },
    },
  },
});
