<script>
import MenuLayout from './MenuLayout.vue'
import HeaderLayout from './HeaderLayout.vue'

export default {
    components: {
        MenuLayout,
        HeaderLayout
    },
    data() {
        return {
            collapsed: true
        }
    }
}
</script>

<template>
    <div class="basic-layout">
        <div :class="{
            'sider-box': true,
            'collapsed': collapsed
        }">
            <div class="logo-box">
                <img src="@/assets/images/logo.gif" alt="">
                <span>物联网系统</span>
            </div>
            <MenuLayout :collapsed="collapsed" />
        </div>
        <div class="con-right">
            <HeaderLayout :collapsed.sync="collapsed" />
            <div class="content scrollActive">
                <router-view />
            </div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.basic-layout {
    display: flex;
    height: 100%;
    overflow: hidden;

    .sider-box {
        flex-shrink: 0;
        box-sizing: border-box;
        width: 200px;
        height: 100%;
        background: #304156;
        transition: width .1s;

        .logo-box {
            box-sizing: border-box;
            padding: 5px 15px;
            height: 50px;
            line-height: 40px;
            overflow: hidden;

            img {
                margin-right: 5px;
                vertical-align: middle;
                width: 40px;
                height: 40px;
            }

            span {
                display: inline-block;
                vertical-align: middle;
                font-size: 20px;
                font-weight: lighter;
                color: #FFF;
                letter-spacing: 2px;
            }
        }

        &.collapsed {
            width: 66px;

            .logo-box {
                padding: 5px 0;
                text-align: center;

                img {
                    margin-right: 0;
                    vertical-align: top;
                }

                span {
                    display: none;
                }
            }
        }
    }

    .con-right {
        flex-grow: 1;

        .content {
            box-sizing: border-box;
            margin: 10px;
            height: calc(100vh - 100px);
            overflow-x: hidden;
            overflow-y: auto;
        }
    }
}
</style>