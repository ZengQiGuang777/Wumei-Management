const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //如果
  transpileDependencies: true,
  //配置打包文件后存放的目录
  outputDir: 'dist',
  //https://iot.fastbee.cn/
  //配置proxy代理
  // devServer: {
  //   //端口号
  //   port: "",
  //   //热更新
  //   hot: true,
  //   //启用gzip压缩
  //   compress: true,
  //   //配置反向代理
  //   proxy: {
  //     '/api': {
  //       //请求的网址
  //       target: '',
  //       //启用源请求的更改
  //       changeOrigin: true,
  //       pathRewrite:{
  //         '^/api':''
  //       }
  //     }
  //   }
  //}
})
