module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  // parser: 'babel-eslint',
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module',
    jsx: true,
    globalReturn: true,
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'generator-star-spacing': 'off',
    'no-plusplus': 'off',
    'comma-dangle': ['error'],
    eqeqeq: 'off',
  },
  settings: {
    // 让eslint支持别名引入
    'import/resolver': {
      alias: {
        map: [['@', `./src`]],
      },
    },
  },
}
