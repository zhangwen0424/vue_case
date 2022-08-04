/* eslint-disable */

/** 
 * !--------- FBI WARNING ----------!
 * 
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import { App, Plugin } from 'vue';
import "@packages/custom.less";

import { ButtonPlugin } from './Button';
import { TabsPlugin } from './Tabs';
import { DragPlugin } from './Drag';

const MYKitPlugin: Plugin = {
  install(app: App) {
    ButtonPlugin.install?.(app);
    TabsPlugin.install?.(app);
    DragPlugin.install?.(app);
  },
};

export default MYKitPlugin;

export * from './Button'
export * from './Tabs'
export * from './Drag'