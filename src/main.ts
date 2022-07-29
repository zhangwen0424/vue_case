import { createApp } from "vue";
import App from "./App.vue";
import router from "./routes/index";

import MyKit from "../packages";

createApp(App).use(MyKit).use(router).mount("#app");
