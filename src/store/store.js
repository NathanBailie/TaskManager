import Vue from 'vue';
import Vuex from 'vuex';
import uuid from 'uuid';

Vue.use(Vuex);

const store = new Vuex.Store({
  state() {
    return {
      highPriorityTasks: [
        { name: 'progr', descr: "new two lessons of the Ulbi's course", id: uuid() },
      ],
      middlePriorityTasks: [
        { name: 'english', descr: "new lesson from the Logus course", id: uuid() },
        { name: 'turkish', descr: "new grammar lesson and 5 new texts", id: uuid() }
      ],
      lowPriorityTasks: [
        { name: 'Bhargava, algorithms', descr: " new 10-15 pages", id: uuid() }
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