/* eslint-disable import/no-extraneous-dependencies */
import { merge } from 'webpack-merge'
import OptimizeCssPlugin from 'optimize-css-assets-webpack-plugin'
import baseWebpackConfig from './webpack.base'

export default merge(baseWebpackConfig, {
  mode: 'production',
  plugins: [
    // 压缩css文件
    new OptimizeCssPlugin(),
  ],
  devtool: 'source-map', // 'source-map',  // "cleap-module-eval-source-map",
})
