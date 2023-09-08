/// <reference types="vite/client" />

// 声明导入 .vue 文件的类型「防止波浪线报错」
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
