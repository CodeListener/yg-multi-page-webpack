module.exports = {
  root: true,
  env: {
    browser: true,
    es6: true,
  },
  // parser: 'babel-eslint',
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
    'generator-star-spacing': 'off',
    'no-plusplus': 'off',
    eqeqeq: 'off',
  },
}
