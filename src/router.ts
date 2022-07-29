import { createRouter, createWebHashHistory, RouterOptions } from "vue-router";
// import { defineAsyncComponent } from "vue";

const routes = [
  {
    title: "按钮",
    name: "Button",
    path: "/components/Button",
    // component: () => import(`../packages/Button/docs/README.md`),
    component: () => import(`../packages/Button/docs/README.md`),
    // component: defineAsyncComponent(
    //   () => import(`./components/HelloWorld.vue`)
    // ),
  },
];

const routerConfig = {
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to: any, from: any) {
    if (to.path !== from.path) {
      return { top: 0 };
    }
  },
};

const router = createRouter(routerConfig as RouterOptions);

export default router;
