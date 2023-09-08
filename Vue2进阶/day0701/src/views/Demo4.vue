<script>
export default {
    name: "Demo",
    data() {
        return {
            title: 'Vue视图构建语法',
            level: 1
        }
    },
    methods: {
        handle() {
            this.level = 2
        }
    },
    render(h) {
        let styObj = {
            color: 'red'
        }
        return h(
            `h${this.level}`,
            { style: styObj },
            [
                this.title,
                // https://github.com/vuejs/jsx-vue2
                <span vOn:click={this.handle}>100</span>,
                <el-button type="primary">哈哈哈</el-button>
            ]
        )
    }
}
</script>