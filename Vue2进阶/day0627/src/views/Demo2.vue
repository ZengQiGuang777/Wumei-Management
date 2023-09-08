<template>
    <div class="demo-box">
        父组件
        <Child class="clearfix" style="color: red;" :x.sync="num" title="哈哈哈" :bool="true" :info="{ name: '哇咔咔' }"
            @click.native="handle" @close="handle" />
    </div>
</template>

<script>
import Child from '@/views/Child.vue'
export default {
    components: {
        Child
    },
    data() {
        return {
            num: 10
        }
    },
    methods: {
        handle(val) {
            console.log('父组件中：', val)
            return '呵呵'
        }
    }
}
</script>