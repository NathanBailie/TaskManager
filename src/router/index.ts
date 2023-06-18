import Vue from 'vue';
import VueRouter from 'vue-router';
import HighPriority from '../components/HighPriority/HighPriority.vue';
import MiddlePriority from '../components/MiddlePriority/MiddlePriority.vue';
import LowPriority from '../components/LowPriority/LowPriority.vue';
import MainWindow from '../components/MainWindow/MainWindow.vue';
import NotFound from '../components/NotFound/NotFound.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainWindow
    },
    {
      path: '/high',
      name: 'highPriority',
      component: HighPriority
    },
    {
      path: '/middle',
      name: 'middlePriority',
      component: MiddlePriority
    },
    {
      path: '/low',
      name: 'lowPriority',
      component: LowPriority
    },
    {
      path: '*',
      component: NotFound
    }
  ],
});

export default router;