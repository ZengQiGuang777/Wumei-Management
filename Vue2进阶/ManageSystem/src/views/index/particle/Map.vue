<script>
// https://lbsyun.baidu.com/index.php
export default {
    methods: {
        // 绘制高亮选中的点
        createPoint(map, { lan, lat, item }) {
            // 绘制坐标点
            let point = new BMapGL.Point(lan, lat)
            let marker = new BMapGL.Marker3D(point, 0, {
                size: 18,
                shape: 1,
                fillColor: '#34bfa3',
                fillOpacity: .8
            })
            map.addOverlay(marker)
            // 详细信息
            let info = new BMapGL.InfoWindow(
                `<div class="map-device-info">
                    <p>设备名称：<span>${item.deviceName}</span></p>
                    <p>设备编号：${item.serialNumber}</p>
                    <p>所在地址：${item.networkAddress}</p>
                </div>`,
                {
                    width: 200,
                    height: 100,
                    title: `<h2 class="map-device-info">设备详细信息</h2>`
                }
            )
            marker.addEventListener("click", () => map.openInfoWindow(info, point))
        }
    },
    async created() {
        // 第一次渲染之前，从服务器获取标注点的数据
        try {
            let { code, rows } = await this.$API.queryDeviceAll()
            if (+code === 200 && this.map) {
                // 按照获取的数据，循环创建标注点
                rows.forEach(item => {
                    this.createPoint(this.map, {
                        lan: item.longitude,
                        lat: item.latitude,
                        item
                    })
                })
            }
        } catch (_) { }
    },
    mounted() {
        const mapBox = this.$refs.mapBox
        this.map = new BMapGL.Map(mapBox)  // 创建地图实例 
        let point = new BMapGL.Point(103.38861, 35.86166)  // 创建点坐标 
        this.map.centerAndZoom(point, 5) // 初始化地图，设置中心点坐标和地图级别
        this.map.enableScrollWheelZoom(true)  //开启鼠标滚轮缩放    
    }
}
</script>

<template>
    <div class="map-box" ref="mapBox"></div>
</template>

<style lang="less" scoped></style>