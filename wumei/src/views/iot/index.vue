<template>
    <div class="demo-box">
        <IotTemplate />
        <iotCategory />
    </div>
</template>

<script>
import IotTemplate from './iot-template.vue';
import iotCategory from './iot-category.vue';
export default {
    name: "index",
    components:{
        IotTemplate,
        iotCategory,
    },
    data() {
        return {

        }
    },
    methods: {

    }   
}
</script>

<style lang="less" scoped>

</style>