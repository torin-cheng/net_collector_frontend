<template>
    <div id="app">
        <el-container>
            <el-header>
                <Header></Header>
            </el-header>
<!--            <router-link to="/tasklist">任务列表</router-link>-->
<!--                <router-link to="/">首页</router-link>-->
<!--                <router-link to="/empty" tag="button">测试空页面</router-link>-->
            <el-main>
                <RouterView v-if="isRouterAlive"></RouterView>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    /* eslint no-unused-vars: "off" */
    import Header from './components/Header.vue'

    export default {
        name: 'app',
        components: {
            Header,
        },
        data(){
            return {
                isRouterAlive: true
            }
        },
        provide(){
            return {
                reload: this.reload
            }
        },
        methods:{
            reload(){
                this.isRouterAlive = false
                this.$nextTick(()=>{
                    this.isRouterAlive = true
                })
            }
        }

    }
</script>

<style lang="scss">
    #app {
        font-family: 'Microsoft YaHei', 微软雅黑, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        height: 100%;
    }

    html, body {
        height: 100%;
        margin: 0;
        background-color: #EBEFF4;
        font-size: 12px;
    }

    h1 {
        font-size: 48px;
    }

    h2 {
        font-size: 32px;
    }

    h3 {
        font-size: 20px;
    }

    .el-container {
        height: 100%;
        .el-header {
            padding: 0;
            background-color: #091e2a;
            color: #fff;
        }

        .el-main {
            padding: 10px 10px;
        }

    }
</style>
