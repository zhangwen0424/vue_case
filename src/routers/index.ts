import { createRouter, createWebHashHistory, RouterOptions } from "vue-router";
import menuRouter from "./menu";

const routerConfig = {
  history: createWebHashHistory(),
  routes: [...menuRouter],
  scrollBehavior(to: any, from: any) {
    if (to.path != from.path) {
      return { top: 0 };
    }
  },
};
export default createRouter(routerConfig as RouterOptions);
