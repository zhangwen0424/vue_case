<!-- 顶部菜单栏 -->
<template>
  <div class="my_header">
    <my-tabs :list="menu.list" :value="'2'" />
  </div>
</template>
<script setup>
import { reactive } from "vue";
let menu = reactive({
  list: [
    // { code: "1", name: "主页", link: "/" },
    { code: "2", name: "组件库", link: "/components/button" },
    { code: "3", name: "功能页", link: "/components" },
  ],
});
</script>
<style lang="less">
.my_header {
  // padding: 10px 10px 0px;
  position: fixed;
  width: 100%;
  top: 0px;
  z-index: 1000;
  background-color: #fff;

  ul {
    border-bottom: 2px solid #eee;
    text-align: center;
  }
}
</style>
