# Vue2知识点收尾

## Vue2的DOM-DIFF原理

### 1.1 Diff 概念

Vue 基于虚拟 DOM 做更新 。diff 的核心就是比较两个虚拟节点的差异 。Vue 的 diff 算法是平级比较，不考虑跨级比较的情况。内部采用深度递归的方式 + 双指针的方式进行比较。

### 1.2 Diff 比较流程

- 1.先比较是否是相同节点 (isSameVNode)
- 2.相同节点比较属性,并复用老节点（将老的虚拟 dom 复用给新的虚拟节点 DOM）
- 3.比较儿子节点，考虑老节点和新节点儿子的情况
  - 老的没儿子，现在有儿子。 直接插入新的儿子
  - 老的有儿子，新的没儿子。直接删除页面节点
  - 老的儿子是文本，新的儿子是文本，直接更新文本节点即可
  - 老的儿子是一个列表，新的儿子也是一个列表 updateChildren

- 4.优化比较：头头、尾尾、头尾、尾头
- 5.比对查找进行复用

![diff](https://zishui.oss-cn-beijing.aliyuncs.com/vue-diff.4c21677d.jpg)

## 请说明 Vue 中 key 的作用和原理，谈谈你对它的理解？

### 1.1 key 的概念

- `key` 的特殊 attribute 主要用在 Vue 的虚拟 DOM 算法，在新旧 nodes 对比时辨识 VNodes。如果不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地修改/复用相同类型元素的算法。
- 当 Vue 正在更新使用 `v-for` 渲染的元素列表时，它默认使用“就地更新”的策略。如果数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染

### 1.2 key 的作用

- Vue 在 patch 过程中通过 key 可以判断两个虚拟节点是否是相同节点。 （可以复用老节点）

- 无 key 会导致更新的时候出问题
- 尽量不要采用索引作为 key

![key](https://zishui.oss-cn-beijing.aliyuncs.com/key.ca1b7f53.png)

### 1.3 问题示例

```html
<script src="https://cdn.jsdelivr.net/npm/vue@2"></script>
<div id="app">
    <li v-for="item in list" :key="item">
        <input type="checkbox"> {{item}}
    </li>
    <button @click="add">增加</button>
</div>
<script>
    const vm = new Vue({
        el: '#app',
        data: {
            list: [1, 2, 3, 4]
        },
        methods: {
            add() {
                this.list.unshift(Math.random())
            }
        }
    })
</script>
```

## Vue 中如何进行依赖收集？

### 1.1 依赖收集的流程

- 每个属性都拥有自己的`dep`属性，存放他所依赖的 watcher，当属性变化后会通知自己对应的 watcher 去更新
- 默认在初始化时会调用 render 函数，此时会触发属性依赖收集 `dep.depend`
- 当属性发生修改时会触发`watcher`更新 `dep.notify()`

![img](https://zishui.oss-cn-beijing.aliyuncs.com/fow.34669a8f.png)

```js
class Dep {
    constructor() {
        this.subs = new Set;
    }
    depend() {
        this.subs.add(Dep.target); // 让属性记住这个watcher
    }
    notify() {
        this.subs.forEach(watcher => watcher.update()); // 通知记住的watcher更新
    }
}
class Watcher{
    constructor(fn) {
        this.getter = fn;
        this.get();
    }
    get() { // 第一次渲染
        Dep.target = this;
        this.getter();
        Dep.target = null;
    }
    update() { // 数据变化后更新
        this.get();
    }
}
function defineReactive(obj, key, value) {
    const dep = new Dep();
    Object.defineProperty(obj, key, {
        get() {
            if (Dep.target) { // 说明是在watcher中访问的属性
                dep.depend()
            }
            return value;
        },
        set(newValue) {  // 如果设置的是一个对象那么会再次进行劫持
            if (newValue === value) return
            observe(newValue);
            value = newValue
            dep.notify();
        }
    })
}
function isObject(value) {
    return typeof value === 'object' && value !== null;
}
function observe(value) {
    if(!isObject(value)){
        return;
    }
    Object.keys(value).forEach(key=>{ // 要使用defineProperty重新定义
        defineReactive(value,key,value[key]);
    });
}
const state = {name:'jw'}
observe(state); // 观测状态，在组件渲染时使用此状态
function render() { 
    console.log(state.name)
}
new Watcher(render);
```

# Vite

## 介绍

> Vite（法语意为 "快速的"，发音 `/vit/`，发音同 "veet"）是一种新型前端构建工具，能够显著提升前端开发体验。它主要由两部分组成：

- 一个开发服务器，它基于**原生 ES 模块**提供了**丰富的内建功能**，如速度快到惊人的**模块热更新（HMR）**。*（在开发环境中会基于ES模块启动一个本地服务，优势是可以进行按需加载。并且可以实时预览开发的内容）*
- 一套构建指令，它使用 [Rollup](https://rollupjs.org/) 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。*（生产环境是基于rollup来进行打包，提供了内置配置，最终打包出来的资源小。可直接部署到服务器上）*

## Webpack VS Vite

### 开发环境对比

- Webpack：冷启动（首次启动）开发服务器时，需要构建完整的应用，之后才能提供开发服务。（大型项目启动时非常缓慢，后续更新也非常缓慢） Webpack中大量插件由第三方编写，可能会有性能差等问题。
- Vite：冷启动时，不需要等待构建完整的应用 （vite支持预构建） `Vite`使用`esbuild`对第三方模块进行预构建，将非ESM规范的代码转换为ESM规范的代码，同时可以将多个文件资源合并成一个，减少http请求。（Vite是基于ESModule的） 在服务启动后浏览器会根据入口文件需要发送相应请求，获取资源时对代码进行转化等操作。

> 快速的冷启动、实时模块转换。

![image-20230711150202827](https://zishui.oss-cn-beijing.aliyuncs.com/image-20230711150202827.png)

![image-20230711150407049](https://zishui.oss-cn-beijing.aliyuncs.com/image-20230711150407049.png)

**esbuild**

![image-20230711150803107](https://zishui.oss-cn-beijing.aliyuncs.com/image-20230711150803107.png)

- 基于 Go 语言：ESBuild 是使用 Go 语言编写的构建工具。Go 语言可以充分利用多核CPU 实现并行构建。
- esbuild专注js、ts、jsx的构建和转译，使用自己的算法进行转换和优化，相比其他打包工具速度更快。
- esbuild同样也具有插件系统，可以扩展其自身功能。



> 但是目前esbuild在构建方面表现出色，但是在生产环境中还不够完善。生产环境我们更关心：代码体积、代码分割、代码缓存等。 Vite在生产环境中采用Rollup的目的也是认为 Rollup 提供了更好的性能与灵活性方面的权衡。



### 生产环境对比

- Webpack 是一个非常成熟和广泛采用的打包工具，拥有庞大的生态系统和丰富的插件支持，对于大型复杂的项目，Webpack 的成熟生态系统和丰富的功能一定为首选。
- 对于Vite而言，生产采用的是rollup。
  - **体积更小**：Rollup专注于 JavaScript 模块的打包，可以生成更小、更精简的输出文件，它提供了更好的 tree shaking（摇树优化）功能。
  - **更快的构建速度**：Rollup在打包时的速度通常要比webpack更快。
  - **针对库的打包**：Rollup更适合于构建独立的库或组件
  - **ES模块的支持**：Rollup天生支持ES模块的语法。
  - **插件系统**：Rollup具有灵活的插件系统。

> Vue2 一般采用webpack来处理，如果使用Vite还需要解决很多问题（老项目更不要在折腾了）。 Vue3 项目我们一般采用Vite来进行创建项目，当然也可以使用@vue/cli来进行创建。但要注意的是，ESModule需要浏览器天生支持才可以



## Vite项目创建

> node版本：v16.20.0

```shell
pnpm create vite
```

```shell
✔ Project name: … vue3-lesson
✔ Select a framework: › Vue
✔ Select a variant: › Customize with create-vue

Vue.js - The Progressive JavaScript Framework

✔ Add TypeScript? … No / Yes
✔ Add JSX Support? … No / Yes
✔ Add Vue Router for Single Page Application development? … No / Yes
✔ Add Pinia for state management? … No / Yes
✔ Add Vitest for Unit Testing? … No / Yes
✔ Add an End-to-End Testing Solution? › No
✔ Add ESLint for code quality? … No / Yes
✔ Add Prettier for code formatting? … No / Yes
```

### 目录结构

- `.vscode `：-> extensions.json 推荐安装插件
- `public`：该目录通常用于存放不需要经过构建处理的静态资源。这些资源在打包过程中不会被处理或修改，直接复制到输出目录中
- `src`：源代码目录
  - assets：通常用于存放需要经过构建处理的静态资源，这些资源在打包过程中会被构建工具所处理
  - components：项目中的公共组件
  - router：路由配置
  - views：页面及别组件
  - App.vue： 项目根组件
  - main.js：入口文件
- `.eslintrc.cjs`：eslint配置文件，检测代码质量
- `.prettierrc.json`: prettier插件，代码格式化
- `index.html`：静态文件入口文件
- `vite.config.js`：vite的配置文件

## Vite基本使用

### 1,图片

> 服务启动时引入一个静态资源会返回解析后的公共路径

```vue
<template>
  <img src="./assets/logo.svg" style="width: 100px;height: :100px;">
</template>
```

### 2.基础路径

```js
export default defineConfig({
  base:'http://www.fulljs.cn/' // 基础路径
});
```

### 3.路径别名

```html
<img src="@@/logo.svg" style="width: 100px;height: 100px;">
```

```js
resolve: {
  alias: {
    '@@': fileURLToPath(new URL('./src/assets', import.meta.url))
  }
}
```

### 4.css module

```vue
<script setup>
import style from './style.module.css'
</script>
<template>
  <h1 :class="$style.red"> 嘿嘿</h1>
  <h1 :class="style.green">哈哈</h1>
</template>
<style module>
.red {color: red;}
</style>
```

### 5.支持less和sass

```
pnpm install less sass -D
```

```scss
css: {
  preprocessorOptions: {
    scss: {
      additionalData: '@import "./assets/scss/var.scss";'
    }
  }
}
```

```vue
<template>
  <h1 class="less">less</h1>
  <h1 class="scss">scss</h1>
</template>
<style lang="less">
  @less: pink;
  .less {color: @less;}
</style>
<style lang="scss">
  $scss: purple;
  .scss {color: $scss;}
</style>
```

### 6.postcss配置

*postcss.config.js*

```js
module.exports = {
    plugins: [require('autoprefixer')]
}
```

*.browserslistrc*

```
> 0.1%
```

### 7.兼容性处理

```js
import legacy from '@vitejs/plugin-legacy'
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    legacy() // 在构建过程中生成传统的 ES5 兼容包，以支持旧版本的浏览器
  ],
})
```

### 8.反向代理

```js
server: {
  proxy: {
    '/api': {
      target: "http://jsonplaceholder.typicode.com",
      changeOrigin: true,
      rewrite:path => path.replace(/^\/api/,'')
    }
  }
}
```

```js
fetch('/api/posts/').then(res=>json()).then(data => {
  console.log(data)
});
```

### 9.mock数据

```shell
pnpm i mockjs vite-plugin-mock -D
```

```js
import { viteMockServe } from "vite-plugin-mock";
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    viteMockServe({})
  ]
});
```

```js
export default [
    {
        url: '/api/get',
        method: 'get',
        response: () => {
            return {
                code: 0,
                data: {name: 'jw'}
            };
        },
    }
]
```

### 10.压缩选项

```js
build: {
  minify:'terser', // 使用terser来压缩
  assetsInlineLimit: 200 * 1024
}
```

### 11.组件自动导入

```shell
pnpm i unplugin-vue-components -D
pnpm i vant 
```

```js
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
  plugins: [
    Components({
      resolvers: [VantResolver()], // vant组件解析
    })
  ],
});
```



# 你知道Vue3哪些新特性?

[Vue3 迁移指南](https://v3-migration.vuejs.org/)

### 1.Composition API 

- 使用函数的方式编写vue组件。
- 组合式API (响应式API `ref()、reactive()`，生命周期钩子`onMounted()、onUnmounted()`，依赖注入`inject()、provide()`)
- 组合式API并不是函数式编程。



**如何看待Composition API 和 Options API**

- 在Vue2中采用的是OptionsAPI, 用户提供的data,props,methods,computed,watch等属性 (用户编写复杂业务逻辑会出现反复横跳问题)
- Vue2中所有的属性都是通过`this`访问，`this`存在指向明确问题
- Vue2中很多未使用方法或属性依旧会被打包，并且所有全局API都在Vue对象上公开。Composition API对 tree-shaking 更加友好，代码也更容易压缩。
- 组件逻辑共享问题， Vue2 采用mixins 实现组件之间的逻辑共享； 但是会有数据来源不明确，命名冲突等问题。 Vue3采用CompositionAPI 提取公共逻辑非常方便

![image-20230616151243860](https://zishui.oss-cn-beijing.aliyuncs.com/image-20230616151243860.png)

> 将同一个逻辑的相关代码收集在一起，并且可复用。



### 2.SFC Composition API Syntax Sugar (\<script setup\>) 

- 单文件组合式API语法糖(setup语法糖)
- 让代码更简洁，性能更好（不需要借助代理对象）。

### 3.Teleport  

- 类似于React中的Portal传送门组件，指定将组件渲染到某个容器中。
- 经常用于处理弹窗组件和模态框组件。

```vue
<button @click="open = true">打开模态框</button>
<Teleport to="body">
  <div v-if="open" class="modal">
    <button @click="open = false">关闭</button>
  </div>
</Teleport>
```

### 4.Fragments

- Fragment（片段）Vue3中允许组件中包含多个节点。无需引入额外的DOM元素。

### 5.Emits Component Option

- Vue3中默认绑定的事件会被绑定到根元素上。通过Emits属性可将事件从`attrs` 中移除。

### 6.createRenderer API from @vue/runtime-core to create custom renderers

- 提供自定义渲染器，可以在非DOM环境中使用Vue的运行时。

```js
const {createRenderer,h} = Vue
const renderer = createRenderer({
    createElement(element){
        return document.createElement(element);
    },
    setElementText(el,text){
        el.innerHTML = text
    },
    insert(el,container){
        container.appendChild(el)
    }
});
renderer.render(h('h1','hello world'),document.getElementById('app'))
```

### 7.SFC State-driven CSS Variables (v-bind in \<style\>)

- 在css中使用v-bind绑定样式

```
background: v-bind(color);
```

### 8.SFC \<style scoped\> can now include global rules or rules that target only slotted content

- 在作用域样式中可以包含全局规则或只针对插槽内容的规则

```scss
/* 跨组件修改组件内样式 */
.parent :deep(h1){color:red}
/* 控制全局样式 */
:global(.root){width: 100px;height:100px;background: yellow;}
/* 控制插槽传递的内容的样式 */
:slotted(.child){color:red}
```

### 9.Suspense experimental

- 主要的作用优雅地处理异步组件的加载状态

```vue
<Suspense>
    <template #default>
        <!-- 可以配合async setup使用 -->
        <AsyncComponent></AsyncComponent>
    </template>
    <template #fallback>
        正在加载异步组件...
    </template>
</Suspense>
```
