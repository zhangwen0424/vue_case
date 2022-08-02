import { createApp } from "vue";
import App from "./App.vue";
import router from "./routers/index";

// import "@assets/theme/custom.theme.less";

import MyKit from "../packages";

const app = createApp(App);
app.use(MyKit).use(router).mount("#app");
