import { App, Plugin } from 'vue';
import FragmentUpload from './src/index.vue';

export const FragmentUploadPlugin: Plugin = {
  install(app: App) {
    app.component('my-fragment-upload', FragmentUpload);
  },
};

export {
  FragmentUpload,
};
