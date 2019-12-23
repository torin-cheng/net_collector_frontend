<template>
    <el-dialog class="task-detail-dialog" title="任务详情：" :visible.sync="dialogVisibleProp" width="80%" :center="false">
        <el-table :data="tableData">
            <el-table-column prop="name" label="名称" width="100px"></el-table-column>
            <el-table-column prop="value" label="结果" >
                    <template slot-scope="scope">
                        <pre>{{scope.row[scope.column.property]}}</pre>
                    </template>
            </el-table-column>
        </el-table>
    </el-dialog>
</template>

<script>
    let Tconsole = console
    export default {
        name: "TaskDetail",
        props: ['taskDetail', 'taskDialogVisible'],

        filters: {
            formatJsonToPre(data){
                return JSON.stringify(data, null, 2)
            }
        },
        computed: {
            dialogVisibleProp: {
                get() {
                  return this.taskDialogVisible
                },
                set(v) {
                  this.$emit('update:taskDialogVisible', v);
                }
            },
            tableData(){
                let l = []
                let d = this.taskDetail
                for (let k in d) {
                    let outputList
                    let outputText = ''
                    switch (k) {
                        case "id":
                            l.push({name: 'ID', value: d[k]})
                            break
                        case "ip":
                            l.push({name: '管理IP', value: d[k]})
                            break
                        case "device_type":
                            l.push({name: '设备类型', value: d[k]})
                            break
                        case "commands":
                            for (let cmd in d[k]) {
                                outputText = outputText.concat(d[k][cmd] + '\n')
                            }
                            l.push({name: '命令', value: outputText})
                            break
                        case "status":
                            l.push({name: '任务状态', value: d[k]})
                            break
                        case "started":
                            l.push({name: '开始时间', value: d[k]})
                            break
                        case "finished":
                            l.push({name: '结束时间', value: d[k]})
                            break
                        case "runtime":
                            l.push({name: '耗时', value: d[k]})
                            break
                        case "result":
                            if (d[k].constructor == Object) {
                                outputList = Object.assign(d[k])
                                for (let cmd in outputList) {
                                    outputText = outputText.concat(cmd + '\n')
                                    outputText = outputText.concat(outputList[cmd] + '\n')
                                    // outputText = outputText.concat(outputList[cmd].replace(/[\r]?\n/g,'<br>') + '<br>')
                                    // outputList[cmd] = outputList[cmd].replace(/[\r]?\n/g,'<br>' )
                                }
                            }
                            else if (typeof(d[k]) == 'string') {
                                outputText = d[k]
                            } else {
                                outputText = JSON.stringify(d[k], null, 2)
                            }
                            Tconsole.log(outputList)
                            l.push({name: '结果', value: outputText})
                            break
                    }
                }
                return l

            }
        }
    }
</script>

<style scoped>
    .task-detail-dialog {
        text-align: left;
    }

</style>