<template>
    <a-menu theme="dark" mode="inline" :default-selected-keys="['1']" @click="handle">
        <a-menu-item key="/home/index">
            <a-icon type="bank" />
            <span>首页</span>
        </a-menu-item>

        <a-sub-menu>
            <span slot="title">
                <a-icon type="tool" />
                <span>设备管理</span>
            </span>
            <a-menu-item key="/home/iot/template">
                <a-icon type="code-sandbox" />
                通用物模型
            </a-menu-item>
            <a-menu-item key="/home/iot/category">
                <a-icon type="cluster" />
                产品分类
            </a-menu-item>
            <a-menu-item key="iot_product">
                产品管理
            </a-menu-item>
            <a-menu-item key="iot_group">
                设备分组
            </a-menu-item>
            <a-menu-item key="iot_device">
                设备管理
            </a-menu-item>
            <a-menu-item key="iot_alertLog">
                设备告警
            </a-menu-item>
            <a-menu-item key="iot_scene">
                场景联动
            </a-menu-item>
            <a-menu-item key="iot_sip">
                视频配置
            </a-menu-item>
        </a-sub-menu>
        <a-menu-item key="">
            <a-icon type="cluster" />
            <span>运维管理</span>
        </a-menu-item>
        <a-menu-item key="4">
            <a-icon type="appstore" />
            <span>系统管理</span>
        </a-menu-item>
        <a-menu-item key="5">
            <a-icon type="hourglass" />
            <span>Netty管理</span>
        </a-menu-item>
        <a-menu-item key="6">
            <a-icon type="video-camera" />
            <span>系统监控</span>
        </a-menu-item>
        <a-menu-item key="7">
            <a-icon type="database" />
            <span>系统工具</span>
        </a-menu-item>
        <a-menu-item key="8">
            <a-icon type="desktop" />
            <span>大屏展示</span>
        </a-menu-item>
        <a-menu-item key="9">
            <a-icon type="play-square" />
            <span>可视化平台</span>
        </a-menu-item>
        <a-menu-item key="10">
            <a-icon type="dropbox" />
            <span>蜂信物联</span>
        </a-menu-item>
    </a-menu>
</template>

<script>
import Iot from '@/views/iot'
export default {
    components: {
        Iot
    },
    data() {
        return {

        }
    },
    methods: {
        handle({ key }) {
            this.$router.push(key)
        },
        ontitleClick({ key, domEvent }) {
            console.log({ key, domEvent });
            this.$router.push({ name: key })
        }

    }
}
</script>

<style lang="less" scoped></style>