<template>
    <div>
        我是父组件 {{ num }}
        <br><br>
        <B :x.sync="num" />
        <!-- <B :x="num" @update:x="num = $event" /> -->

        <!-- 
            <B v-model="num" />
            model:{
                prop:'x',
                event:'update'
            }
        -->
    </div>
</template>

<script>
import B from './B.vue'
export default {
    components: {
        B
    },
    data() {
        return {
            num: 100
        }
    }
}
</script>