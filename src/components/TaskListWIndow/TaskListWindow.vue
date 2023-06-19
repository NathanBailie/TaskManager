<script>
import "./taskListWindow.scss";
import store from "../../store/store";
import AddForm from "../AddForm/AddForm.vue";

export default {
  name: "HighPriority",
  props: {
    priority: String,
  },
  components: {
    AddForm,
  },
  data() {
    return {
      nameOfTheTasks: "",
      inputName: "",
      inputDescr: "",
    };
  },
  methods: {
    handler(priority, whatOnEdit, id) {
      this.$store.commit("changeNameEditProperty", [priority, whatOnEdit, id]);
      this.inputName = store.state.nameInFocus;
      this.inputDescr = store.state.descrInFocus;
    },

    pencilHandler(...args) {
      const [priority, id] = args;
      this.$store.commit("findChosenTask", [priority, id]);
      this.inputName = store.state.nameInFocus;
      this.inputDescr = store.state.descrInFocus;
      this.$store.commit("editing", args);
    },
  },
  mounted() {
    this.nameOfTheTasks = `${this.priority
      .slice(0, 1)
      .toUpperCase()}${this.priority.slice(1)}
      Priority Tasks`;

    this.$store.commit("uploadTasksToStore");
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
      v-for="task in $store.state[`${this.priority}PriorityTasks`]"
      :key="task.id"
    >
      <p
        :class="task.styles"
        class="taskName"
        v-if="!task.nameOnEdit"
        @click="handler(priority, 'nameOnEdit', task.id)"
      >
        {{ task.name }}
      </p>
      <textarea
        class="nameInput textarea"
        v-else
        v-model="inputName"
        placeholder="type the name of the task"
        @keydown.enter.prevent="
          $store.commit('finishEditing', [
            priority,
            task.id,
            inputName,
            inputDescr,
            'nameOnEdit',
          ])
        "
        v-on:blur="
          $store.commit('finishEditing', [
            priority,
            task.id,
            inputName,
            inputDescr,
            'nameOnEdit',
          ])
        "
      ></textarea>
      <p
        :class="task.styles"
        class="taskDescr"
        v-if="!task.descrOnEdit"
        @click="handler(priority, 'descrOnEdit', task.id)"
      >
        {{ task.descr }}
      </p>
      <textarea
        class="descrisEdit textarea"
        v-else
        v-model="inputDescr"
        placeholder="type the description"
        @keydown.enter.prevent="
          $store.commit('finishEditing', [
            priority,
            task.id,
            inputName,
            inputDescr,
            'descrOnEdit',
          ])
        "
        v-on:blur="
          $store.commit('finishEditing', [
            priority,
            task.id,
            inputName,
            inputDescr,
            'descrOnEdit',
          ])
        "
      ></textarea>

      <div class="actions">
        <button
          class="edit actionButton"
          @click="pencilHandler(priority, task.id, inputName, inputDescr)"
        >
          <img
            src="../../resources/icons/pencil.png"
            alt="pencil"
            title="Edit this note"
          />
        </button>
        <button
          class="complete actionButton"
          @click="$store.commit('changeDoneSetting', [priority, task.id])"
        >
          <img
            src="../../resources/icons/done.png"
            alt="done"
            title="Marked as done"
          />
        </button>
        <button
          class="delete actionButton"
          @click="$store.commit('deleteTask', [priority, task.id])"
        >
          <img
            src="../../resources/icons/delete.png"
            alt="delete"
            title="Delete this note"
          />
        </button>
      </div>
    </div>
    <AddForm :priority="this.priority" />
    <button class="back" title="Return to the main window with table">
      Back
      <a href="/"></a>
    </button>
  </div>
</template>
