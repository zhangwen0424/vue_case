# vue_case

使用 vue3+vite+ts 实现一些 vue 功能

1. 项目创建
   yarn create vite

2. 进入项目，安装依赖
   cd vue_case
   yarn
3. 启动项目
   yarn dev

## 实现自己的组件库

参考：https://segmentfault.com/a/1190000041103446

安装插件：

````bash
# 路由
yarn add vue-router@4
# 解析 markdown文件变成 vue 文件
yarn add vite-plugin-md
# 样式
yarn add less
```

遇到的问题：
在`<script setup>` 中无法声明 name，所以必须再写一个普通的 script 来声明 name，或者引入插件:npm install unplugin-vue-define-options -D



在根目录下新建一个 /packages 目录，后续组件的开发都会在该目录进行。以一个 <my-button /> 组件为例，看看 /packages 目录内部是什么样的：

packages
├── Button
│ ├── docs
│ │ ├── README.md // 组件文档
│ │ └── demo.vue // 交互式预览实例
│ ├── index.ts // 模块导出文件
│ └── src
│ └── index.vue // 组件本体
├── index.ts // 组件库导出文件
└── list.json // 组件列表
````
