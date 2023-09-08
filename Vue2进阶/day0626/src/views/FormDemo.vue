<template>
    <div class="demo">
        <!-- 文本框/文本域 -->
        <div>
            基于 v-model 处理：
            <br>
            <input type="text" v-model.lazy.trim.number="text">
            <br>
            <span>{{ text }}</span>

            <br>
            <br>

            如果没有 v-model：
            <br>
            <input type="text" :value="text2" @change="handle">
            <br>
            <span>{{ text2 }}</span>
        </div>

        <!-- 单选按钮 -->
        <div>
            性别：
            <input type="radio" :value="0" v-model="sex">男
            <input type="radio" :value="1" v-model="sex">女
            <br>
            <span>我们当前选中的是：{{ sex === 0 ? '男' : '女' }}</span>
        </div>

        <!-- 复选按钮 -->
        <div>
            <input type="checkbox" v-model="remember"> 记住账号密码
            <br>
            <span>{{ remember }}</span>

            <br>
            <br>

            <input type="checkbox" value="music" v-model="hobby">唱歌
            <input type="checkbox" value="jump" v-model="hobby">跳舞
            <input type="checkbox" value="kunkun" v-model="hobby">坤拳
            <br>
            <span>{{ hobby }}</span>
        </div>

        <!-- 下拉框 -->
        <div>
            <select :value="city" @change="city = $event.target.value">
                <option value="">全部</option>
                <option value="北京">北京</option>
                <option value="上海">上海</option>
                <option value="深圳">深圳</option>
            </select>
            <br>
            <span>{{ city }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FormDemo',
    data() {
        return {
            text: '',
            text2: '',
            sex: 0,
            remember: true,
            hobby: ['kunkun'],
            city: ''
        }
    },
    methods: {
        handle(ev) {
            let val = ev.target.value.trim()
            let temp = parseFloat(val)
            temp = isNaN(temp) ? val : temp
            this.text2 = temp
        },
        test(ev) {
            console.log(ev)
        }
    }
}
</script>

<style lang="less" scoped>
.demo {
    &>div {
        margin-top: 20px;
        background: rgb(231, 245, 245);
    }
}
</style>