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
      codeWorld: "",
      tasks: [],
    };
  },
  methods: {},
  mounted() {
    switch (this.priority) {
      case "high":
        this.nameOfTheTasks = "High Priority Tasks";
        this.codeWorld = "HIGH";
        this.tasks = store.state.highPriorityTasks;
        break;
      case "middle":
        this.nameOfTheTasks = "Middle Priority Tasks";
        this.codeWorld = "MIDDLE";
        this.tasks = store.state.middlePriorityTasks;
        break;
      case "low":
        this.nameOfTheTasks = "Low Priority Tasks";
        this.codeWorld = "LOW";
        this.tasks = store.state.lowPriorityTasks;
        break;

      default:
        break;
    }

    try {
      const dataByTheKey = localStorage.getItem(
        `${this.codeWorld0}_PRIORITY_TASKS`
      );
      store.commit("uploadTasksToStore", [this.priority, dataByTheKey]);
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

    <div class="gridContainer list" v-for="task in this.tasks" :key="task.id">
      <p>{{ task.name }}</p>
      <p>{{ task.descr }}</p>
      <div class="actions">
        <button class="edit">
          <img
            src="../../resources/icons/pencil.png"
            alt="pencil"
            title="Edit this note"
          />
        </button>
        <button class="done">
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
