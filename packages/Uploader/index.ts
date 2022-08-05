import { App, Plugin } from 'vue';
import Uploader from './src/index.vue';

export const UploaderPlugin: Plugin = {
  install(app: App) {
    app.component('my-uploader', Uploader);
  },
};

export {
  Uploader,
};
