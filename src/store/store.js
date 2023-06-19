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
    uploadTasksToStore(state) {
      const priorities = ['high', 'middle', 'low'];

      for (let i = 0; i < priorities.length; i++) {
        try {
          const dataFromStorage = localStorage.getItem(
            `${priorities[i].toUpperCase()}_PRIORITY_TASKS`
          );
          if (dataFromStorage === null) {
            return;
          };

          const result = JSON.parse(dataFromStorage);
          state[`${priorities[i]}PriorityTasks`] = result;
        } catch (err) {
          return;
        };
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
            task.nameOnEdit = false;
            task.name = inputName;
          };
          if (property === 'descrOnEdit') {
            task.descrOnEdit = false;
            task.descr = inputDescr;
          };
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
        inputDescr
      ] = payload;

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
    },
    deleteTask(state, payload) {
      const [priority, id] = payload;

      state[`${priority}PriorityTasks`] = state[`${priority}PriorityTasks`].filter((task) => task.id !== id);

      localStorage.setItem(`${priority.toUpperCase()}_PRIORITY_TASKS`, JSON.stringify(state[`${priority}PriorityTasks`]));
    },
    addNewTask(state, payload) {
      const [priority, name, description] = payload;
      const newTask = createTask(name, description);

      state[`${priority}PriorityTasks`] = [...state[`${priority}PriorityTasks`], newTask];
      localStorage.setItem(`${priority.toUpperCase()}_PRIORITY_TASKS`, JSON.stringify(state[`${priority}PriorityTasks`]));
    }
  }
})

export default store;