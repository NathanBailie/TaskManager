import Vue from 'vue';
import VueRouter from 'vue-router';
import MainWindow from '../components/MainWindow/MainWindow.vue';
import TaskListWindow from "../components/TaskListWindow/TaskListWindow.vue";
import NotFound from '../components/NotFound/NotFound.vue';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: MainWindow,
    },
    {
      path: '/high',
      component: TaskListWindow,
      props: {
        priority: 'high'
      }
    },
    {
      path: '/middle',
      component: TaskListWindow,
      props: {
        priority: 'middle'
      }
    },
    {
      path: '/low',
      component: TaskListWindow,
      props: {
        priority: 'low'
      }
    },
    {
      path: '*',
      component: NotFound
    }
  ],
});

export default router;