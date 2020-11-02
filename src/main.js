import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
} from "vee-validate";
import * as rules from "vee-validate/dist/rules";


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install VeeValidate rules
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule]);
});

// Install VeeValidate components globally
Vue.component("ValidationObserver", ValidationObserver);
Vue.component("ValidationProvider", ValidationProvider);

Vue.use(BootstrapVue)
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
