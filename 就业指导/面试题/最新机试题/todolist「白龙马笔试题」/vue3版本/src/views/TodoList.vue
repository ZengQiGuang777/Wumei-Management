<script setup>
import ListItem from '../components/ListItem.vue';
import { reactive } from 'vue';

/* 创建本地存储，保存任务数据 */
const store = {
    get() {
        let data = localStorage.getItem('totoList'),
            value = [];
        if (data) {
            data = JSON.parse(data);
            if ((+new Date() - data.time) <= 24 * 60 * 60 * 1000) {
                value = data.value;
            }
        }
        return value;
    },
    set() {
        let data = {
            time: +new Date(),
            value: state.list
        };
        localStorage.setItem('totoList', JSON.stringify(data));
    }
};

/* 定义状态 */
const state = reactive({
    list: store.get(),
    text: ''
});

/* 新增任务 */
const submit = () => {
    if (state.text === '') {
        alert('请先输入内容！');
        return;
    }
    state.list.push({
        id: +new Date(),
        text: state.text
    });
    state.text = '';
    store.set();
};

/* 子组件触发改变 */
const change = ({ id, text, type }) => {
    // 修改
    if (type === 'update') {
        state.list = state.list.map(item => {
            if (+item.id === +id) {
                item.text = text;
            }
            return item;
        });
        store.set();
        return;
    }
    // 删除
    state.list = state.list.filter(item => {
        return +item.id !== +id;
    });
    store.set();
};
</script>

<template>
    <div class="todoBox">
        <div class="handle">
            <input type="text" class="textInp" v-model.trim="state.text">
            <button class="createBtn" @click="submit">新建任务</button>
        </div>
        <ListItem v-for="item in state.list" :key="item.id" :item="item" @change="change" />
    </div>
</template>

<style lang="less" scoped>
.todoBox {
    box-sizing: border-box;
    margin: 20px auto;
    padding: 10px;
    width: 400px;
    border: 1px solid #DDD;

    .handle {
        padding-bottom: 10px;
        border-bottom: 1px dashed #DDD;

        .createBtn {
            margin-left: 20px;
            background: #93d5ed;
            border-color: #8bd5f0;
        }
    }
}
</style>