<script>
export default {
    data() {
        return {
            content: ''
        }
    },
    methods: {
        handle() {
            console.log(this.content)
        }
    }
}
</script>

<template>
    <div>
        <quill-editor v-model="content" />
        <el-button type="primary" @click="handle">按钮</el-button>
    </div>
</template>

<style lang="less" scoped>
.quill-editor {
    width: 800px;
}
</style>