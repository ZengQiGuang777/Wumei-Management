(function () {
    // 检测是否为纯粹的对象
    const toString = Object.prototype.toString
    const isPlainObject = function isPlainObject(obj) {
        if (toString.call(obj) !== "[object Object]") return false
        let proto = Object.getPrototypeOf(obj)
        if (!proto) return true
        let Ctor = 'constructor' in obj && obj.constructor
        return Ctor === Object
    }

    /* 核心代码 */
    class Slide {
        constructor(container, { back, total, column, progress }) {
            // 获取需要的元素
            this.container = container
            this.progress = container.querySelector('.zfslide-progress')
            if (!this.progress) {
                throw new TypeError('缺少幻灯片图层「样式类：zfslide-progress」')
            }
            // 动态创建进度条
            if (progress) {
                let div = document.createElement('div')
                div.className = 'zfslide-bar'
                div.innerHTML = `<div class="zfslide-all">
                    <div class="zfslide-already"></div>
                </div>`
                this.progress.appendChild(div)
            }
            this.already = this.progress.querySelector('.zfslide-already')

            // 初始化样式和数据
            this.W = container.offsetWidth
            this.H = container.offsetHeight
            this.column = +column  //每一行展示的数量
            this.total = +total  //总图片数量
            this.back = back  //背景图地址
            this.init()

            // 事件绑定
            container.addEventListener('mouseenter', this.computed.bind(this))
            container.addEventListener('mousemove', this.computed.bind(this))
        }
        init() {
            let { progress, already, back, W, column, total, H } = this
            if (already) already.style.width = '0%'
            progress.style.cssText = `
                background: url(${back}) no-repeat;
                background-size: ${W * column}px ${Math.ceil(total / column) * H}px;
                background-position: 0 0;
            `
        }
        computed(ev) {
            let { container, already, progress, W, H, total, column } = this
            // 计算鼠标距离盒子左边的百分比
            let l = ev.clientX - container.getBoundingClientRect().left,
                ratio = l / W
            ratio = ratio < 0 ? 0 : (ratio > 1 ? 1 : ratio)

            // 控制进度条的样式
            if (already) already.style.width = `${ratio * 100}%`

            // 计算出当前应该展示哪一张
            let N = Math.round(total * ratio)
            N = N < 1 ? 1 : (N > total ? total : N)

            // 计算出这一张在第x列和y行
            let y = Math.ceil(N / column)
            let x = N % column
            x = x === 0 ? column : x

            // 控制背景图的位置
            progress.style.backgroundPosition = `${-(x - 1) * W}px ${-(y - 1) * H}px`
        }
    }

    /* 暴露API */
    const zfslide = function zfslide(selector, options) {
        // 如果你传递的是一个选择器：我们基于选择器，获取相应的元素
        if (typeof selector === "string") selector = document.querySelector(selector)
        // 确保容器的正确性
        if (!selector || selector.nodeType !== 1) {
            throw new TypeError(`指定的容器不存在`)
        }
        // 处理配置项
        if (!isPlainObject(options)) options = {}
        options = Object.assign({
            back: '',
            total: 0,
            column: 10,
            progress: true
        }, options)
        // 确保背景图和数量是存在的
        if (!options.back || options.total === 0) {
            throw new TypeError(`请先指定幻灯片背景图和数量`)
        }
        return new Slide(selector, options)
    }
    if (typeof window !== "undefined") window.zfslide = zfslide
    if (typeof module === "object" && typeof module.exports === "object") module.exports = zfslide
})();