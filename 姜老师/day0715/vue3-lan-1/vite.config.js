// url模块 fileURLToPath 可以转化路径的
import { fileURLToPath, URL } from 'node:url'
// 在使用vite的时候写配置可以提供提示
import { defineConfig } from 'vite'
// @vitejs/plugin-vue 这个插件就是让vite能支持vue
// @vitejs/plugin-react
// @vitejs/plugin-vue-jsx 支持jsx 插件
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { viteMockServe } from "vite-plugin-mock";
import legacy from '@vitejs/plugin-legacy'
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

// process.env.NODE_ENV
// import.meta.url
// https://vitejs.dev/config/
export default defineConfig({
  // vite的插件直接放在plugis中即可
  base: 'http://fulljs.cn',
  build: {
    minify:'terser'
  }, // 支持rollup 的配置
  plugins: [
    vue(),
    vueJsx(),
    viteMockServe(),
    Components({
      resolvers: [VantResolver()],
    }),
    // legacy()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./assets/var.scss";`
      },
    }
  },
  server: {
    proxy: {
      '/api': {
        target: "http://jsonplaceholder.typicode.com",
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  }
  // 组件库动态导入 element-plus  vant  andt-design-vue  nativeUI ....
})
