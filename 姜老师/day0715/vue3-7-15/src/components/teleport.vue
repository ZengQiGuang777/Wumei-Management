<template>
  <!-- 编写弹框组件比较合适, 但是一般场景用不到 this.$dialog()  this.$toast()  服务调用-->
  <button @click="changeDisplay">显示弹框</button>
  <Teleport to="#root" v-if="isShow">
    这是一个他框组件  
    <button @click="changeDisplay">关闭按钮</button>
  </Teleport>  
</template>


<script>
export default {
  data() {
    return {isShow:false}
  },
  methods: {
    changeDisplay(){this.isShow = !this.isShow}
  }
}
</script>