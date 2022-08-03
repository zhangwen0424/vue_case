<template>
  <div class="demo_change">
    <input
      type="radio"
      v-model="tabPos"
      :value="'top'"
      :checked="tabPos == 'top' ? true : false"
    />
    top
    <input
      type="radio"
      v-model="tabPos"
      :value="'left'"
      :checked="tabPos == 'left' ? true : false"
    />
    left
  </div>
  <div :class="['demo_position', tabPos]">
    <my-tabs
      :value="activedTab"
      :list="list"
      @clickTab="clickTab"
      :tabPosition="tabPos"
    />
    <p>内容{{ activedTab || list[0].code }}</p>
  </div>
</template>
<script lang="ts" setup>
import { ref, reactive } from "vue";
/**
 * 属性
 * list: tabs选项
 * activedTab: 选中项
 * clickTab: 切换选项卡事件
 */
let list = reactive([
  { code: "1", name: "选项 1" },
  { code: "2", name: "选项 2" },
  { code: "3", name: "选项 3" },
]);
let activedTab = ref("1");
let tabPos = ref("left");
function clickTab(item: any) {
  activedTab.value = item.code;
}
</script>
<style lang="less">
.demo_position {
  margin-top: 20px;
  &.left {
    display: flex;
    p {
      margin-left: 20px;
    }
  }
}
</style>
