const { defineConfig } = require('@vue/cli-service')
const env = process.env.NODE_ENV

module.exports = defineConfig({
  /* 基础配置 */
  publicPath: './',
  lintOnSave: env !== 'production',
  transpileDependencies: [],
  productionSourceMap: false,
  /* DEV-SERVER */
  devServer: {
    host: '127.0.0.1',
    open: true,
    proxy: {
      '/api': {
        target: 'https://news-at.zhihu.com/api/4',
        changeOrigin: true,
        ws: true,
        pathRewrite: { "^/api": "" }
      }
    }
  },
  /* 进阶配置 */
  configureWebpack: config => { },
  chainWebpack: config => {
    config.optimization.minimizer('terser')
      .tap(options => {
        let compress = options[0].terserOptions.compress
        compress.drop_console = true
        compress.drop_debugger = true
        return options
      })
  },
  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            primary: '#31C27C'
          }
        }
      }
    }
  }
})
