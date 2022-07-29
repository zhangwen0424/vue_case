import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
// 解析 Markdown 文件并把它变成 Vue 文件
import Markdown from "vite-plugin-md";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({ include: [/\.vue$/, /\.md$/] }), Markdown()],
});
