<script>
import "./mainWindow.scss";

export default {
  name: "MainWindow",
};
</script>
<template>
  <div class="mainWindow">
    <h1>Task Manager</h1>
    <div class="mainWindow__taskWraper red">
      <div class="button red">
        <a href="/high">High Priority Tasks</a>
      </div>
      <span>0</span>
    </div>
    <div class="mainWindow__taskWraper orange">
      <div class="button orange">
        <a href="/middle">Middle Priority Tasks</a>
      </div>
      <span>0</span>
    </div>
    <div class="mainWindow__taskWraper green">
      <div class="button green">
        <a href="/low">Low Priority Tasks</a>
      </div>
      <span>0</span>
    </div>
  </div>
</template>