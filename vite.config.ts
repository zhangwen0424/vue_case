import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
// 解析 Markdown 文件并把它变成 Vue 文件
import Markdown from "vite-plugin-md";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    // 配置项目别名
    alias: {
      // "@": path.resolve(__dirname, "src"),
      // "@@": path.resolve(__dirname, "packages"),
      // "@components": path.resolve(__dirname, "src/components"),
      // "@pages": path.resolve(__dirname, "src/pages"),
    },
  },
  plugins: [vue({ include: [/\.vue$/, /\.md$/] }), Markdown()],
});
