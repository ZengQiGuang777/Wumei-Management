<template>
    <div class="demo-box" v-html="body">

    </div>
</template>

<script>
export default {
    data() {
        return {
            body: `<a href="#">珠峰培训</a><button onclick="alert('我是病毒')">哈哈哈</button>呵呵呵`
        }
    }
}
</script>