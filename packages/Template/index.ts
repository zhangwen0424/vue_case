import { App, Plugin } from 'vue';
import Template from './src/index.vue';

export const TemplatePlugin: Plugin = {
  install(app: App) {
    app.component('my-template', Template);
  },
};

export {
  Template,
};
