<!-- 加载 demo 组件 start -->
<script setup>
import demo from './demo.vue'
import demo_position from './demo_position.vue'
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

## 选项卡位置

<Preview comp-name="Tabs" demo-name="demo_position">
  <demo_position />
</Preview>

## 属性

|     参数      |       说明       |  类型  |  可选值  |                                     默认值                                      | 是否必填 |
| :-----------: | :--------------: | :----: | :------: | :-----------------------------------------------------------------------------: | :------: |
|    `value`    | 选项卡选中项的值 | string |    -     |                                    `default`                                    |    否    |
|    `list`     |    tabs 选项     | array  |    -     | `{code: string;// 代码,唯一; name: string;// 显示项; link: string;// 跳转地址}` |    否    |
| `tabPosition` |  选项卡位置方向  | string | top,left |                                      `top`                                      |    否    |

## 事件

|   事件名   |      说明      | 参数列表 |  参数说明   |
| :--------: | :------------: | :------: | :---------: |
| `clickTab` | 切换选项卡事件 |   [a]    | a：选中项值 |
