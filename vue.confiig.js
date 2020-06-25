module.exports = {
    //配置别名  自动中找到文件
    configureWebpack:{
        resolve:{
            alias:{
                "assets":"@/assets",
                "components":"@/components",
                "views":"@/views",
            }
        }
    }
};
