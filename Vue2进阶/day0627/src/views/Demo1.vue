<template>
    <div class="demo-box">
        <!-- 
          el-button是一个组件，所以 @click="buttonHandle" 并不是基于 addEventListener 给元素做事件绑定，而是给 el-button 组件的事件池中，注入一个 click 的自定义事件，方法是 buttonHandle！
            + buttonHandle 方法是否可以执行，需要在 el-button 组件内部，基于 this.$emit 处理
            + 分析 el-button 的源码发现
              + 调用这个组件，最后组件渲染出来的是一个 button 标签
              + 默认给 button 标签做了click事件绑定，点击按钮执行组件内部的 handleClick 方法
              + 在 handleClick 方法中，把刚才注册的 click 自定义事件，以及绑定的 buttonHandle 方法，基于 $emit 通知执行！

          @mouseenter="buttonHandle"
            + 这个操作也是给组件的事件池中，注入一个 mouseenter 的自定义事件，方法是 buttonHandle
            + 但可惜的是，通过对 el-button 源码的分析，我们发现，其内部没有对 mouseenter 自定义事件做处理，所以即便鼠标进入按钮区域，也不会有任何的效果
         -->
        <el-button type="primary" @click="buttonHandle" @mouseenter.native="buttonHandle">
            我是按钮
        </el-button>

        <el-tag>我是标签</el-tag>
    </div>
</template>

<script>
export default {
    methods: {
        buttonHandle() {
            this.$message.success('哇咔咔')
        }
    }
}
</script>