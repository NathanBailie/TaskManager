import Vue from 'vue';
import Vuex from 'vuex';
import { createTask } from '../utils/utils';

Vue.use(Vuex);

const store = new Vuex.Store({
  state() {
    return {
      nameInFocus: '',
      descrInFocus: '',
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

      if (tasks.length === 0) {
        return;
      } else {
        state[`${priority}PriorityTasks`] = tasks
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
    },

    changeNameEditProperty(state, payload) {
      const [priority, property, id] = payload;

      state[`${priority}PriorityTasks`] = state[`${priority}PriorityTasks`].map((task) => {
        if (task.id === id) {
          state.nameInFocus = task.name;
          state.descrInFocus = task.descr;
          task[property] = !task[property];
          return task;
        };
        task['nameOnEdit'] = false;
        task['descrOnEdit'] = false;
        return task;
      });
    },

    finishEditing(state, payload) {
      const [priority, id, inputName, inputDescr, property] = payload;

      state[`${priority}PriorityTasks`] = state[`${priority}PriorityTasks`].map((task) => {
        if (task.id === id) {
          if (property === 'nameOnEdit') {
            task.name = inputName;
          };
          if (property === 'descrOnEdit') {
            task.descr = inputDescr;
          };
          task[property] = !task[property];
          return task;
        };
        return task;
      });

      localStorage.setItem(`${priority.toUpperCase()}_PRIORITY_TASKS`, JSON.stringify(state[`${priority}PriorityTasks`]));
    },

    findChosenTask(state, payload) {
      const [priority, id] = payload;

      for (let task of state[`${priority}PriorityTasks`]) {
        if (task.id === id) {
          state.nameInFocus = task.name;
          state.descrInFocus = task.descr;
        };
      }
    },

    editing(state, payload) {
      const [
        priority,
        id,
        inputName,
        inputDescr,
        nameOnEdit,
        descrOnEdit] = payload;

      state[`${priority}PriorityTasks`] = state[`${priority}PriorityTasks`].map((task) => {
        if (task.id === id) {
          if (!task.nameOnEdit && !task.descrOnEdit) {
            task.nameOnEdit = true;
            task.descrOnEdit = true;

          } else if (task.nameOnEdit && !task.descrOnEdit) {
            task.descrOnEdit = true;

          } else if (!task.nameOnEdit && task.descrOnEdit) {
            task.nameOnEdit = true;

          } else if (task.nameOnEdit && task.descrOnEdit) {
            this.commit('finishEditing', [priority, id, inputName, inputDescr, "nameOnEdit"]);
            this.commit('finishEditing', [priority, id, inputName, inputDescr, "descrOnEdit"]);
          }

          return task;
        };
        return task;
      });

    }
  }
})

export default store;