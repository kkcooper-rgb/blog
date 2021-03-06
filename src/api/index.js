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
