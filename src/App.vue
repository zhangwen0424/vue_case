<template>
  <!-- 菜单导航 -->
  <Header></Header>
  <!-- 内容 -->
  <router-view></router-view>
</template>

<script setup>
import Header from "@components/Header/Header.vue";
import ComponentList from "@packages/list.json";
import { reactive } from "vue";

const data = reactive({
  links: ComponentList.map((item) => ({
    path: `/components/${item.compName}`,
    name: item.compZhName,
  })),
});
</script>
