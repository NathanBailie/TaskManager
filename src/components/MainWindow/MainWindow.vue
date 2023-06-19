<script>
import "./mainWindow.scss";
import store from "../../store/store";

export default {
  name: "MainWindow",
  data() {
    return {
      highTasksArrayLength: "",
      middleTasksArrayLength: "",
      lowTasksArrayLength: "",
    };
  },
  mounted() {
    this.$store.commit("uploadTasksToStore");
    const priorities = ["high", "middle", "low"];

    for (let i = 0; i < priorities.length; i++) {
      this[`${priorities[i]}TasksArrayLength`] =
        store.state[`${priorities[i]}PriorityTasks`].length;
    }
  },
};
</script>
<template>
  <div class="mainWindow">
    <h1>Task Manager</h1>
    <div class="mainWindow__taskWraper red">
      <div class="button red">
        <router-link to="/high">High Priority Tasks</router-link>
      </div>
      <span>{{ String(highTasksArrayLength) }}</span>
    </div>
    <div class="mainWindow__taskWraper orange">
      <div class="button orange">
        <router-link to="/middle">Middle Priority Tasks</router-link>
      </div>
      <span>{{ String(middleTasksArrayLength) }}</span>
    </div>
    <div class="mainWindow__taskWraper green">
      <div class="button green">
        <router-link to="/low">Low Priority Tasks</router-link>
      </div>
      <span>{{ String(lowTasksArrayLength) }}</span>
    </div>
  </div>
</template>