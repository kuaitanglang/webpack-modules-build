<template>
    <div>
        <el-table :data="tableData"
                  border
                  row-key="id"
                  align="left" style="width: 100%">
            <el-table-column type="expand">
                <template v-slot:default="scope">
                    <div>{{scope.row}}</div>
                </template>
            </el-table-column>
            <el-table-column type="selection"></el-table-column>
            <el-table-column v-for="(item, index) in col"
                             v-if="index>1"
                             align="center"
                             :key="`col_${index}`"
                             :label="item.label"
                             :fixed="item.fixed"
                             :prop="dropCol[index].prop"
                             :formatter="dropCol[index].formatter">
                <template slot-scope="scope">
                    <div v-if="dropCol[index].label=='操作'">操作</div>
                    <div v-else>{{dropCol[index].formatter?dropCol[index].formatter(scope.row, scope.column,scope.row[dropCol[index].prop]): scope.row[dropCol[index].prop]}}</div>
                </template>
            </el-table-column>

        </el-table>
        <div style="display: flex">
            <div>
                <pre style="text-align: left">
                  {{col}}
                </pre>
            </div>
            <div>
                <pre style="text-align: left">
                  {{dropCol}}
                </pre>
            </div>
        </div>
        <hr>
        <pre style="text-align: left">
          {{tableData}}
        </pre>
    </div>
</template>
<script>
    export default {
        data() {
            let cfg = [
                {fixed: 'left'}, {fixed: 'left'},
                {
                    label: '日期',
                    prop: 'date'
                },
                {
                    label: '姓名',
                    prop: 'name',
                    formatter: function (row, column, cellValue) {
                        return cellValue + '9*9'
                    }
                },
                {
                    label: '地址',
                    prop: 'address'
                },
                {
                    fixed: 'right',
                    label: '操作',
                }
            ];
            return {
                col: cfg,
                dropCol: cfg.slice(0),
                tableData: [
                    {
                        id: '1',
                        date: '2016-05-02',
                        name: '王小虎1',
                        address: '上海市普陀区金沙江路 100 弄',
                    },
                    {
                        id: '2',
                        date: '2016-05-04',
                        name: '王小虎2',
                        address: '上海市普陀区金沙江路 200 弄'
                    },
                    {
                        id: '3',
                        date: '2016-05-01',
                        name: '王小虎3',
                        address: '上海市普陀区金沙江路 300 弄'
                    },
                    {
                        id: '4',
                        date: '2016-05-03',
                        name: '王小虎4',
                        address: '上海市普陀区金沙江路 400 弄'
                    }
                ]
            }
        },
        mounted() {
            this.rowDrop()
            this.columnDrop()
        },
        methods: {
            //行拖拽
            rowDrop() {
                const tbody = document.querySelector('.el-table__body-wrapper tbody')
                const _this = this
                this.$Sortable.create(tbody, {
                    onEnd({ newIndex, oldIndex }) {
                        const currRow = _this.tableData.splice(oldIndex, 1)[0]
                        _this.tableData.splice(newIndex, 0, currRow)
                    }
                })
            },
            //列拖拽
            columnDrop() {
                const wrapperTr = document.querySelector('.el-table__header-wrapper tr')
                this.sortable = this.$Sortable.create(wrapperTr, {
                    animation: 180,
                    delay: 0,
                    onEnd: ({ item, newIndex, oldIndex }) => {
                        let targetThElem = item
                        let wrapperElem = targetThElem.parentNode
                        if (oldIndex<2) {
                            // 错误的移动前两个
                            if (newIndex > oldIndex) {
                                wrapperElem.insertBefore(targetThElem, wrapperElem.children[oldIndex])
                            } else {
                                wrapperElem.insertBefore(wrapperElem.children[oldIndex], targetThElem)
                            }
                            return;
                        }else if(newIndex<2){
                            // 错误的移动第三后之后的进前两项
                            wrapperElem.insertBefore(targetThElem,wrapperElem.children[oldIndex+1])
                            return;
                        }
                        const oldItem = this.dropCol[oldIndex]
                        this.dropCol.splice(oldIndex, 1)
                        this.dropCol.splice(newIndex, 0, oldItem)
                    }
                })
            }
        }
    }
</script>
<style scoped>
</style>