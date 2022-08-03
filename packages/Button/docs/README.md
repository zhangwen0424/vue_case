<script setup>
import demo from './demo.vue'
import Preview from "@components/Preview/Preview.vue";
</script>

# 按钮组件

操作按钮

## 基础用法

<Preview comp-name="Button" demo-name="demo">
  <demo />
</Preview>

## 属性

|    参数    |     说明     |  类型  |        可选值         |  默认值   | 是否必填 |
| :--------: | :----------: | :----: | :-------------------: | :-------: | :------: |
|   `type`   |   按钮类型   | string | defult,success,danger | `default` |    否    |
| `disabled` | 按钮是否禁用 | string |      true,false       |  `false`  |    否    |

## 事件

| 事件名  |   说明   | 参数列表 | 参数说明 |
| :-----: | :------: | :------: | :------: |
| `click` | 按钮事件 |    -     |    -     |
