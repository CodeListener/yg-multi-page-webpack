/* eslint-disable import/no-extraneous-dependencies */
const HtmlWebpackPlugins = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')
const fs = require('fs')
const { glob } = require('glob')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const resolve = (dir) => path.join(__dirname, `../${dir}`)
// 将环境变量注入到前端
const Dotenv = require('dotenv-webpack')
// const webpack = require('webpack')

const PAGES_DIR = 'src/pages'
const STATIC_DIR = 'static'
const getMulitPage = () => {
  // 忽略 assets 目录打包
  const ignoreFiles = ['assets'].map((item) => resolve(`${PAGES_DIR}/${item}/index.js`))
  const entry = {}
  const htmlWebpackPlugins = []
  // const entryFiles = glob.sync(resolve(`${PAGES_DIR}/*/index.js`), {
  //   ignore: ignoreFiles,
  // })

  const htmlEntryFiles = glob.sync(resolve(`${PAGES_DIR}/*/index.html`), {
    ignore: ignoreFiles,
  })

  for (let idx = 0; idx < htmlEntryFiles.length; idx++) {
    const entryFile = htmlEntryFiles[idx]
    const regexp = new RegExp(`${PAGES_DIR}/(.*)/index.html`)
    const match = entryFile.match(regexp)
    const pageName = match && match[1]
    const hasIndeEntry = fs.existsSync(resolve(`${PAGES_DIR}/${pageName}/index.js`))

    if (hasIndeEntry) {
      entry[pageName] = resolve(`${PAGES_DIR}/${pageName}/index.js`)
    }

    htmlWebpackPlugins.push(
      new HtmlWebpackPlugins({
        template: resolve(`${PAGES_DIR}/${pageName}/index.html`),
        filename: `${pageName}.html`,
        /**
         * 不存在js则只输出html文件
         */
        chunks: hasIndeEntry ? [pageName] : [''],
        inject: true,
        meta: {
          viewport:
            'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover',
          description: '多页面打包',
          keywords: 'yangguang',
        },
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      }),
    )
  }

  // for (let idx = 0; idx < entryFiles.length; idx++) {
  //   const entryFile = entryFiles[idx]
  //   const regexp = new RegExp(`${PAGES_DIR}/(.*)/index.js`)
  //   const match = entryFile.match(regexp)
  //   const pageName = match && match[1]

  //   entry[pageName] = entryFile

  //   htmlWebpackPlugins.push(
  //     new HtmlWebpackPlugins({
  //       template: resolve(`${PAGES_DIR}/${pageName}/index.html`),
  //       filename: `${pageName}.html`,
  //       chunks: [pageName],
  //       inject: true,
  //       meta: {
  //         viewport:
  //           'width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover',
  //         description:
  //           '邢帅教育是一家专注于职业技能培训的在线教育机构。邢帅教育目前已开设课程300余门，涵盖影视创作、视觉传达、绘画艺术、工业设计、外语、IT互联网、职场技能和兴趣生活等领域，主要提供包含平面设计、UI设计、影视动画、室内设计、淘宝电商等行业的职业技能在线培训服务。',
  //         keywords: '邢帅教育,邢帅网络学院,远程教育,公开课,网络公开课,在线学习,在线教育,在线培训,在线课堂',
  //       },
  //       minify: {
  //         html5: true,
  //         collapseWhitespace: true,
  //         preserveLineBreaks: false,
  //         minifyCSS: true,
  //         minifyJS: true,
  //         removeComments: false,
  //       },
  //     }),
  //   )
  // }

  return {
    entry,
    htmlWebpackPlugins,
  }
}
// 获取多页面
const { entry, htmlWebpackPlugins } = getMulitPage()

// 将env文件注入node环境变量中
require('dotenv').config({
  path: resolve(`env/.env.${process.env.NODE_ENV}`),
})

module.exports = {
  entry,
  output: {
    publicPath: '/',
    path: resolve('dist'),
    filename: `${STATIC_DIR}/js/[name]-[hash:8].js`,
  },
  module: {
    rules: [
      {
        test: /.(c|le)ss$/,
        include: [resolve('src')],
        exclude: [resolve('node_modules')],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /.jsx?$/,
        include: [resolve('src')],
        exclude: [resolve('node_modules')],
        loader: 'babel-loader',
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: [resolve('src')],
        options: {
          fix: true,
        },
      },
      {
        test: /\.(png|jpg|gif|jpeg|webp|svg|eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1024,
              esModule: false,
              outputPath: STATIC_DIR,
              name: `[folder]/[name]-[hash:8].[ext]`,
            },
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: 'html-withimg-loader',
      },
    ],
  },
  plugins: [
    ...htmlWebpackPlugins,
    new MiniCssExtractPlugin({
      filename: `${STATIC_DIR}/css/[name]-[hash:8].css`,
    }),
    // 复制静态资源到打包目录
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve('static'),
          to: resolve('dist/static'),
        },
      ],
    }),
    // 注入环境变量
    new Dotenv({
      path: resolve(`env/.env.${process.env.NODE_ENV}`),
    }),
    new ProgressBarPlugin({
      format: ' build [:bar]:percent(:elapsed seconds)',
      clear: true,
      width: 100,
    }),
    // new webpack.DllReferencePlugin({
    //   manifest: path.resolve(__dirname, '../dist', 'static/dll', 'manifest.json'),
    // }),
    new CleanWebpackPlugin({
      // cleanOnceBeforeBuildPatterns: ['!dll'],
    }),
  ],
  // externals: {
  //   // 指定包不进行打包，直接使用script引入
  //   lodash: '_',
  // },
  resolve: {
    extensions: ['.json', '.js', '.jsx', '.vue'],
    alias: {
      '@': resolve('src'),
    },
  },
}
