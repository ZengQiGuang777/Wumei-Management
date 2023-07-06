const { defineConfig } = require('@vue/cli-service')
const env = process.env.NODE_ENV



module.exports = defineConfig({
  /* 基础配置 */
  publicPath: './',
  lintOnSave: env !== 'production',
  transpileDependencies: [],
  productionSourceMap: false,
  /* devServer */
  devServer: {
    host: '127.0.0.1',
    open: true,
    proxy: {
      '/api': {
        target: 'https://iot.fastbee.cn/prod-api',
        changeOrigin: true,
        ws: true,
        pathRewrite: { "^/api": '' }
      }
    }
  },
  /* chaninWebpack */
  // chainWebpack: config => {
  //   config.optimization.minimizer('terser')
  //     .tap(options => {
  //       let compress = options[0].terserOptions.compress
  //       compress.drop_console = true
  //       compress.drop_debugger = true
  //       return options
  //     })
  // }
})
