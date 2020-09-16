/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge')
const OptimizeCssPlugin = require('optimize-css-assets-webpack-plugin')
// const TerserWebpackPlugin = require('terser-webpack-plugin')
// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
const baseWebpackConfig = require('./webpack.base')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    // 压缩css文件
    new OptimizeCssPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  optimization: {
    // splitChunks: {
    //   cacheGroups: {
    //     react: {
    //       test: /react/,
    //       chunks: 'all',
    //       priority: 1,
    //       name: 'react',
    //       minSize: 0,
    //       minChunks: 1,
    //     },
    //   },
      // 代码切块
      // cacheGroups: {
      //   vendor: {
      //     priority: 1,
      //     name: 'vendor',
      //     chunks: 'initial',
      //     minSize: 0,
      //     minChunks: 1,
      //   },
      // },
    },
  },
  // devtool: 'source-map', // 'source-map',  // "cleap-module-eval-source-map",
  // optimization: {
  //   minimizer: [
  //     // 移除console
  //     new TerserWebpackPlugin({
  //       parallel: 4,
  //       extractComments: true,
  //       terserOptions: {
  //         compress: {
  //           warnings: false,
  //           drop_console: true,
  //           drop_debugger: true,
  //           pure_funcs: ['console.log'],
  //         },
  //       },
  //     }),
  //   ],
  // },
})
