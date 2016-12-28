import Vue from 'vue';
import VueResource from 'vue-resource';
import App from './index.vue';
import vueHttp from "../../commons/vueHttp";

Vue.use(VueResource);

new Vue({
  render: h => h(App)
}).$mount("#app")
