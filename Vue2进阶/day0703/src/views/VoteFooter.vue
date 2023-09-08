<template>
  <div class="vote-footer">
    <div class="item">
      <el-button type="primary" @click="handle(true)">同步支持</el-button>
      <el-button type="danger" @click="handle(false)">同步反对</el-button>
    </div>
    <div class="item">
      <button-again type="primary" plain @click="handleAsync(true)">异步支持</button-again>
      <button-again type="danger" plain @click="handleAsync(false)">异步反对</button-again>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'
// 基于这两个辅助函数，把mutations/actions中写的方法，都作为组件私有的方法「写在methods中的」

export default {
  methods: {
    ...mapMutations(['changeNum']),
    ...mapActions(['changeNumAsync']),
    /* 
     // 上述操作的处理原理
     ...{
      changeNum(payload){
        this.$store.commit('changeNum',payload)
      }
     },
     ...{
      changeNumAsync(payload){
        return this.$store.dispatch('changeNumAsync',payload)
      }
     }
     */
    handle(isSup) {
      // this.$store.commit('changeNum', { isSup })
      this.changeNum({ isSup })
    },
    async handleAsync(isSup) {
      /* await this.$store.dispatch('changeNumAsync', {
        isSup,
        step: 10
      }) */
      await this.changeNumAsync({
        isSup,
        step: 10
      })
      // ...
    }
  }
}
</script>

<style lang="less" scoped>
.vote-footer {
  .item {
    margin-bottom: 10px;

    &:nth-last-child(1) {
      margin-bottom: 0;
    }
  }

  .el-button {
    margin-right: 10px;
  }
}
</style>