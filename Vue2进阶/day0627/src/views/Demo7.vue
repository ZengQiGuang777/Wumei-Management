<template>
    <div :class="sty.demo">
        <h2 :class="sty.title">哈哈哈</h2>
        <el-button type="danger" :class="sty.button">呵呵呵</el-button>
    </div>
</template>

<script>
import sty from './demo.module.css'

export default {
    data() {
        return {
            sty
        }
    }
}
</script>