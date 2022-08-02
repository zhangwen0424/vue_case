import { App, Plugin } from 'vue';
import Tabs from './src/index.vue';

export const TabsPlugin: Plugin = {
  install(app: App) {
    app.component('my-tabs', Tabs);
  },
};

export {
  Tabs,
};
