import { createRouter, createWebHashHistory, RouterOptions } from "vue-router";
import componentRouter from "./component";

console.log("componentRouter", componentRouter);

const routerConfig = {
  history: createWebHashHistory(),
  routes: [...componentRouter],
  // routes: [],
  scrollBehavior(to: any, from: any) {
    if (to.path != from.path) {
      return { top: 0 };
    }
  },
};
export default createRouter(routerConfig as RouterOptions);
