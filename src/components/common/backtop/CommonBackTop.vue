<template>
    <div class="CommonBackTop">
        <el-backtop :bottom="100">
            <div>
                <i class="el-icon-upload2"
                   style="{
                   display: block;
                    height: 100%;
                    width: 100%;
                    background-color: #f2f5f6;
                    box-shadow: 0 0 6px rgba(0,0,0, .12);
                    text-align: center;
                    line-height: 30px;
                    color: #1989fa;
                    font-size: 25px;
                  }"

                > </i>
            </div>
        </el-backtop>
    </div>
</template>

<script>
    export default {
        name: "CommonBackTop"
    }
</script>

<style scoped>
    .el-backtop{
        z-index:999;
    }
</style>
