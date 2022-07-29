/**
 * 这里把组件暴露出去
 */
import { App, Plugin } from "vue";

import { ButtonPlugin } from "./Button";

const MyKitPlugin: Plugin = {
  install(app: App) {
    ButtonPlugin.install?.(app);
  },
};

export default MyKitPlugin;

export * from "./Button";
