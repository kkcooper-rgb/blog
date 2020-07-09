import axios from "axios"

//配置默认的参数
axios.defaults.baseURL =  "http://localhost:3000";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

//获取文章分类
export function getArticleInfo() {
    return axios.get("/article/getInfo")
}
//获取热门文章
export function getArticleHot(skip =0,limit=8) {
    return axios.get("/article/getHot"+`?skip=${skip}&limit=${limit}`)
}
//获取推荐置顶
export function getArticleComment(skip =0,limit=1) {
    return axios.get("/article/getHot"+`?skip=${skip}&limit=${limit}`)
}
//获取文章列表
export default {
    getArticleShow:(function(){
        let skip = 0;
        let limit = 5;
        return function (index=0,ifFresh=false) {
            if (ifFresh){
                skip=0;
                limit =5;
            }
            let tag = ["","HTML&Css","JavaScript","Node","Vue&React","Other"][index];
            let data = {skip,limit,tag};
            skip+=limit;
            return axios.post("/article/getShow",data)
        }
    })()
}

//获取验证码图片
export function getRegisterVCode() {
    return axios.post("/register/vcode");
}
//获取验证码图片失去焦点
export function getRegisterCheckVCode(svgCode) {
    return axios.post('/register/checkVcode',{svgCode});
}
//注册接口
export function postRegister(options) {
    return axios.post('/register',{options});
}
