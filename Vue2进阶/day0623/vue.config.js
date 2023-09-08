const { defineConfig } = require('@vue/cli-service')
const env = process.env.NODE_ENV

// https://cli.vuejs.org/zh/config/
module.exports = defineConfig({
  /* 基础配置 */
  publicPath: './',
  lintOnSave: env !== 'production',
  transpileDependencies: [],
  productionSourceMap: false,
  /* DEV-SERVER */
  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    host: '127.0.0.1',
    open: true,
    proxy: {
      '/api': {
        target: 'https://news-at.zhihu.com',
        changeOrigin: true,
        ws: true
      },
      '/book': {
        target: 'https://www.jianshu.com/asimov',
        changeOrigin: true,
        pathRewrite: { "^/book": "" }
      }
    }
  },
  /* 进阶配置 */
  configureWebpack: config => { },
  chainWebpack: config => {
    // 针对生产环境：去掉console.xxx/debugger等调试代码
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
      // 针对 less-loader 的配置更改
      less: {
        lessOptions: {
          modifyVars: {
            primary: '#31C27C'
          }
        }
      },
      // 针对 postcss-loader 的配置更改
      postcss: {}
    }
  }
})


/* 
 处理浏览器兼容问题「兼容到IE10」
   核心是 browserslist「配置浏览器兼容列表」
   https://github.com/browserslist/browserslist
   ---package.json
   "browserslist": [
     "> 1%", //使用率
     "last 2 versions", //每个浏览器向后兼容的版本
     "not ie < 10", //需要兼容IE10/11
     //"not dead", //不考虑死亡（两年内没有更新的）的浏览器，例如：IE
   ]

   @1 CSS3的样式属性「办法：加前缀 -webkit-、-ms-、-moz-、...」
     webpack配置规则中，自动基于 browserslist + postcss-loader + autoprefixer 给CSS3样式属性设置相关的前缀！
   
   @2 ES6“语法”的兼容「办法：把ES6+语法转换为ES5语法」
     webpack配置规则中，自动基于 browserslist + babel-loader + @babel/preset-env（或者@vue/cli-plugin-babel/preset）进行语法的转换！
     特殊情况：如果我们使用了很特殊的语法（比如类的装饰器），还需要基于额外的 babel 插件单独处理！
     重点注意：语法包是有版本的，如果用的语法包版本低，而我们使用了特别新的ES语法，也是无法实现转换的！

   @3 ES6“内置API”的兼容「办法：基于ES5的语法把用的API方法重写」
     此时需要依赖于第三方(官方)的相关插件：@babel/polyfill 或者 core-js 等
     + @vue/cli脚手架，默认已经完成这方面的配置处理，只需要我们修改browserslist即可
        脚手架根据browserslist和项目代码，自动分析出需要的polyfill，然后按需从corejs中导入，以此做到polyfill的最小导入！
        module.exports = {
          presets: [
            [
              '@vue/cli-plugin-babel/preset',
              {
                useBuiltIns: 'usage',
                corejs: 3,
              },
            ],
          ]
        }
     + 这样做，很多时候，无法完全覆盖需要的API方法（比如用到了特殊的API），此时需要我们手动导入完整的polyfill，来处理兼容!
        module.exports = {
          presets: [
            [
              '@vue/cli-plugin-babel/preset',
              {
                useBuiltIns: 'entry'
              }
            ]
          ],
          ...
        }
      程序入口中(main)：
        import 'core-js/stable'
        import 'regenerator-runtime'
      但是即便全量导入了polyfill，也不是所有的ES6的API都被重写了，例如：Fetch/Reflect/Proxy等，就没有被重写，所以要考虑兼容，这些API是不能用的！！
 */

/* 
 publicPath：控制打包后，HTML中导入资源的前缀「默认是 “/” 根目录」
   <script defer="defer" src="/js/chunk-vendors.084b53a4.js"></script>
   问题：要求打包后的资源必须部署到服务器指定web服务的根目录下，只有这样，后期在访问页面的时候，才可以从根目录下访问到这些资源！
   实战指南：
     + 平时开发中，我们一般会把 publicPath 改为 “./” 当前目录，这样只要把html和资源部署到相同的目录下（不论是不是根目录），以后每次访问，都是从当前目录开始查找！
     + 我们还可能会把 publicPath 改为一个 CDN 地址「开启资源的“地狱分布式”部署」！

  lintOnSave：控制ESLint检测
    + false：不进行ESLint检测
    + true/'warning'：进行ESLint检测，但是如果有不符合语法规范的，只是提示警告，不影响代码的编译
    + 'default'/'error'：进行ESLint检测，但是如果有语法错误，则直接停止编译和预览
    实战指南：
      开发环境下：使用true
      生产环境下：使用false，最后打包的时候，就不要再检测了，直接打包即可，这样可以提高打包的速度！！

  transpileDependencies：控制是否对 node_modules 中的文件进行编译
    + true：所有 node_modules 中的文件都需要编译
    + false：和上面相反
    + ['xxx',...]：也可以基于数组指定哪些需要编译
    实战指南：
      真实项目中，用的是 数组或者false，以此来加快项目编译的速度

  productionSourceMap：控制生产环境下，是否需要生成 source map 文件
    开发环境下不需要：因为开发环境下，代码不会压缩和混淆，直接可以做调试
    生产环境下，所有的代码都会压缩为一行，并且进行了混淆，这样没办法调试，想调试则需要 source map 文件！
    实战指南：
      source map 文件我们一把是不需要的，因为如果生产环境出现问题，第一件事不是调试，而是回滚！把损失降到最低！
      取消 source map ，可以加快打包速度！！

  devServer.proxy：配置跨域代理
    真实项目中，客户端可能需要向多个服务器发送请求，此时需要配置多套跨域代理
      + 基于不同的请求前缀进行区分
      + 如果请求的前缀在真正的请求地址中不存在，则需要把用来区分的前缀干掉
 */