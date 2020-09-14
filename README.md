# 多页面打包工具

> 每次做简单项目都是直接创建 html,css,js文件一把梭，写css, js 兼容性又怕跟不上，各种麻烦，直接配置个简单打包，方便以后使用


## PS: 创建目录建议连同index.js一起创建，因为页面可能不需要script脚本，所以可以不创建index.js，但一定pages/** 至少存在一个index.js文件，否则entry匹配不到index.js则报错


```
├── README.md
├── config                  // 打包配置
│   ├── webpack.base.js     // 基础配置
│   ├── webpack.dev.js      // 开发配置
│   ├── webpack.dll.js      // 对不经常更新的库，进行单独打包依赖
│   └── webpack.prod.js     // 线上配置
├── env                     // 环境变量
    ├── .env.development
    ├── .env.production
    └── .env.test
├── mock                    // mock服务
│   ├── index.js
│   └── user.js
├── package-lock.json
├── package.json
├── postcss.config.js
├── src
│   ├── assets
│   └── pages               // 页面入口
└── static                  // 静态资源
```


## npm script

```
// 本地开发（开发环境联调）
"local:dev": "cross-env NODE_ENV=development webpack-dev-server --config=./config/webpack.dev.js"
// 本地开发（测试环境联调）
"local:test": "cross-env NODE_ENV=test webpack-dev-server --config=./config/webpack.dev.js"
// 本地开发（线上环境联调）
"local:prod": "cross-env NODE_ENV=production webpack-dev-server --config=./config/webpack.dev.js"
// 编译（测试环境）
"build:test": "cross-env NODE_ENV=test webpack --config=./config/webpack.prod.js"
// 编译（线上环境）
"build:prod": "cross-env NODE_ENV=production webpack --config=./config/webpack.prod.js"
```