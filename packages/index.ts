/* eslint-disable */

/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import { App, Plugin } from "vue";

import { TemplatePlugin } from "./Template";
import { TabsPlugin } from "./Tabs";
import { ButtonPlugin } from "./Button";

const MYKitPlugin: Plugin = {
  install(app: App) {
    TemplatePlugin.install?.(app);
    TabsPlugin.install?.(app);
    ButtonPlugin.install?.(app);
  },
};

export default MYKitPlugin;

export * from "./Template";
export * from "./Tabs";
export * from "./Button";
