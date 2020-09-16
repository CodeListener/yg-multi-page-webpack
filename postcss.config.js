/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('postcss-px2rem')({
      remUnit: 75,
      remPrecision: 4,
    }),
  ],
}
