import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// import viteImp from 'vite-plugin-imp'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import pxtorem from 'postcss-pxtorem'

/* https://vitejs.dev/config/ */
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    vueJsx(),
    // 按需导入插件 https://github.com/onebay/vite-plugin-imp
    /* viteImp({
      libList: [
        {
          libName: 'lodash',
          libDirectory: '',
          camel2DashComponentName: false
        }
      ]
    }), */
    // vant@4的按需导入
    Components({
      resolvers: [
        VantResolver()
      ],
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  /* 服务配置 */
  server: {
    host: '127.0.0.1',
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7100',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  /* 生产环境 */
  build: {
    assetsInlineLimit: 1024 * 10,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  /* CSS样式 */
  css: {
    postcss: {
      plugins: [
        pxtorem({
          rootValue: 37.5,
          propList: ['*']
        })
      ]
    },
    preprocessorOptions: {
      less: {
        additionalData: `@import "@/assets/var.less";`
      }
    }
  }
})
