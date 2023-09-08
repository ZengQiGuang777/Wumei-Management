// 第一个
/* 
const handle = function handle(nums, k) {
    let temp = []
    // 外层：从第一项开始循环
    for (let i = 0; i < nums.length; i++) {
        let item = nums[i]
        // 如果当前项，本身就大于等于K，那这一项就是最短的情况（长度为1），后续所有操作都结束
        if (item >= k) return 1
        // 里层：从当前项后一项开始循环，逐一累加
        for (let j = i + 1; j < nums.length; j++) {
            let next = nums[j]
            item += next
            if (item >= k) {
                temp.push(j - i + 1) // 把本次符合条件的长度先存储起来
                break
            }
        }
    }
    // 如果temp中一项都没存，说明没有符合条件的
    if (temp.length === 0) return -1
    return Math.min(...temp)
}
let arr = [10, 26, 32, 12, 8, 20]
let k = 20
console.log(handle(arr, k)) 
*/

// 第二个:返回k
const handle = function handle(nums) {
    let obj = {}
    let len = nums.length
    let max = 0  //假设这是最高分
    let index = -1 //假设这是最小的k
    // 如果需要处理的数组是空或者只有一项，则直接比
    if (len === 0) return -1
    if (len === 1) return nums[0] <= 0 ? 0 : -1
    // 选取有效的K「0~最大索引」
    for (let k = 0; k < len; k++) {
        // 把数组按照K进行反转
        let convert = [...nums]
        if (k > 0) {
            let res = convert.splice(0, k)
            convert = convert.concat(res)
        }
        // 对反转后的数组进行求分
        let sum = 0
        for (let i = 0; i < convert.length; i++) {
            let item = convert[i]
            if (item <= i) {
                // 当前项比索引小(或者等于)，则加一分
                sum++
            }
        }
        obj[k] = sum
        //新算出来的值大于假设的值，那么假设值就要变了
        if (sum > max) {
            max = sum
            index = k //记录当时出现最高分时候的k，也就是我们期望的最小k
        }
    }
    return index
}
console.log(handle([2, 4, 6, 3, 0]))