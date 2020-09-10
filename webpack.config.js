const HtmlWebpackPlugins = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require("path");
const { glob } = require("glob");


const getMulitPage = function () {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(path.join(__dirname, "./src/*/index.js"));

  for (let idx = 0; idx < entryFiles.length; idx++) {
    const entryFile = entryFiles[idx];
    const match = entryFile.match(/src\/(.*)\/index.js/);
    const pageName = match && match[1];

    entry[pageName] = entryFile;

    htmlWebpackPlugins.push(
      new HtmlWebpackPlugins({
        template: path.join(__dirname, `src/${pageName}/index.html`),
        filename: `${pageName}.html`,
        chunks: [pageName],
        inject: true,
        meta: {
          viewport:
            "width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover",
          description:
            "邢帅教育是一家专注于职业技能培训的在线教育机构。邢帅教育目前已开设课程300余门，涵盖影视创作、视觉传达、绘画艺术、工业设计、外语、IT互联网、职场技能和兴趣生活等领域，主要提供包含平面设计、UI设计、影视动画、室内设计、淘宝电商等行业的职业技能在线培训服务。",
          keywords:
            "邢帅教育,邢帅网络学院,远程教育,公开课,网络公开课,在线学习,在线教育,在线培训,在线课堂",
        },
        minify: {
          html5: true,
          collapseWhitespace: true,
          preserveLineBreaks: false,
          minifyCSS: true,
          minifyJS: true,
          removeComments: false,
        },
      })
    );
  }
  return {
    entry,
    htmlWebpackPlugins,
  };
};
// 获取多页面
const { entry, htmlWebpackPlugins } = getMulitPage();

module.exports = {
  mode: process.env.NODE_ENV || "production",
  entry: entry,
  watch: true,
  output: {
    publicPath: '/',
    path: path.join(__dirname, "dist"),
    filename: "static/js/[name].js",
  },
  module: {
    rules: [
      {
        test: /.(css|less)$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /.jsx?$/,
        include: [path.resolve(__dirname, "src")],
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
        query: {
          presets: [
            [
              "@babel/env",
              {
                targets: {
                  browsers: "last 2 chrome versions",
                },
              },
            ],
          ],
        },
      },
    ],
  },
  plugins: [
    ...htmlWebpackPlugins,
    new MiniCssExtractPlugin({ filename: "static/css/[name].css" }),
    new CleanWebpackPlugin(),
  ],
  resolve: {
    extensions: [".json", ".js", ".jsx"],
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "/dist/"),
    inline: true,
    host: "localhost",
    port: 8080,
  },
};
