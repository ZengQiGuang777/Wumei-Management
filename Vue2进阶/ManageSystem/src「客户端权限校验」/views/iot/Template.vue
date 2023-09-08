<script>
import dayjs from 'dayjs'
import * as xlsx from 'xlsx'

export default {
    data() {
        return {
            // 相关类别的全部数据
            iotThingsList: [],
            iotDataList: [],
            // 筛选区域需要的状态
            filter: {
                templateName: '',
                type: ''
            },
            // 分页相关的状态
            page: {
                pageNum: 1,
                pageSize: 10,
                total: 0
            },
            // 表格相关的状态
            table: {
                data: [],
                loading: false
            },
            selections: [],
            // 弹出层相关的状态
            dialogVisible: false,
            templateId: null,
            // 表单相关的状态和校验规则
            ruleForm: {
                templateName: '',
                identifier: '',
                modelOrder: 0,
                type: '属性',
                isList: ['图表展示', '只读数据', '实时监测', '历史存储'],
                datatype: 'integer',
                min: 0,
                max: 100,
                unit: '米',
                step: 0
            },
            rules: {
                templateName: [{ required: true, message: '模型名字是必填项', trigger: 'blur' }],
                identifier: [{ required: true, message: '模型标识是必填项', trigger: 'blur' }],
                modelOrder: [{ required: true, message: '模型排序是必填项', trigger: 'blur' }],
                isList: [{ required: true, message: '至少选择一个特性', trigger: 'change' }]
            }
        }
    },
    methods: {
        // 获取物模型全部类别
        async queryIotThingsList() {
            let arr = await this.$API.iot.queryIotThingsType()
            this.iotThingsList = Object.freeze(arr)
        },
        // 获取全部的数据类别
        async queryIotDataList() {
            let arr = await this.$API.iot.queryIotDataType()
            this.iotDataList = Object.freeze(arr)
        },
        // 获取物模型列表数据
        async initData() {
            this.table.loading = true
            let { page: { pageNum, pageSize }, filter: { templateName, type } } = this
            try {
                let { code, rows, total } = await this.$API.iot.queryTemplateList({
                    pageNum,
                    pageSize,
                    templateName,
                    type
                })
                if (+code !== 200) {
                    rows = []
                    total = 0
                }
                // 获取数据的二次格式化处理
                rows = rows.map(item => {
                    try {
                        item.specs = JSON.parse(item.specs)
                    } catch (_) {
                        item.specs = {}
                    }
                    return item
                })
                this.page.total = total
                this.table.data = Object.freeze(rows)
            } catch (_) { }
            this.table.loading = false
        },
        // 格式化表格列中的数据
        formatterWhether(row, column, cellValue) {
            return +cellValue === 0 ? '否' : '是'
        },
        formatterThingsType(row) {
            let { type } = row
            let item = this.iotThingsList.find(item => +item.value === +type)
            if (!item) return null
            // formatter函数可以返回基于JSX语法构建的视图
            return <el-tag type={item.class}>
                {item.label}
            </el-tag>
        },
        formatterDataType({ datatype }) {
            let item = this.iotDataList.find(item => item.value === datatype)
            return !item ? null : item.label
        },
        formatterTime({ createTime }) {
            return dayjs(createTime).format('YYYY-MM-DD')
        },
        // 触发修改操作
        async triggerUpdate(row) {
            let { templateId, templateName, identifier, modelOrder, type, isChart, isHistory, isMonitor, isReadonly, datatype, specs } = row
            this.dialogVisible = true
            this.templateId = templateId
            // 把row中的信息（物模型的详细信息）放在对应的表单中
            let typeItem = this.iotThingsList.find(item => +item.value === +type)
            if (typeItem) type = typeItem.label
            let isList = []
            if (+isChart === 1 && type === '属性') isList.push('图表展示')
            if (+isMonitor === 1 && type === '属性') isList.push('实时监测')
            if (+isHistory === 1) isList.push('历史存储')
            if (+isReadonly === 1) isList.push('只读数据')
            this.ruleForm = {
                templateName,
                identifier,
                modelOrder,
                type,
                isList,
                datatype,
                min: +specs.min,
                max: +specs.max,
                unit: specs.unit,
                step: +specs.step
            }
        },
        // 删除指定ID的记录
        async handleDelete(templateId) {
            try {
                let { code } = await this.$API.iot.deleteTemplateInfo(templateId)
                if (+code !== 200) {
                    this.$message.error('很遗憾，删除失败！请联系管理员！')
                    return
                }
                this.$message.success('恭喜您，删除成功！')
                // 关于在最后一页删除的处理
                let { total, pageSize, pageNum } = this.page
                let totalPage = Math.ceil(total / pageSize)
                if (+pageNum === +totalPage) {
                    if (!Array.isArray(templateId)) templateId = [templateId]
                    if (templateId.length === this.table.data.length) {
                        // 最后一页全部被删除了
                        this.page.pageNum--
                    }
                }
                this.initData()
            } catch (_) { }
        },
        // 表格选择项发生改变后触发
        selectionChange(selections) {
            // selections：记录了目前所有选中项，其每一行的信息「数组」
            this.selections = selections
        },
        // 触发删除多项的按钮
        async triggerDeleteAll() {
            try {
                await this.$handlePermiseCheck('iot:template:delete')
                let selections = this.selections
                if (selections.length === 0) {
                    this.$message.warning('请您至少选择一项进行删除')
                    return
                }
                await this.$confirm('此操作将永久删除这些信息, 是否继续?', '温馨提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
                // 点击的是确定
                selections = selections.map(item => item.templateId)
                this.handleDelete(selections)
            } catch (_) { }
        },
        // 触发下载按钮
        async triggerDownLoad() {
            try {
                await this.$handlePermiseCheck('iot:template:download')
                let selections = this.selections
                if (selections.length === 0) {
                    this.$message.warning('请您至少选择一项进行下载')
                    return
                }
                // 准备表格的数据
                selections = selections.map(({ templateId, templateName, identifier }) => {
                    return [templateId, templateName, identifier]
                })
                let data = [
                    ['编号', '物模型名称', '标识符'],
                    ...selections
                ]
                // 下载Excel
                const workbook = xlsx.utils.book_new() //创建一个新的Excel表格
                const worksheet = xlsx.utils.aoa_to_sheet(data) //把数据变为sheet数据
                xlsx.utils.book_append_sheet(workbook, worksheet, "Sheet1") //把数据插入到Excel中
                xlsx.writeFile(workbook, `fastbee-template-${+new Date()}.xlsx`) //下载表格
                this.$refs.tableIns.clearSelection()
            } catch (_) { }
        },
        // 关闭弹出层
        closeDialog() {
            this.dialogVisible = false
            this.templateId = null
            this.$refs.formIns.clearValidate()
            this.ruleForm = {
                templateName: '',
                identifier: '',
                modelOrder: 0,
                type: '属性',
                isList: ['图表展示', '只读数据', '实时监测', '历史存储'],
                datatype: 'integer',
                min: 0,
                max: 100,
                unit: '米',
                step: 0
            }
        },
        // 确认提交「修改和新增」
        async submit() {
            try {
                await this.$refs.formIns.validate()
                // 获取表单中的信息，把其准备成为接口需要的格式
                let { templateName, identifier, modelOrder, type, isList, datatype, min, max, unit, step } = this.ruleForm
                let typeItem = this.iotThingsList.find(item => item.label === type)
                type = typeItem ? +typeItem.value : 1
                let isChart = 0, isHistory = 0, isMonitor = 0, isReadonly = 0
                if (isList.includes('图表展示') && type === 1) isChart = 1
                if (isList.includes('实时监测') && type === 1) isMonitor = 1
                if (isList.includes('只读数据')) isReadonly = 1
                if (isList.includes('历史存储')) isHistory = 1
                let body = {
                    templateName,
                    identifier,
                    modelOrder,
                    type,
                    datatype,
                    isChart,
                    isHistory,
                    isMonitor,
                    isReadonly,
                    specs: JSON.stringify({
                        min,
                        max,
                        unit,
                        step,
                        type: datatype
                    })
                }

                // 向服务器发送请求
                let requestFn = this.$API.iot.insertTemplateInfo,
                    tip = '新增'
                if (this.templateId) {
                    // 如果是修改
                    body.templateId = this.templateId
                    requestFn = this.$API.iot.updateTemplateInfo
                    tip = '修改'
                }
                let { code, msg } = await requestFn(body)
                if (+code !== 200) {
                    this.$message.error(msg)
                    return
                }
                this.$message.success(`恭喜您，${tip}成功！`)
                this.closeDialog()
                if (!this.templateId) this.page.pageNum = 1 //新增成功后，跳转回第一页
                this.initData()
            } catch (_) { }
        },
        // 触发搜索
        triggerSearch() {
            this.page.pageNum = 1
            this.initData()
        },
        // 触发新增
        async triggerAdd() {
            try {
                await this.$handlePermiseCheck('iot:template:add')
                this.dialogVisible = true
            } catch (_) { }
        }
    },
    created() {
        // 并行获取三种数据：物模型类别、数据类别、物模型列表
        this.queryIotThingsList()
        this.queryIotDataList()
        this.initData()
    }
}
</script>

<template>
    <div class="template-box">
        <!-- 筛选/操作区域 -->
        <div class="filter-box">
            <div class="filter">
                <div class="form-item">
                    <label>名称</label>
                    <el-input placeholder="请输入物模型名称" v-model.trim="filter.templateName"
                        @keydown.native.enter="triggerSearch" />
                </div>
                <div class="form-item">
                    <label>类别</label>
                    <el-select v-model="filter.type" @change="triggerSearch">
                        <el-option value="" label="全部" />
                        <el-option v-for="item in iotThingsList" :key="item.value" :value="item.value"
                            :label="item.label" />
                    </el-select>
                </div>
            </div>
            <div class="handler">
                <el-button type="primary" ghost icon="el-icon-plus" @click="triggerAdd">新增</el-button>
                <el-button type="danger" ghost icon="el-icon-minus" @click="triggerDeleteAll">删除</el-button>
                <el-button type="success" ghost icon="el-icon-download" @click="triggerDownLoad">下载</el-button>
            </div>
        </div>

        <!-- 表格区域 -->
        <div class="table-box">
            <el-table stripe :data="table.data" v-loading="table.loading" @selection-change="selectionChange"
                ref="tableIns">
                <el-table-column type="selection" align="center" min-width="4%" />
                <el-table-column label="名称" prop="templateName" align="center" min-width="8%" show-overflow-tooltip />
                <el-table-column label="标识符" prop="identifier" align="center" min-width="8%" show-overflow-tooltip />
                <el-table-column label="图表展示" prop="isChart" align="center" min-width="8%" :formatter="formatterWhether" />
                <el-table-column label="实时监测" prop="isMonitor" align="center" min-width="8%"
                    :formatter="formatterWhether" />
                <el-table-column label="只读" prop="isReadonly" align="center" min-width="6%" :formatter="formatterWhether" />
                <el-table-column label="物模型识别" prop="type" align="center" min-width="10%"
                    :formatter="formatterThingsType" />
                <el-table-column label="数据类型" prop="datatype" align="center" min-width="8%"
                    :formatter="formatterDataType" />
                <el-table-column label="数据定义" min-width="14%">
                    <template v-slot="{ row: { specs: { max, min, unit, step } } }">
                        <div class="specs-box">
                            <p class="specs-item">
                                <span>最大值:</span>
                                <span>{{ max }}</span>
                            </p>
                            <p class="specs-item">
                                <span>步长:</span>
                                <span>{{ step }}</span>
                            </p>
                            <p class="specs-item">
                                <span>最小值:</span>
                                <span>{{ min }}</span>
                            </p>
                            <p class="specs-item">
                                <span>单位:</span>
                                <span>{{ unit }}</span>
                            </p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="排序" prop="modelOrder" align="center" min-width="6%" />
                <el-table-column label="创建时间" prop="createTime" min-width="10%" :formatter="formatterTime" />
                <el-table-column label="操作" min-width="10%">
                    <template v-slot="{ row }">
                        <el-link type="primary" @click="triggerUpdate(row)" v-power="'iot:template:list'">修改</el-link>
                        <el-popconfirm title="您确定要删除这一项吗？" @confirm="handleDelete(row.templateId)"
                            v-power="'iot:template:delete'">
                            <el-link type="danger" slot="reference">删除</el-link>
                        </el-popconfirm>
                    </template>
                </el-table-column>

                <template #append>
                    <el-pagination background layout="sizes, prev, pager, next" hide-on-single-page :total="page.total"
                        :current-page.sync="page.pageNum" :page-size.sync="page.pageSize" @size-change="initData"
                        @current-change="initData">
                    </el-pagination>
                </template>
            </el-table>
        </div>

        <!-- 弹出层 -->
        <el-dialog :title="`${templateId ? '修改' : '新增'}通用物模型`" top="5vh" width="650px" :visible="dialogVisible"
            :before-close="closeDialog" :close-on-click-modal="false" :close-on-press-escape="false">

            <el-form label-width="85px" label-suffix=":" :model="ruleForm" :rules="rules" ref="formIns">
                <el-form-item label="模型名称" prop="templateName">
                    <el-input placeholder="请输入物模型名称，例如：温度" v-model.trim="ruleForm.templateName" />
                </el-form-item>
                <el-form-item label="模型标识" prop="identifier">
                    <el-input placeholder="请输入标识符，例如：temperature" v-model.trim="ruleForm.identifier" />
                </el-form-item>
                <el-form-item label="模型排序" prop="modelOrder">
                    <el-input-number :min="0" v-model="ruleForm.modelOrder" />
                </el-form-item>
                <el-form-item label="模型类别" prop="type" required>
                    <el-radio-group v-model="ruleForm.type">
                        <el-radio-button v-for="item in iotThingsList" :key="item.value"
                            :label="item.label"></el-radio-button>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="模型特性" prop="isList">
                    <el-checkbox-group v-model="ruleForm.isList">
                        <el-checkbox label="图表展示" v-show="ruleForm.type === '属性'"></el-checkbox>
                        <el-checkbox label="实时监测" v-show="ruleForm.type === '属性'"></el-checkbox>
                        <el-checkbox label="只读数据" :disabled="ruleForm.type === '事件'"></el-checkbox>
                        <el-checkbox label="历史存储"></el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-divider />
                <el-form-item label="数据类型" prop="datatype" required>
                    <el-select v-model="ruleForm.datatype">
                        <el-option v-for="item in iotDataList" :key="item.value" :value="item.value" :label="item.label" />
                    </el-select>
                </el-form-item>
                <el-form-item label="取值范围">
                    <el-input-number :min="0" :max="100" placeholder="最小值" v-model="ruleForm.min" />
                    &nbsp; 到 &nbsp;
                    <el-input-number :min="0" :max="100" placeholder="最大值" v-model="ruleForm.max" />
                </el-form-item>
                <el-form-item label="单位">
                    <el-input placeholder="请输入单位，例如：米" style="width: 40%;" v-model.trim="ruleForm.unit" />
                </el-form-item>
                <el-form-item label="步长" style="margin-bottom: 0;">
                    <el-input-number placeholder="请输入步长" style="width: 40%;" v-model="ruleForm.step" />
                </el-form-item>
            </el-form>

            <template #footer>
                <button-again type="primary" @click="submit">确认提交</button-again>
                <el-button @click="closeDialog">取消</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<style lang="less" scoped>
.filter-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    background: #FFF;

    .handler {
        display: flex;

        .el-button {
            margin-left: 10px;
        }
    }

    .filter {
        display: flex;
        flex-wrap: wrap;

        .form-item {
            display: flex;
            align-items: center;
            margin-right: 20px;
            height: 40px;

            label {
                padding: 0 10px;
                width: auto;
            }

            .el-input {
                width: 240px;
            }

            .el-select {
                width: 150px;
            }
        }
    }
}

.table-box {
    position: relative;
    margin-top: 10px;
    background: #FFF;

    .el-link {
        margin-right: 10px;
    }

    .el-table {
        position: absolute;
        box-sizing: border-box;
        padding: 15px;
        width: 100%;
    }

    .el-pagination {
        margin-top: 15px;
        text-align: right;
    }
}

.specs-box {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

    .specs-item {
        margin-bottom: 0;
        width: 62%;
        line-height: 20px;
        font-size: 12px;

        &:nth-child(2n) {
            width: 34%;
        }

        span {
            &:nth-child(2) {
                color: #F56C6C;
            }
        }
    }
}

:deep(.el-dialog__body) {
    padding: 20px;
}

@media all and (max-width: 1100px) {
    .filter-box {
        display: block;

        .handler {
            margin-top: 10px;
        }
    }
}
</style>