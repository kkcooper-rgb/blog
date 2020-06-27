<template>
  <div id="app">
    <common-nav v-if="!$route.name.includes('home')"/>
    <router-view/>
  </div>
</template>
<script>
  import CommonNav from "./components/common/nav/CommonNav";
  export default {
    name:"app",
    components:{
      CommonNav
    },
  }
</script>
<style lang="less">
  //初始样式引入及字体样式
  @import "assets/css/reset.css";
  @import "assets/css/font.css";
  #app{
    width: 100%;
    background: url("./assets/img/bg.jpg") center top/cover fixed;
  }
</style>
