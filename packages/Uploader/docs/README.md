<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import Preview from "@components/Preview/Preview.vue";
</script>
<!-- 加载 demo 组件 end -->

<!-- 正文开始 -->

# 文件上传

文件上传组件

## 基础用法

<Preview comp-name="Uploader" demo-name="demo">
  <demo />
</Preview>

## 属性

|       参数       |        说明        |  类型   | 可选值 |                  默认值                   | 是否必填 |
| :--------------: | :----------------: | :-----: | :----: | :---------------------------------------: | :------: |
|      `type`      |      上传类型      | string  |   -    | `default 基础上传，drag 拖拽上传（默认）` |    否    |
| `uploadImediate` | 选择文件后立即上传 | boolean |   -    |                  `false`                  |    否    |
|  `showPreview`   |  是否显示图片预览  | boolean |   -    |                  `true`                   |    否    |
|     `limit`      |    上传个数限制    | number  |   -    |                    `1`                    |    否    |

## 事件

|    事件名     |    说明    | 参数列表  |            参数说明             |
| :-----------: | :--------: | :-------: | :-----------------------------: |
|    `click`    |  点击事件  |  $event   |        原生的 dom event         |
| `customEvent` | 自定义事件 | [a, b, c] | a：参数一；b：参数二；c：参数三 |
