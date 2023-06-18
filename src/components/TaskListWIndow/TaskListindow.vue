<script>
import "./taskListWindow.scss";
import store from "../../store/store";

export default {
  name: "TaskListWindow",
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
    try {
      const dataByTheKey = localStorage.getItem(priority);
      store.commit("uploadTasksToStore", [this.priority, dataByTheKey]);
    } catch (err) {
      store.commit("uploadTasksToStore", [this.priority, []]);
    }
    this.nameOfTheTasks = store.state.tasksType;
  },
};
</script>

<template>
  <div class="taskListWindow">
    <h1>{{ nameOfTheTasks }}</h1>
  </div>
</template>