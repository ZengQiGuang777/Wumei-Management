<script setup>
import { reactive } from 'vue';

/* 接收属性 */
const props = defineProps({
    item: {
        required: true,
        type: Object
    }
});

/* 接收自定义事件 */
const emit = defineEmits(['change']);

/* 定义状态 */
const { text, id } = props.item;
const state = reactive({
    isUpdate: false,
    text: text
});

/* 修改信息 */
const updateInfo = () => {
    state.isUpdate = !state.isUpdate;
    if (!state.isUpdate) {
        if (state.text === '') {
            alert('输入的内容不能为空!');
            state.isUpdate = true;
            return;
        }
        emit('change', {
            id,
            text: state.text,
            type: 'update'
        });
    }
};

/* 删除信息 */
const deleteInfo = () => {
    let flag = confirm('您确定要删除本条信息吗？');
    if (!flag) return;
    emit('change', {
        id,
        type: 'delete'
    });
};
</script>

<template>
    <div class="itemBox">
        <div class="content">
            <input type="text" class="textInp" v-model.trim="state.text" v-show="state.isUpdate">
            <span class="textCon" v-show="!state.isUpdate">{{ state.text }}</span>
        </div>
        <div class="handle">
            <button class="delete" @click="deleteInfo">删除</button>
            <button class="update" @click="updateInfo">{{ state.isUpdate ? '确定' : '修改' }}</button>
        </div>
    </div>
</template>

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