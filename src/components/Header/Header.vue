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
    { code: "1", name: "主页", path: "/components/template" },
    { code: "2", name: "组件库", path: "/components/template" },
    { code: "3", name: "功能页", path: "/components/template" },
  ],
});
</script>
<style lang="less">
.my_header {
  padding: 10px 10px 0px;

  ul {
    border-bottom: 2px solid #eee;
    text-align: center;
  }
}
</style>
