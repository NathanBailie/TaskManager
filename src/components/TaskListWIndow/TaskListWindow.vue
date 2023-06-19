<script>
import "./taskListWindow.scss";
import store from "../../store/store";

export default {
  name: "HighPriority",
  props: {
    priority: String,
  },
  data() {
    return {
      nameOfTheTasks: "",
    };
  },
  methods: {},
  mounted() {
    this.nameOfTheTasks = `${this.priority.slice(0, 1).toUpperCase()}
      ${this.priority.slice(1)} 
      Priority Tasks`;

    try {
      const dataFromStorage = localStorage.getItem(
        `${this.priority.toUpperCase()}_PRIORITY_TASKS`
      );
      const result = JSON.parse(dataFromStorage);
      store.commit("uploadTasksToStore", [this.priority, result]);
    } catch (err) {
      store.commit("uploadTasksToStore", [this.priority, []]);
    }
  },
};
</script>

<template>
  <div class="taskListWindow">
    <h1>{{ nameOfTheTasks }}</h1>

    <div class="gridContainer headline">
      <p>Task name</p>
      <p>Description</p>
      <p>Actions</p>
    </div>

    <div
      class="gridContainer list"
      v-for="task in $store.state[`${priority}PriorityTasks`]"
      :key="task.id"
    >
      <p :class="task.styles">{{ task.name }}</p>
      <p :class="task.styles">{{ task.descr }}</p>
      <div class="actions">
        <button class="edit">
          <img
            src="../../resources/icons/pencil.png"
            alt="pencil"
            title="Edit this note"
          />
        </button>
        <button
          class="complete"
          @click="$store.commit('changeDoneSetting', [priority, task.id])"
        >
          <img
            src="../../resources/icons/done.png"
            alt="done"
            title="Marked as done"
          />
        </button>
        <button class="delete">
          <img
            src="../../resources/icons/delete.png"
            alt="delete"
            title="Delete this note"
          />
        </button>
      </div>
    </div>
    <button class="back" title="Return to the main window with table">
      Back
      <a href="/"></a>
    </button>
  </div>
</template>
