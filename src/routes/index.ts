/**
 * 全局路由
 */
import { createRouter, createWebHashHistory, RouterOptions } from "vue-router";
// 项目路由
import component from "./component"; //组件库项目

const routerConfig = {
  history: createWebHashHistory(),
  routes: [...component],
  scrollBehavior(to: any, from: any) {
    if (to.path !== from.path) {
      return { top: 0 };
    }
  },
};

export default createRouter(routerConfig as RouterOptions);
