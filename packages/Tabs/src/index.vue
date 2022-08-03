<template>
  <ul :class="tabPosition">
    <li v-for="(item, key) in list" :key="key" @click="() => handleClick(item)">
      <a :class="activedTab == item.code ? 'active' : ''">{{ item.name }}</a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { PropType, ref } from "vue";
import { useRouter } from "vue-router";
/**
 * 类型声明
 */
interface listProps {
  code: string; // 代码,唯一
  name: string; // 显示项
  link: string; // 跳转地址
}
/**
 * 接收属性参数
 * list: tabs 选项
 * value: 选项
 * tabPosition: 选项卡位置方向, top,left
 */
let { list, value, tabPosition } = defineProps({
  list: {
    type: Array as PropType<listProps[]>,
    default: [
      { code: "1", name: "选项 1" },
      { code: "2", name: "选项 2" },
      { code: "3", name: "选项 3" },
    ],
  },
  value: String,
  tabPosition: {
    type: String,
    default: "top",
  },
});
// console.log("tabPosition", tabPosition);

/**
 * 接收事件参数
 * clickTab: 切换选项卡事件
 */
let emit = defineEmits(["clickTab"]);

// 路由跳转
let router = useRouter();

/**
 * 组件属性
 */
let activedTab = ref(value || list[0].code);

/**
 * 切换选项事件
 * @param e
 */
function handleClick(item: any) {
  activedTab.value = item.code;
  emit("clickTab", item);
  if (item.link) {
    router.push(item.link);
  }
}
</script>

<style lang="less" scoped>
@import "@packages/custom.less";
ul {
  padding: 0px;
  list-style: none;
  &.top {
    border-bottom: 2px solid #eee;
    li {
      display: inline-block;
      margin: 10px 30px 10px 0px;
      position: relative;
      a {
        color: @font-color;
        &.active {
          color: @theme-color;
          &::after {
            content: "";
            width: 100%;
            height: 2px;
            display: inline-block;
            position: absolute;
            bottom: -12px;
            left: 0;
            background: @theme-color;
          }
        }
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
  &.left {
    border-right: 2px solid #eee;
    display: inline-block;
    li {
      position: relative;
      margin: 10px 10px 20px 0px;
      text-align: right;
      a {
        color: @font-color;
        &.active {
          color: @theme-color;
          &::after {
            content: "";
            width: 2px;
            height: 100%;
            position: absolute;
            top: 0;
            right: -12px;
            background-color: @theme-color;
          }
        }
      }
    }

    &:hover {
      cursor: pointer;
    }
  }
}
</style>
