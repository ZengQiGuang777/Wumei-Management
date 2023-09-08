<script>
import * as echarts from 'echarts'

export default {
    name: 'DrawPieImage',
    props: {
        title: {
            required: true,
            type: String
        },
        data: {
            required: true,
            type: Array
        }
    },
    methods: {
        draw() {
            let chart = echarts.init(this.$refs.pieBox)
            let option = {
                title: {
                    text: this.title,
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'vertical',
                    left: 'left'
                },
                series: [
                    {
                        name: this.title,
                        type: 'pie',
                        radius: '50%',
                        data: this.data,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            }
            chart.setOption(option)
        }
    },
    watch: {
        data: {
            immediate: true,
            deep: true,
            handler() {
                if (this.data.length > 0) {
                    this.draw()
                }
            }
        }
    }
}
</script>

<template>
    <div ref="pieBox"></div>
</template>