/* eslint-disable */

/** 
 * !--------- FBI WARNING ----------!
 * 
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import { App, Plugin } from 'vue';
import "@packages/custom.less";
import "font-awesome/css/font-awesome.min.css"

{{ importPlugins }}

const MYKitPlugin: Plugin = {
  install(app: App) {
    {{ installPlugins }}
  },
};

export default MYKitPlugin;

{{ exportPlugins }}