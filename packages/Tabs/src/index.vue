<template>
  <div class="my-tabs">
    <ul>
      <li v-for="(item, key) in list" :key="key" :class="tabPosition">
        <a :class="key == 0 ? 'active' : ''">{{ item }}</a>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, computed } from "vue";
let props = defineProps({
  // tabs 选项
  list: {
    type: Array,
    default: ["选项 1", "选项 2", "选项 3"],
  },
  // 激活项
  value: String,
  // 选项卡位置方向：top,left
  tabPosition: {
    type: String,
    default: "top",
  },
});
console.log("value", props);
let classTab = computed((a, b) => {
  return {
    active: !!props.value,
  };
  console.log("a", a, b);
});
</script>

<style lang="less" scoped>
.my-tabs {
  ul {
    border-bottom: 2px solid #eee;
    padding: 0px;
    li {
      display: inline-block;
      margin: 10px 20px 10px 0px;
      position: relative;
      a {
        color: #000;
        &.active {
          color: red;
          &::after {
            content: "";
            width: 100%;
            height: 2px;
            display: inline-block;
            position: absolute;
            top: 0;
            left: calc(50% - 25px)
            // left: calc(50%);
          }
        }
      }
      // &:first-child {
      //   border
      // }
      &:hover {
        cursor: pointer;
      }
      // &:active {
      //   color: red;
      // }
    }
  }
}
</style>
