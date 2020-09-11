module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:prettire/recommended'],
  parserOptions: {
    ecmaVersion: 2018,
    parser: 'babel-eslint',
  },
  plugins: ['prettier'],
  rules: {
    "prettier/prettier": "error"
  },
}
