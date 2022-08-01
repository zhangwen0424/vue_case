import componentRouter from "./component";
export default [
  {
    title: "代码库",
    name: "Library",
    path: "/components",
    component: () => import("../components/Library/Library.vue"),
    children: componentRouter,
  },
];
