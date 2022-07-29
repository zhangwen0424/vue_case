/**
 * 这里注册 plugin
 */

import { App, Plugin } from "vue";
import Button from "./src/index.vue";

/**
 * 全局引用
  import { createApp } from 'vue'
  import App from './app.vue'
  import MyKit from 'my-kit'
  createApp(App).use(MyKit)

  // 局部引用
  import { Button } from 'my-kit'
  Vue.component('my-button', Button)
 */

// 定义一个 VuePlugin 的引用方式，使组件可以全局引用、局部引用
export const ButtonPlugin: Plugin = {
  install(app: App) {
    app.component("my-button", Button);
  },
};

export { Button };
