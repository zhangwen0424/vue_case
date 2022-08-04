<template>
  <div class="my-drag" @dragover="dragover($event)">
    <!-- :ref="setRef(el, item)" -->
    <transition-group name="sort">
      <div
        v-for="(item, key) in dataList"
        :class="['drag_item', '1']"
        :ref="(el) => setRef(el, item.code)"
        :key="key"
        :draggable="true"
        @dragstart="dragstart(item)"
        @dragenter="dragenter($event, item)"
        @dragleave="dragleave"
        @dragend="dragend($event, item)"
      >
        {{ item.name }}
      </div>
    </transition-group>
  </div>
</template>

<script lang="ts" setup>
import { toRaw, reactive } from "vue";
// 可拖拽数据
let dataList: any = reactive([
  { code: "1", name: "可拖元素 1" },
  { code: "2", name: "可拖元素 2" },
  { code: "3", name: "可拖元素 3" },
  { code: "4", name: "可拖元素 4" },
  { code: "5", name: "可拖元素 5" },
  { code: "6", name: "可拖元素 6" },
  { code: "7", name: "可拖元素 7" },
]);

let oldData: any = null; // 拖动元素的数据
let newData: any = null; // 拖动放置元素的数据
let refs: any = toRaw({}); // ref
let timer: any = null;

// 设置 refs，用于设置拖拽样式
function setRef(el: any, code: string) {
  refs[code] = el;
  return code;
}

// 拖动的元素数据
function dragstart(value: any) {
  // console.log("dragStart", value);
  oldData = value;
}
// 记录移动过程中信息
function dragenter(e: any, value: any) {
  e.preventDefault();
  // console.log("dragenter");
  newData = value;
  // 这里添加防抖函数，防止高频触发造成可放置样式无法删除
  // refs[newData.code].classList["add"]("enter_item");
  if (timer) clearTimeout(timer);
  timer = setTimeout(() => {
    refs[newData.code].classList["add"]("enter_item");
  }, 200);
}
// 拖动事件（主要是为了拖动时鼠标光标不变为禁止,光标为拖动状态）
function dragover(e: any) {
  e.preventDefault();
}
// 离开事件，移除可放置区域移除样式
function dragleave(e: any) {
  e.preventDefault();
  console.log("dragleave");
  if (timer) clearTimeout(timer);
  refs[newData.code].classList["remove"]("enter_item");
}
// 最终结果
function dragend(e: any, value: any) {
  let oldIndex = dataList.indexOf(oldData);
  let newIndex = dataList.indexOf(newData);
  dataList.splice(oldIndex, 1);
  dataList.splice(newIndex, 0, oldData);
  refs[newData.code].classList["remove"]("enter_item");
  // console.log("dragEnd", dataList);
}
</script>

<style lang="less" scoped>
@import "@packages/custom.less";
.my-drag {
  border: 1px solid @border-color;
  padding: 20px;
  display: inline-block;
  line-height: 30px;
  .drag_item {
    width: 400px;
    padding: 5px 10px;
    margin: 10px;
    border: 1px solid @border-color;
    background-color: #fff;
    &:hover {
      border: 1px dashed #000;
    }
    &.enter_item {
      background-color: @warning-color;
      opacity: 0.5;
    }
  }
  .sort-move {
    transition: transform 0.3s;
  }
}
</style>
