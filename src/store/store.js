import Vue from 'vue';
import Vuex from 'vuex';
import { createTask } from '../utils/utils';

Vue.use(Vuex);

const store = new Vuex.Store({
  state() {
    return {
      highPriorityTasks: [
        createTask('progr', 'new two lessons of the Ulbi course'),
      ],
      middlePriorityTasks: [
        createTask('english', 'new lesson from the Logus course'),
        createTask('turkish', 'new grammar lesson and 5 new texts'),
      ],
      lowPriorityTasks: [
        createTask('Bhargava, algorithms', 'new 10-15 pages'),
      ],
    }
  },
  mutations: {

    uploadTasksToStore(state, payload) {
      const [priority, tasks] = payload;

      switch (priority) {
        case "high":
          state.highPriorityTasks = tasks.length !== 0 ? tasks : state.highPriorityTasks;
          break;
        case "middle":
          state.middlePriorityTasks = tasks.length !== 0 ? tasks : state.middlePriorityTasks;
          break;
        case "low":
          state.lowPriorityTasks = tasks.length !== 0 ? tasks : state.lowPriorityTasks;
          break;
        default:
          break;
      };
    },
  }
})

export default store;