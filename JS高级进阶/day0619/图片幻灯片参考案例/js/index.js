// 获取元素距离Body的偏移值
const offset = function offset(elem) {
    let l = null,
        t = null,
        parent = elem.offsetParent
    l += elem.offsetLeft
    t += elem.offsetTop
    while (parent) {
        l += parent.clientLeft + parent.offsetLeft
        t += parent.clientTop + parent.offsetTop
        parent = parent.offsetParent
    }
    return {
        left: l,
        top: t
    }
}

const slideBox = document.querySelector('.slideBox'),
    slide = slideBox.querySelector('.slide'),
    progress = slideBox.querySelector('.progress i')
let W = slideBox.offsetWidth,
    H = slideBox.offsetHeight,
    total = 46,
    offsetObj = offset(slideBox)
slide.addEventListener('mousemove', function (ev) {
    let A = ev.pageX - offsetObj.left, //鼠标距离盒子左边框的距离
        ratio = A / W,  //此距离的占比
        current = Math.round(total * ratio) //计算应该展示第几张
    current = current < 1 ? 1 : (current > total ? total : current) //边界处理

    // 算出它在第N行/第M列
    let n = Math.ceil(current / 10),
        m = current % 10
    m === 0 ? m = 10 : null

    // 修改对应的样式
    progress.style.width = ratio * 100 + '%'
    slide.style.backgroundPosition = `${-(m - 1) * W}px ${-(n - 1) * H}px`
})