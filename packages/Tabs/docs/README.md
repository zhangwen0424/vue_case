<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import Preview from "@components/Preview/Preview.vue";
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 标签页

分隔内容上有关联但属于不同类别的数据集合

## 基础用法

<Preview comp-name="Tabs" demo-name="demo">
  <demo />
</Preview>

## 属性

|  参数   |       说明       |  类型  | 可选值 |  默认值   | 是否必填 |
| :-----: | :--------------: | :----: | :----: | :-------: | :------: |
| `value` | 选项卡选中项的值 | string |   -    | `default` |    否    |
| `code`  |    选项卡的值    | string |   -    | `default` |    否    |
| `arg1`  |    第一个参数    | string |   -    | `default` |    否    |

## 事件

|    事件名     |    说明    | 参数列表  |            参数说明             |
| :-----------: | :--------: | :-------: | :-----------------------------: |
|    `click`    |  点击事件  |  $event   |        原生的 dom event         |
| `customEvent` | 自定义事件 | [a, b, c] | a：参数一；b：参数二；c：参数三 |

## 设计思路
