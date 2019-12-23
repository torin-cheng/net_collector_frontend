<template>
    <div class="task-list">
        <el-row type="flex" justify="space-between">
            <router-link to="/tasklist">
                <el-button type="text">任务列表:</el-button>
            </router-link>
            <div class="refresh-buttons">
                <el-button type="primary" icon="el-icon-refresh-right" @click="getTableData" :loading="tableLoading"
                           size="medium" v-text="refreshButtonText">
                </el-button>
                <el-button type="primary" @click="autoRefreshSwitch" size="medium" v-text="autoRefreshText"></el-button>
            </div>
        </el-row>
        <hr/>

        <el-row type="flex" justify="center">
            <el-table stripe :data="filterTable" v-loading="tableLoading" :row-class-name="setRowClass" @cell-click="cellClick">

                <el-table-column v-for="(column, index) in tableColumns" :prop="column.prop"
                                 :label="column.label" :key="index" :width="setColumnWidth(column.prop)" :class-name="setColumnClass(column.prop)">
                    <template slot="header" slot-scope="slotProps">
                        <div class="column-title">{{column.label}}</div>
                        <el-input class="column-input" @input.native="inputChange($event, slotProps.$index)" size="mini" clearable
                                  v-model="searchText[index]"
                                  @clear="inputClear($event, index)"
                        ></el-input>
                    </template>
                    <template slot-scope="scope">
                        <span>{{scope.row[scope.column.property]}}</span>
                    </template>

<!--                    <template slot-scope="scope" v-if="scope.column.property==='status'">-->
<!--                        <span>{{scope.row[scope.column.property]}}</span>-->
<!--                    </template>-->
<!--                    <template slot-scope="scope" v-else>-->
<!--                        {{scope.row[scope.column.property]}}-->
<!--                    </template>-->
                </el-table-column>

            </el-table>
        </el-row>

        <task-detail :task-dialog-visible.sync="taskDialogVisible" :task-detail="taskDetail"></task-detail>
    </div>
</template>

<script>
    /* eslint no-unused-vars: "off" */
    import TaskDetail from './TaskDetail'
    import axios from 'axios'

    let Tconsole = console

    function debounce(func, wait, immediate) {
        var timeout;
        return function () {
            var context = this, args = arguments;
            var later = function () {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            var callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }


    export default {
        name: "TaskList",
        components: { TaskDetail },
        inject:['reload'],
        data() {
            return {
                queryLink: "http://127.0.0.1:8003/api/v1/collector/task",
                searchText: {},
                autoRefresh: false,
                refreshButtonText: '刷新',
                autoRefreshTimer: null,
                tableColumns: [
                    {
                        prop: 'id',
                        label: 'ID',
                        sortable: true,
                        searchText: '',
                    },
                    {
                        prop: 'ip',
                        label: '管理IP',
                        sortable: true,
                        searchText: '',
                    },
                    {
                        prop: 'device_type',
                        label: '设备类型',
                        sortable: true,
                        searchText: '',
                    },
                    {
                        prop: 'commands',
                        label: '命令',
                        sortable: true,
                        searchText: '',
                    },
                    {
                        prop: 'status',
                        label: '任务状态',
                        sortable: true,
                        searchText: '',
                    },
                    {
                        prop: 'result',
                        label: '结果',
                        sortable: true,
                        searchText: '',
                    },
                    {
                        prop: 'started',
                        label: '开始时间',
                        sortable: true,
                        searchText: '',
                    },
                    {
                        prop: 'finished',
                        label: '结束时间',
                        sortable: true,
                        searchText: '',
                    },
                    {
                        prop: 'runtime',
                        label: '耗时',
                        sortable: true,
                        searchText: '',
                    },
                ],
                // table data
                tableData: [],

                setRowKey(row) {
                    return row.seq
                },
                tableLoading: false,

                taskDialogVisible: false,

                taskDetail: null
            }
        },
        methods: {
            getTableData() {
                this.tableLoading = true
                axios.get(this.queryLink, {params: {}})
                    .then((response) => {
                        // Tconsole.log(response)
                        let body = response.data
                        this.tableData = body.data
                    })
                    .catch((error) => {
                        // Tconsole.log(error)
                        // Tconsole.log(Object.getOwnPropertyNames(error))
                        // Tconsole.log(error.message)
                        let response = error.response
                        Tconsole.log(response)
                        if (response) {
                            this.$message({
                                message: response.data.msg,
                                duration: 5000,
                                type: 'error'
                            })
                        } else {
                            if (error.message === 'Network Error') {
                                this.$message({
                                    message: '网络异常',
                                    duration: 5000,
                                    type: 'error'
                                })
                            } else {
                                this.$message({
                                    message: error.message,
                                    duration: 5000,
                                    type: 'error'
                                })
                            }
                        }
                    })
                    .finally(() => {
                        this.tableLoading = false
                    });
            },
            getTaskDetail(taskId){
                axios.get(this.queryLink, {params: {id: taskId}})
                    .then((response) => {
                        // Tconsole.log(response)
                        let body = response.data
                        let detail = body.data
                        this.taskDetail = detail
                        this.taskDialogVisible = true
                    })
                    .catch((error) => {
                        // Tconsole.log(error)
                        // Tconsole.log(Object.getOwnPropertyNames(error))
                        // Tconsole.log(error.message)
                        let response = error.response
                        Tconsole.log(response)
                        if (response) {
                            this.$message({
                                message: response.data.msg,
                                duration: 5000,
                                type: 'error'
                            })
                        } else {
                            if (error.message === 'Network Error') {
                                this.$message({
                                    message: '网络异常',
                                    duration: 5000,
                                    type: 'error'
                                })
                            } else {
                                this.$message({
                                    message: error.message,
                                    duration: 5000,
                                    type: 'error'
                                })
                            }
                        }
                    })
            },
            cellClick(row, column, cell, event){
                if (column.property === 'id') {
                    this.getTaskDetail(cell.textContent)
                }
            },
            inputChange: debounce(function (e, index) {
                this.tableColumns[index].searchText = this.searchText[index]
            }, 800),

            inputClear(e, index) {
                this.tableColumns[index].searchText = ''
            },
            setRefreshTimer() {
                this.autoRefreshTimer = setInterval(this.getTableData, 2000)
            },
            clearRefreshTimer() {
                clearInterval(this.autoRefreshTimer)
            },
            autoRefreshSwitch() {
                if (this.autoRefresh) {
                    this.clearRefreshTimer()
                } else {
                    this.setRefreshTimer()
                }
                this.autoRefresh = !this.autoRefresh
            },
            setColumnWidth(prop) {
                if (prop == 'result') return '400px'
                if (prop == 'runtime') return '100px'
                if (prop == 'status') return '100px'
                if (prop == 'ip') return '150px'
                if (prop == 'started') return '180px'
                if (prop == 'finished') return '180px'
                if (prop == 'device_type') return '150px'
            },
            setColumnClass(prop) {
                if (prop == 'status') return 'column-status'
                if (prop == 'id') return 'column-id'
            },
            setRowClass({row, rowIndex}) {
                switch (row.status) {
                    case "SUCCESS":
                        return 'row-success'
                    case "FAILURE":
                        return 'row-failure'
                    case "STARTED":
                        return 'row-started'
                    case "PENDING":
                        return 'row-pending'
                    default:
                        return 'row-default'
                }
            }
        },
        computed: {
            filterTable() {
                Tconsole.log('computing...')
                let tmpTable = this.tableData.slice()
                let result = tmpTable.filter((element) => {
                    let bool_result = this.tableColumns.every((cur) => {
                        // Tconsole.log('search text',cur.searchText)
                        if (cur.searchText === '') {
                            return true
                        } else if (element[cur.prop].indexOf(cur.searchText) > -1) {
                            // Tconsole.log(cur.searchText, element[cur.prop], true)
                            return true
                        } else {
                            return false
                        }
                    })
                    return bool_result
                })
                Tconsole.log('ending...')
                return result
            },
            autoRefreshText() {
                if (this.autoRefresh) {
                    return '停止刷新'
                } else {
                    return '自动刷新'
                }
            }
        },
        mounted() {
            this.getTableData()
            if (this.autoRefresh) {
                this.setRefreshTimer()
            }
        },
        watch: {
            '$route': 'getTableData'
        },

        // beforeRouteUpdate (to, from, next) {
        //     this.reload()
        // }

    }
</script>

<style lang="scss">
    .task-list {
        .refresh-buttons {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        hr {
            height:1px;
            border:none;
            border-top:1px solid #555555;
            width: 100%;
            margin: 10px 0;
        }

        .el-table {
            background-color: #EBEFF4;
            thead {
                .cell {
                    .column-title {
                        margin-left: -2px;
                        color: black;
                    }
                    .column-input {
                        margin-left: -2px;
                        padding-right: 10px;
                        padding-left: 0px;
                    }
                }
            }

            tbody {
                .column-id {
                    color: darkgreen;
                    cursor: pointer;
                }
                .column-status {
                    .cell {
                        span {
                                display:inline-block;
                                line-height: 12px;
                                height:12px;
                                color: #ffffff;
                                font-weight: bold;
                                font-size: 11px;
                                padding: 2px 2px 1px;
                                border-radius: 3px;
                                border-collapse: separate;
                                border-spacing:0;
                                text-shadow: 0 -1px 0 rgba(0, 0, 0, 0.25);
                                /*border: darkgreen 1px solid;*/
                        }
                    }
                }
            }

            tbody {
                .row-success {
                    .column-status {
                        .cell {
                            span {
                                background-color: darkgreen;
                            }

                        }
                    }
                }
                .row-failure {
                    .column-status {
                        .cell {
                            span {
                                background-color: darkred;
                            }

                        }
                    }
                }
                .row-started {
                    .column-status {
                        .cell {
                            span {
                                background-color: darkblue;
                            }

                        }
                    }
                }
                .row-pending {
                    .column-status {
                        .cell {
                            span {
                                background-color: darkgrey;
                            }

                        }
                    }
                }
                .row-default {
                    .column-status {
                        .cell {
                            span {
                                background-color: black;
                            }

                        }
                    }
                }
            }
        }

    }
</style>