import { App, Plugin } from 'vue';
import Test from './src/index.vue';

export const TestPlugin: Plugin = {
  install(app: App) {
    app.component('my-test', Test);
  },
};

export {
  Test,
};
