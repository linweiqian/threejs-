import "./styles/index.scss";
import "./styles/normalize.css";
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import App from "@/App.vue";
import router from "./router";

import axios from "./tools/axios";
Vue.prototype.$http = axios;

Vue.use(ElementUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
