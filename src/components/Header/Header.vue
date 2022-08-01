<template>
  <div class="my_header">
    <h3>项目清单</h3>
    <ul>
      <li v-for="(value, key) in menu.list" :key="key">
        <a :href="'#' + value.path">{{ value.name }}</a>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { reactive } from "vue";
let menu = reactive({
  list: [
    {
      path: "/components/Library",
      name: "组件库",
    },
    { path: "/components/Demo", name: "功能页" },
  ],
});
</script>
<style lang="less">
.my_header {
  padding: 20px 50px;
}
</style>
