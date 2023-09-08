<template>
  <div class="vote-box">
    <div class="header">
      <h2 class="title">Vue真的很好学~</h2>
      <span class="num">{{ AA + BB }}人</span>
    </div>
    <vote-main />
    <vote-footer />
  </div>
</template>

<script>
import VoteMain from "./VoteMain.vue"
import VoteFooter from "./VoteFooter.vue"
import { mapState } from 'vuex'
// 基于map辅助函数，可以简化vuex在组件中的使用：mapState/mapGetters，我们会把需要的公共状态和计算属性，赋值给组件私有的计算属性「目的：当公共状态改变，让计算属性重新计算，实时渲染最新的效果」

export default {
  computed: {
    // ...mapState(['supNum', 'oppNum']),
    /*
    // 底层处理原理
    ...{
      supNum() {
        return this.$store.state.supNum
      },
      oppNum() {
        return this.$store.state.oppNum
      }
    }
    */
    ...mapState({
      AA: 'supNum',
      BB(state) {
        return state.oppNum
      }
    })
  },
  components: {
    VoteMain,
    VoteFooter
  }
}
</script>

<style lang="less" scoped>
.vote-box {
  box-sizing: border-box;
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 20px;
      line-height: 40px;
    }

    .num {
      font-size: 20px;
      color: rgb(239, 88, 88);
    }
  }
}
</style>