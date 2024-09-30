import {createApp} from 'vue'
import router from "./routers/router.ts";
import App from "./App.vue";
import {createPinia} from "pinia";
import vant from 'vant';
import 'vant/lib/index.css';


const app = createApp(App);
const pinia = createPinia();
app.use(router); // 使用路由实例
app.use(pinia)
app.use(vant);
app.mount('#app')


