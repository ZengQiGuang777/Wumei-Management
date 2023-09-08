<!-- 
<template>
    <div class="box">
        <h2 class="title" id="title" ref="titleBox" @click="handle">我是标题</h2>
        <ul class="list">
            <li class="item" v-for="item in list" :key="item.id">
                {{ item.text }}
            </li>
        </ul>
        <el-button type="primary" :round="true">哈哈哈</el-button>
    </div>
</template>
 -->

<script>


export default {
    name: "Demo",
    data() {
        return {
            title: 'Vue视图构建语法',
            level: 1
        }
    },
    /*
     https://v2.cn.vuejs.org/v2/guide/render-function.html
     render函数：基于JSX语法构建视图 
       + h：createElement
     */
    render(h) {
        return h(
            `h${this.level}`,
            {
                style: {
                    color: 'red'
                }
            },
            [
                this.title,
                h('span', {}, [100]),
                h(
                    'el-button',
                    {
                        props: {
                            type: 'primary'
                        }
                    }
                    ,
                    ['哈哈']
                )
            ]
        )
    }
}
</script>