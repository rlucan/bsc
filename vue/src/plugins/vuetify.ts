import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import cs from 'vuetify/src/locale/cs';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(Vuetify);

export default new Vuetify({
    lang: {
      locales: { cs },
      current: 'cs',
    },
  icons: {
    iconfont: 'mdi',
  },
});
