<template>
  <div class="vote-box">
    <div class="header">
      <h2 class="title">Vue真的很好学~</h2>
      <span class="num">{{ obj.x + obj.y }}人</span>
    </div>
    <vote-main />
    <vote-footer />
  </div>
</template>

<script>
import VoteMain from "./VoteMain.vue"
import VoteFooter from "./VoteFooter.vue"

export default {
  inject: ['obj'],
  components: {
    VoteMain,
    VoteFooter
  }
}
</script>

<style lang="less" scoped>
.vote-box {
  box-sizing: border-box;
  margin: 20px auto;
  padding: 10px;
  width: 300px;
  border: 1px solid #ddd;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 18px;
      line-height: 40px;
    }

    .num {
      font-size: 20px;
      color: rgb(239, 88, 88);
    }
  }
}
</style>