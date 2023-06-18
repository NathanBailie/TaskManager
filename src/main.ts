import "./main.scss";
import Vue from 'vue';
import VueCompositionAPI from '@vue/composition-api';

import App from './components/App/App.vue';
import router from './router';
import store from './store/store';

Vue.use(VueCompositionAPI);

const app = new Vue({
  router,
  store,
  render: (h) => h(App)
})

app.$mount('#app')
