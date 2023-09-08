<template>
  <div class="itemBox">
    <div class="content">
      <input
        type="text"
        class="textInp"
        v-model.trim="text"
        v-show="isUpdate"
      />
      <span class="textCon" v-show="!isUpdate">{{ text }}</span>
    </div>
    <div class="handle">
      <button class="delete" @click="deleteInfo">删除</button>
      <button class="update" @click="updateInfo">
        {{ isUpdate ? "确定" : "修改" }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListItem",
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  data() {
    let { text } = this.item;
    return {
      isUpdate: false,
      text,
    };
  },
  methods: {
    /* 修改信息 */
    updateInfo() {
      this.isUpdate = !this.isUpdate;
      if (!this.isUpdate) {
        if (this.text === "") {
          alert("输入的内容不能为空!");
          this.isUpdate = true;
          return;
        }
        this.$emit("change", {
          id: this.item.id,
          text: this.text,
          type: "update",
        });
      }
    },
    /* 删除信息 */
    deleteInfo() {
      let flag = confirm("您确定要删除本条信息吗？");
      if (!flag) return;
      this.$emit("change", {
        id: this.item.id,
        type: "delete",
      });
    },
  },
};
</script>

<style lang="less" scoped>
.itemBox {
  margin: 15px 0;

  .content {
    margin-bottom: 5px;

    .textCon {
      line-height: 30px;
    }
  }

  .handle {
    button {
      margin-right: 10px;
    }
  }
}
</style>