<script>
import "./mainWindow.scss";
import store from "../../store/store";

export default {
  name: "MainWindow",
  data() {
    return {
      highTasksArrayLength: store.state.highPriorityTasks.length,
      middleTasksArrayLength: store.state.middlePriorityTasks.length,
      lowTasksArrayLength: store.state.lowPriorityTasks.length,
    };
  },
};
</script>
<template>
  <div class="mainWindow">
    <h1>Task Manager</h1>
    <div class="mainWindow__taskWraper red">
      <div class="button red">
        <a href="/high">High Priority Tasks</a>
      </div>
      <span>{{ String(highTasksArrayLength) }}</span>
    </div>
    <div class="mainWindow__taskWraper orange">
      <div class="button orange">
        <a href="/middle">Middle Priority Tasks</a>
      </div>
      <span>{{ String(middleTasksArrayLength) }}</span>
    </div>
    <div class="mainWindow__taskWraper green">
      <div class="button green">
        <a href="/low">Low Priority Tasks</a>
      </div>
      <span>{{ String(lowTasksArrayLength) }}</span>
    </div>
  </div>
</template>