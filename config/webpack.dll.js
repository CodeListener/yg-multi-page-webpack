/* eslint-disable import/no-extraneous-dependencies */

const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: {
    react: ['react', 'react-dom'],
  },
  mode: 'production',
  output: {
    filename: '[name].dll.[hash:6].js',
    // 直接打包到项目的静态资源，引入方便匹配，打包的时候直接复制static，不需要使用clean插件忽略dll目录的操作
    path: path.resolve(__dirname, '../static/dll'),
    library: '[name]_dll',
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]_dll',
      path: path.resolve(__dirname, '../dist/static/dll/manifest.json'),
    }),
  ],
}
