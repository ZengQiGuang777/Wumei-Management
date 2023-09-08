<script>
import MapBaidu from './particle/Map.vue'
import Device from './particle/Device.vue'
import News from './particle/News.vue'
import * as echarts from 'echarts'

export default {
    name: 'IndexWelcome',
    components: {
        MapBaidu,
        Device,
        News
    },
    data() {
        return {
            mqtt: null,
            cpuData: [],
            memoryData: [],
            systemData: []
        }
    },
    methods: {
        /* MQTT相关的操作 */
        formatValue(val) {
            return (val / 10000).toFixed(2)
        },
        async initMqttData() {
            try {
                let { code, data } = await this.$API.queryBashBoardStats()
                if (+code === 200) {
                    Object.keys(data).forEach(key => {
                        if (/_total$/.test(key)) {
                            data[key] = this.formatValue(data[key])
                        }
                    })
                    this.mqtt = Object.freeze(data)
                    this.drawBarImage()
                }
            } catch (_) { }
        },
        drawBarImage() {
            let { connection_count, connection_total, retain_count, retain_total, session_count, session_total, subscription_count, subscription_total } = this.mqtt
            let chart = echarts.init(this.$refs.mqttBox)
            let option = {
                title: {
                    text: 'MQTT状态数据统计'
                },
                legend: {},
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    },
                    formatter: '{b} <br/> {a0} : {c0}万 <br/> {a1} : {c1}'
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                yAxis: [
                    {
                        type: 'category',
                        data: ['连接数量', '会话数量', '订阅数量', '路由数量', '保留消息']
                    }
                ],
                xAxis: [
                    {
                        type: 'value',
                        axisLabel: {
                            formatter: "{value} 万"
                        }
                    }
                ],
                series: [
                    {
                        name: '总数量',
                        type: 'bar',
                        data: [connection_total, session_total, subscription_total, retain_total, retain_total]
                    },
                    {
                        name: '当前数量',
                        type: 'bar',
                        data: [connection_count, session_count, subscription_count, retain_count, retain_count]
                    }
                ]
            }
            chart.setOption(option)
        },
        /* 饼状图相关的操作 */
        async initPieData() {
            try {
                let { code, data } = await this.$API.queryMonitorServer()
                if (+code === 200) {
                    let {
                        cpu: { free, sys, used },
                        mem: { free: memFree, used: memUsed },
                        sysFiles: [{ free: sysFree, used: sysUsed }]
                    } = data

                    this.cpuData = Object.freeze([
                        { name: '系统', value: sys },
                        { name: '用户', value: used },
                        { name: '空闲', value: free }
                    ])

                    this.memoryData = Object.freeze([
                        { name: '用户', value: memUsed },
                        { name: '空闲', value: memFree }
                    ])

                    this.systemData = Object.freeze([
                        { name: '用户', value: parseFloat(sysUsed) },
                        { name: '空闲', value: parseFloat(sysFree) }
                    ])
                }
            } catch (_) { }
        }
    },
    created() {
        this.initMqttData()
        this.initPieData()
    },
    activated() {
        console.log('哈哈哈')
    },
    deactivated() {
        console.log('呜呜呜')
    }
}
</script>

<template>
    <div class="welcome-box">
        <div class="content">
            <MapBaidu class="map" />
            <div class="statistics">
                <Device class="device" />
                <News class="news" />
            </div>
        </div>
        <div class="echarts-box">
            <div class="mqtt" ref="mqttBox"></div>
            <DrawPieImage class="cup-rate" title="CPU使用率(%)" :data="cpuData" />
            <DrawPieImage class="memory-rate" title="内存使用率(GB)" :data="memoryData" />
            <DrawPieImage class="system-rate" title="系统盘使用率(GB)" :data="systemData" />
            <div class="seat"></div>
        </div>
    </div>
</template>

<style lang="less" scoped>
.content {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;

    .map {
        box-sizing: border-box;
        margin-right: 20px;
        width: calc((100% - 20px) / 2);
        height: 600px;
        background: url('@/assets/images/Loading_icon.gif') no-repeat center center #FFF;
        background-size: 30px 30px;
        border: 2px solid #FFF;
    }

    .statistics {
        box-sizing: border-box;
        width: calc((100% - 20px) / 2);

        .device,
        .news {
            box-sizing: border-box;
            padding: 15px;
            height: 290px;
            background: #FFF;
            overflow: hidden;
        }

        .news {
            margin-top: 20px;
        }
    }
}

.echarts-box {
    margin-top: 20px;
    padding: 20px 15px;
    padding-bottom: 0;
    background: #FFF;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    @w: calc((100% - 40px) / 3);

    &>div {
        flex-basis: @w;
        height: 350px;
        margin-bottom: 20px;
        background: url('@/assets/images/Loading_icon.gif') no-repeat center center #f9f9f9;
        background-size: 30px 30px;

        :deep(div) {
            background: #FFF;
        }

        &.mqtt {
            flex-basis: calc(@w * 2 + 20px);
        }

        &.seat {
            background: #FFF;
        }
    }
}
</style>