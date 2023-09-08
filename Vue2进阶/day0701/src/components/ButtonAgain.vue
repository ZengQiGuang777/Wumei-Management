<script>
export default {
    name: "ButtonAgain",
    inheritAttrs: false,
    data() {
        return {
            loading: false
        }
    },
    methods: {
        async handle(ev) {
            this.loading = true
            try {
                await this.$listeners.click(ev)
            } catch (err) {
                console.log('ButtonAgain Error：', err.message)
            }
            this.loading = false
        }
    },
    mounted() {
        this.ElButtonIns = this.$refs.child
    },
    render() {
        // 传递属性的筛选
        let attrs = {},
            area = ['type', 'size', 'icon', 'nativeType', 'disabled', 'plain', 'autofocus', 'round', 'circle']
        Object.keys(this.$attrs).forEach(key => {
            if (!area.includes(key)) return
            attrs[key] = this.$attrs[key]
        })

        return <el-button {...{ attrs }}
            loading={this.loading}
            vOn:click={this.handle}
            ref="child">
            {this.$slots.default}
        </el-button>
    }
}
</script>

<style lang="less" scoped></style>