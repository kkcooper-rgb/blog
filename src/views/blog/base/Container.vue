<template>
    <div class="Container">
        <!--element-ui布局-->
        <el-container>
            <!--主体文章-->
            <el-main>Main</el-main>
            <!--侧边栏-->
            <el-aside>
                <!--搜索及侧边导航栏-->
                <right-search-nav/>
            </el-aside>
        </el-container>
    </div>
</template>

<script>
    import RightSearchNav from "./RightSearchNav";
    export default {
        name: "Container",
        components:{
            RightSearchNav
        }
    }
</script>

<style scoped lang="less">
    .Container{
        padding-top: 80px;
        width: 100%;
        user-select: none;
        >.el-container{
            box-sizing: border-box;
            width: 100%;
            max-width: 1360px;
            margin: 0 auto;
            padding: 0 50px;
            >.el-aside {
                width: 300px;
                height: 1000px;
            }
            >.el-main {
            }
        }
    }

</style>
