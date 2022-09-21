import componentRouter from "./component";
export default [
  {
    title: "组件库",
    name: "Library",
    path: "/",
    component: () => import("@pages/Library/Library.vue"),
    redirect: "/components/button", // 默认显示 button组件
    children: componentRouter,
  },
  /*  {
    title: "主页",
    name: "Home",
    path: "/",
    // component: () => import("@pages/Home/Home.vue"),
    component: () => import("@pages/Library/Library.vue"),
    children: componentRouter,
  }, */
  /*  {
    title: "未匹配到任何路由",
    name: "Library",
    path: "/:pathMatch('/*')",
    redirect: { name: "Home" },
  }, */
];
