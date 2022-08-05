<!-- 组件库主页 -->
<template>
  <div class="my-kit-doc">
    <aside>
      <my-tabs
        :value="activedTab"
        :list="data.links"
        :tabPosition="'left'"
      ></my-tabs>
    </aside>
    <main>
      <router-view v-slot="{ Component }">
        <transition>
          <keep-alive>
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import ComponentList from "@packages/list.json";
import { reactive, ref } from "vue";
import { useRoute } from "vue-router";
import "@assets/markdown.css";

const data = reactive({
  links: ComponentList.map((item) => ({
    code: item.compClassName,
    link: `/components/${item.compClassName}`,
    name: item.compZhName + `(${item.compName})`,
  })),
});
let route = useRoute();
let activedTab = ref(route.path.split("/").slice(-1).toString());
</script>

<style lang="less">
.my-kit-doc {
  display: flex;
  min-height: 100vh;
  aside {
    // width: 100px;
    padding: 15px 50px;
    display: flex;
    flex-direction: column;
  }
  main {
    width: 100%;
    flex: 1;
    padding: 10px;
  }
}
</style>
