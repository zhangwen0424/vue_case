<template>
  <my-tabs :value="activedTab" :list="list" @clickTab="clickTab" />
  <p>内容{{ activedTab || list[0].code }}</p>
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
function clickTab(item: any) {
  activedTab.value = item.code;
}
// const
</script>
