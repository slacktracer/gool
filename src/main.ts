import Vue, { VNode } from "vue";
import { BootstrapVue } from "bootstrap-vue";

import App from "src/app/app.vue";
import router from "src/app/routers/main";
import store from "src/app/stores/main";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.use(BootstrapVue);

new Vue({
  router,
  store,
  render: (h): VNode => h(App),
}).$mount("#app");
