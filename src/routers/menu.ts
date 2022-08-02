import componentRouter from "./component";
export default [
  {
    title: "主页",
    name: "Home",
    path: "/",
    // component: () => import("@pages/Home/Home.vue"),
    component: () => import("@pages/Library/Library.vue"),
    children: componentRouter,
  },
  {
    title: "代码库",
    name: "Library",
    path: "/components",
    component: () => import("@pages/Library/Library.vue"),
    children: componentRouter,
  },
];
