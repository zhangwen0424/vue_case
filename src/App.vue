<template>
  <!-- 菜单导航 -->
  <Header></Header>
  <!-- 内容 -->
  <div class="main">
    <router-view></router-view>
  </div>
</template>

<script setup>
import Header from "@components/Header/Header.vue";
</script>
<style lang="less">
.main {
  margin-top: 60px;
}
</style>
