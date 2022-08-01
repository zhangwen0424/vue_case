import { createRouter, createWebHashHistory, RouterOptions } from "vue-router";
import commonRouter from "./common";

const routerConfig = {
  history: createWebHashHistory(),
  routes: [...commonRouter],
  scrollBehavior(to: any, from: any) {
    if (to.path != from.path) {
      return { top: 0 };
    }
  },
};
export default createRouter(routerConfig as RouterOptions);
