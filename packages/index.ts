/* eslint-disable */

/** 
 * !--------- FBI WARNING ----------!
 * 
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import { App, Plugin } from 'vue';

import { TestPlugin } from './Test';
import { ButtonPlugin } from './Button';

const MYKitPlugin: Plugin = {
  install(app: App) {
    TestPlugin.install?.(app);
    ButtonPlugin.install?.(app);
  },
};

export default MYKitPlugin;

export * from './Test'
export * from './Button'