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
      const targetTasks = state[`${priority}PriorityTasks`];

      if (tasks.length === 0) {
        return;
      } else {
        state[`${priority}PriorityTasks`] = tasks
        console.log(state[`${priority}PriorityTasks`]);
      };
    },

    changeDoneSetting(state, payload) {
      const [priority, id] = payload;

      state[`${priority}PriorityTasks`] = state[`${priority}PriorityTasks`].map((task) => {
        if (task.id === id) {
          task.styles.done = !task.styles.done;
          return task;
        };
        return task;
      })

      localStorage.setItem(`${priority.toUpperCase()}_PRIORITY_TASKS`, JSON.stringify(state[`${priority}PriorityTasks`]));
    }
  }
})

export default store;