<template>
  <div class="my_header">
    <ul>
      <li v-for="(value, key) in menu.list" :key="key">
        <router-link :to="value.path" active-class="active">{{
          value.name
        }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script setup>
import { reactive } from "vue";
let menu = reactive({
  list: [
    // {
    //   path: "/",
    //   name: "主页",
    // },
    {
      path: "/components/test",
      name: "组件库",
    },
    { path: "/demo", name: "功能页" },
  ],
});
</script>
<style lang="less">
.my_header {
  padding: 10px 10px 0px;

  ul {
    border-bottom: 2px solid #eee;
    text-align: center;
    li {
      display: inline-block;
      margin: 0 20px;
      position: relative;
      a {
        color: #000;
        &:hover {
          color: #42b983;
        }
      }
      .active {
        color: #42b983;
        &::after {
          content: "";
          display: inline-block;
          content: "";
          display: inline-block;
          position: absolute;
          bottom: -2px;
          left: calc(50% - 26px);
          width: 100%;
          height: 2px;
          background: #42b983;
        }
      }
    }
  }
}
</style>
