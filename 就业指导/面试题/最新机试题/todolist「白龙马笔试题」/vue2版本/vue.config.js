const { defineConfig } = require('@vue/cli-service');
const env = process.env.NODE_ENV;
module.exports = defineConfig({
  publicPath: './',
  lintOnSave: env !== 'production',
  transpileDependencies: false,
  productionSourceMap: false,
  devServer: {
    host: '127.0.0.1',
    open: true
  }
});
