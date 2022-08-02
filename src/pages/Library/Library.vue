<!-- 组件库主页 -->
<template>
  <div class="my-kit-doc">
    <aside>
      <router-link
        v-for="(link, index) in data.links"
        :key="index"
        :to="link.path"
        >{{ link.name }}</router-link
      >
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
import { reactive } from "vue";
import "@assets/markdown.css";

const data = reactive({
  links: ComponentList.map((item) => ({
    path: `/components/${item.compClassName}`,
    name: item.compZhName,
  })),
});
</script>

<style lang="less">
.my-kit-doc {
  display: flex;
  min-height: 100vh;
  aside {
    width: 200px;
    padding: 15px;
    border-right: 1px solid #ccc;
    display: flex;
    flex-direction: column;
  }
  main {
    width: 100%;
    flex: 1;
    padding: 10px 30px;
  }
}
</style>
