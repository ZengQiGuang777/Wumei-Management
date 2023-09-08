<script>
export default {}
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
@import './assets/reset.min.css';

html,
body,
#app {
  height: 100%;
  font-size: 14px;
  overflow: hidden;
}

#app {
  background: rgb(248, 248, 248);
}

* {
  border-radius: 0 !important;
}

/* 修改滚动条的样式 */
.scrollActive {

  &::-webkit-scrollbar {
    width: 2px;
    height: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0);
  }

  &:hover {
    &::-webkit-scrollbar-thumb {
      background: #96969748;
    }
  }
}

/* 全局Loading */
.el-loading-mask {
  .el-icon-loading {
    font-size: 30px;
  }
}

/* 百度地图提示框 */
.map-device-info {
  font-size: 16px;

  p {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    line-height: 30px;
    font-size: 14px;
    margin-bottom: 0;

    span {
      color: #36a3f7;
    }
  }
}
</style>