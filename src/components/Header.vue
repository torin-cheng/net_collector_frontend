<template>
    <div class="p-header">
        <div class="logo">
            <img src="logo-via-logohub.png" height="32px"/>
        </div>

        <el-menu mode="horizontal" active-text-color="#ffd04b" default-active="/tasklist" :router="true" >
            <el-menu-item index="/tasklist">任务列表</el-menu-item>
<!--            <el-menu-item index="/empty">空白页</el-menu-item>-->
        </el-menu>
    </div>
</template>

<script>
    /* eslint no-unused-vars: "off" */
    export default {
        name: "Header",
        components: {}
    }
</script>

<style lang="scss">
    .p-header {
        display: flex;

        .logo {
            width: 300px;
            height: 60px;
            display:flex;
            align-items:center;
            justify-content: center;
        }

        .el-menu {
            flex:1 1 auto;
            height: 60px;
            background-color: #091e2a;

            .el-menu-item {
                font-size: 16px;
                font-weight: bold;
                color: #fffafa;
            }
        }
    }


</style>