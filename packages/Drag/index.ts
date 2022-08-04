import { App, Plugin } from 'vue';
import Drag from './src/index.vue';

export const DragPlugin: Plugin = {
  install(app: App) {
    app.component('my-drag', Drag);
  },
};

export {
  Drag,
};
