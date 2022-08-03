/* eslint-disable prettier/prettier */

/** 
 * !--------- FBI WARNING ----------!
 * 
 * 根据 /packages 目录下的组件所生成的组件类侧边导航栏配置，请勿手动修改

  import { createRouter, createWebHashHistory, RouterOptions } from 'vue-router'

  const routes = [];
  
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
 */
const componentRouters = [{
        title: '按钮',
        name: 'Button',
        path: '/components/button',
        component: () => import('@packages/Button/docs/README.md'),
      },{
        title: '标签页',
        name: 'Tabs',
        path: '/components/tabs',
        component: () => import('@packages/Tabs/docs/README.md'),
      }]
export default componentRouters
