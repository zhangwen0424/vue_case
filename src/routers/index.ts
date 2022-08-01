import { createRouter, createWebHashHistory, RouterOptions } from "vue-router";
import componentRouter from "./component";
import commonRouter from "./common";

const routerConfig = {
  history: createWebHashHistory(),
  routes: [...componentRouter, ...commonRouter],
  scrollBehavior(to: any, from: any) {
    if (to.path != from.path) {
      return { top: 0 };
    }
  },
};
export default createRouter(routerConfig as RouterOptions);
