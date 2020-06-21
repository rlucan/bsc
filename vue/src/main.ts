import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueI18n from 'vue-i18n';
import { messages, defaultLocale } from "@/i18n";
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.config.productionTip = false;

Vue.use(VueAxios, axios)

Vue.use(VueI18n)

axios.interceptors.request.use((config) => {
  return new Promise((res) => {
    config.url = 'http://private-9aad-note10.apiary-mock.com/' + config.url;
    config.headers['Accept'] = 'application/json';
    setTimeout(() => {
      res(config);
    }, 1500);
  });
});

axios.interceptors.response.use((config) => {
  return config;
}, (error) => {
  if (error.message) {
    alert('API error: ' + error.message);
  } else {
    alert('API error: Unknown error');
  }
  throw error;
});

const i18n = new VueI18n({
  messages,
  locale: defaultLocale,
  fallbackLocale: defaultLocale
});

new Vue({
  router,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
