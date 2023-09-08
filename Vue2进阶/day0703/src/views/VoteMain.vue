<template>
  <div class="vote-main">
    <p>支持人数：{{ supNum }} 人</p>
    <p>反对人数：{{ oppNum }} 人</p>
    <p>支持比率：{{ ratio }}</p>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  computed: {
    ...mapState(['supNum', 'oppNum']),
    ...mapGetters(['ratio'])
  }
}
</script>

<style lang="less" scoped>
.vote-main {
  p {
    padding: 5px;
    line-height: 34px;
    font-size: 16px;
  }
}
</style>